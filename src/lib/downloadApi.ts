import { FunctionsHttpError } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export type DeviceVariant = 'mobile' | 'desktop';

export type DownloadErrorCode =
  | 'unauthenticated'
  | 'missing_product_id'
  | 'not_entitled'
  | 'no_files'
  | 'rate_limited'
  | 'unexpected';

export interface DownloadError {
  code: DownloadErrorCode;
}

export interface DownloadFile {
  device_variant: string | null;
  file_name: string;
  url: string;
  expires_at: string;
}

export interface RequestDownloadResult {
  files: DownloadFile[];
}

async function readDownloadError(error: unknown): Promise<DownloadError> {
  if (error instanceof FunctionsHttpError) {
    try {
      const body = await error.context.json();
      if (body && typeof body.error === 'string') {
        return { code: body.error as DownloadErrorCode };
      }
    } catch {
      /* corpo não veio como JSON — cai no genérico abaixo */
    }
  }
  return { code: 'unexpected' };
}

export interface GuestDownloadProof {
  orderId: number;
  token: string;
}

/** pede signed URLs (TTL curto) pra todos os arquivos de um produto já
 * comprado — a Edge Function confere entitlement ativa antes de assinar
 * qualquer coisa, nunca confia no product_id vindo do client sozinho. Sem
 * sessão (checkout guest), `guestProof` prova posse via o public_token do
 * pedido — escopado só aos arquivos daquele pedido específico.
 * `deviceVariant` omitido = mobile + desktop juntos (comportamento de
 * sempre); passado, filtra pra só uma das duas variantes. */
export async function requestDownload(
  productId: number,
  guestProof?: GuestDownloadProof,
  deviceVariant?: DeviceVariant,
): Promise<RequestDownloadResult | DownloadError> {
  const { data, error } = await supabase.functions.invoke<RequestDownloadResult>('request-download', {
    body: {
      product_id: productId,
      order_id: guestProof?.orderId,
      token: guestProof?.token,
      device_variant: deviceVariant,
    },
  });
  if (error) return readDownloadError(error);
  if (!data) return { code: 'unexpected' };
  return data;
}

export function isDownloadError(result: RequestDownloadResult | DownloadError): result is DownloadError {
  return 'code' in result;
}

/* MVP: substituído por downloadOrShare — clicar um <a> por arquivo dentro
 * de um setTimeout parava de contar como gesto do usuário depois do
 * primeiro, e o navegador bloqueava o resto silenciosamente (só a capa
 * "baixava", o resto sumia). */

function hasWebShareSupport(): boolean {
  return typeof navigator !== 'undefined' && typeof navigator.share === 'function' && typeof navigator.canShare === 'function';
}

/* Safari iOS só aceita navigator.share() poucos segundos depois do gesto
 * do usuário (transient user activation) — trava de segurança do próprio
 * navegador, não configurável. Medido ao vivo: buscar 14 arquivos reais
 * levou ~45s numa rede real, muito além do que o Safari tolera —
 * resultado, NotAllowedError sempre, nunca ia pra galeria. Em vez de tentar
 * calibrar "quantos arquivos cabem no tempo" (variável demais por rede),
 * uma trava de tempo única: estourou, desiste do Web Share e cai pro zip —
 * vale pra 1 arquivo ou 14. */
const WEB_SHARE_TIMEOUT_MS = 5_000;

function timeoutAfter(ms: number): Promise<never> {
  return new Promise((_, reject) => setTimeout(() => reject(new Error('web_share_timeout')), ms));
}

async function fetchFilesForShare(
  productIds: number[],
  guestProof: GuestDownloadProof | undefined,
  deviceVariant: DeviceVariant | undefined,
): Promise<File[]> {
  const results = await Promise.all(productIds.map((productId) => requestDownload(productId, guestProof, deviceVariant)));
  if (results.some(isDownloadError)) throw new Error('signed_url_failed');
  const downloadFiles = (results as RequestDownloadResult[]).flatMap((result) => result.files);

  return Promise.all(
    downloadFiles.map(async (file) => {
      const response = await fetch(file.url);
      if (!response.ok) throw new Error(`fetch failed: ${response.status} — ${file.file_name}`);
      const blob = await response.blob();
      return new File([blob], file.file_name, { type: blob.type || 'image/jpeg' });
    }),
  );
}

/** navigator.share com arquivos de imagem abre a folha nativa de
 * compartilhar do celular — "Salvar imagens"/"Guardar fotos" grava direto
 * na galeria, sem precisar descompactar zip nem salvar uma por uma depois.
 * Só funciona se o navegador suportar (feature detection via canShare, não
 * sniffing de user agent — mais robusto e já cobre desktops que também
 * suportam). true = a folha nativa abriu (mesmo que o usuário cancele —
 * cancelar é escolha dele, não cai pro zip depois disso). false = sem
 * suporte, timeout, ou falha real — quem chamou tenta o zip em seguida. */
async function tryWebShare(
  productIds: number[],
  guestProof?: GuestDownloadProof,
  deviceVariant?: DeviceVariant,
): Promise<boolean> {
  if (!hasWebShareSupport()) return false;

  let files: File[];
  try {
    files = await Promise.race([fetchFilesForShare(productIds, guestProof, deviceVariant), timeoutAfter(WEB_SHARE_TIMEOUT_MS)]);
  } catch {
    // rede lenta demais (estourou os 5s) ou falha real buscando os
    // arquivos — os dois casos caem pro zip do mesmo jeito
    return false;
  }

  if (files.length === 0 || !navigator.canShare({ files })) return false;

  try {
    await navigator.share({ files });
    return true;
  } catch (error) {
    // usuário fechou a folha nativa sem escolher nada — decisão dele, não
    // é uma falha que devesse cair pro fallback de zip
    if (error instanceof Error && error.name === 'AbortError') return true;
    return false;
  }
}

/** um zip só, um único <a download> — nunca esbarra no bloqueio de
 * downloads múltiplos porque é sempre um clique pra um arquivo. Usado no
 * desktop e como fallback de navegadores sem suporte a compartilhar
 * arquivos.
 *
 * `supabase.functions.invoke` não serve aqui — ele decodifica a resposta
 * como texto/JSON, o que corrompe bytes binários (zip virava ~2x o
 * tamanho, cheio de U+FFFD onde a decodificação UTF-8 falhava). `fetch`
 * direto + `.blob()` preserva os bytes exatamente como vieram.
 *
 * `orderId` (quando existe, ex.: tela de confirmação de um pedido) é só
 * pra nomear o zip do lado do servidor (SYNDIK-Wallpaper-XXXX ou o nome do
 * drop) — não amplia acesso, a posse continua sendo checada por
 * entitlement. "Baixar tudo" da Conta cruza vários pedidos, não manda
 * orderId, cai no nome genérico. */
async function downloadZip(
  productIds: number[],
  guestProof?: GuestDownloadProof,
  orderId?: number,
  deviceVariant?: DeviceVariant,
): Promise<boolean> {
  const { data: sessionData } = await supabase.auth.getSession();
  const accessToken = sessionData.session?.access_token ?? SUPABASE_ANON_KEY;

  const response = await fetch(`${SUPABASE_URL}/functions/v1/request-download-zip`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      apikey: SUPABASE_ANON_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      product_ids: productIds,
      order_id: guestProof?.orderId ?? orderId,
      token: guestProof?.token,
      device_variant: deviceVariant,
    }),
  });
  if (!response.ok) return false;

  // nome vem do Content-Disposition do servidor — setar link.download com
  // um valor fixo aqui sobrescreveria o nome que a function calculou
  // (SYNDIK-Wallpaper-XXXX etc.), já que blob: URL não carrega os headers
  // da resposta original.
  const disposition = response.headers.get('Content-Disposition') ?? '';
  const match = disposition.match(/filename="([^"]+)"/);
  const fileName = match?.[1] ?? 'syndik-wallpapers.zip';

  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  return true;
}

export interface DownloadOptions {
  guestProof?: GuestDownloadProof;
  orderId?: number;
  /* omitido = mobile + desktop juntos */
  deviceVariant?: DeviceVariant;
}

/** ponto de entrada único pra baixar 1 ou vários produtos — decide entre
 * compartilhar (mobile/qualquer navegador com suporte, cai direto na
 * galeria) e zip (desktop, fallback sem suporte, ou timeout). Sempre
 * chamado direto do handler de clique — nunca atrás de um setTimeout,
 * senão o gesto do usuário some antes do navigator.share poder usar ele.
 *
 * `deviceVariant === 'desktop'` nunca tenta Web Share, vai direto de zip —
 * resolução de desktop não faz sentido "salvar na galeria" do celular
 * (wallpaper esticado/cortado errado), regra fixa do produto, não
 * configurável pelo usuário. */
export async function downloadOrShare(productIds: number[], options: DownloadOptions = {}): Promise<boolean> {
  const { guestProof, orderId, deviceVariant } = options;

  if (deviceVariant !== 'desktop') {
    const shared = await tryWebShare(productIds, guestProof, deviceVariant);
    if (shared) return true;
  }

  return downloadZip(productIds, guestProof, orderId, deviceVariant);
}

/** baixa 1 imagem específica de um Drop (picker de miniaturas) — `index`
 * é o número do arquivo (1-7, casa com o nome `01.jpg`...`07.jpg` tanto na
 * miniatura de preview quanto no arquivo de entrega). Não passa pelo zip:
 * 1 arquivo só não precisa compactar nada, a URL assinada já vem com
 * Content-Disposition:attachment (request-download já seta isso). Mobile
 * ainda tenta a folha nativa primeiro (mesmo timeout de 5s); desktop nunca
 * tenta, mesma regra do resto do fluxo. */
export async function downloadSingleImage(
  productId: number,
  index: number,
  deviceVariant: DeviceVariant,
  guestProof?: GuestDownloadProof,
): Promise<boolean> {
  const result = await requestDownload(productId, guestProof, deviceVariant);
  if (isDownloadError(result)) return false;

  const wantedIndex = String(index).padStart(2, '0');
  const file = result.files.find((f) => f.file_name.replace(/\.[^.]+$/, '') === wantedIndex) ?? result.files[0];
  if (!file) return false;

  if (deviceVariant !== 'desktop' && hasWebShareSupport()) {
    try {
      const blob = await Promise.race([
        fetch(file.url).then((response) => {
          if (!response.ok) throw new Error(`fetch failed: ${response.status}`);
          return response.blob();
        }),
        timeoutAfter(WEB_SHARE_TIMEOUT_MS),
      ]);
      const shareFile = new File([blob], file.file_name, { type: blob.type || 'image/jpeg' });
      if (navigator.canShare({ files: [shareFile] })) {
        await navigator.share({ files: [shareFile] });
        return true;
      }
    } catch (error) {
      // cancelou a folha nativa de propósito — não é falha, mas também não
      // teve share nem download nenhum de verdade, então não retorna aqui;
      // segue pro download direto abaixo só se não foi cancelamento
      if (error instanceof Error && error.name === 'AbortError') return true;
    }
  }

  const link = document.createElement('a');
  link.href = file.url;
  link.download = file.file_name;
  document.body.appendChild(link);
  link.click();
  link.remove();
  return true;
}
