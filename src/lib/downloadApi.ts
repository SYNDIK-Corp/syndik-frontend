import { FunctionsHttpError } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

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
 * pedido — escopado só aos arquivos daquele pedido específico. */
export async function requestDownload(
  productId: number,
  guestProof?: GuestDownloadProof,
): Promise<RequestDownloadResult | DownloadError> {
  const { data, error } = await supabase.functions.invoke<RequestDownloadResult>('request-download', {
    body: {
      product_id: productId,
      order_id: guestProof?.orderId,
      token: guestProof?.token,
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

const FETCH_TIMEOUT_MS = 15_000;

async function fetchWithTimeout(url: string): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    return await fetch(url, { signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

/** navigator.share com arquivos de imagem abre a folha nativa de
 * compartilhar do celular — "Salvar imagens"/"Guardar fotos" grava direto
 * na galeria, sem precisar descompactar zip nem salvar uma por uma depois.
 * Só funciona se o navegador suportar (feature detection via canShare, não
 * sniffing de user agent — mais robusto e já cobre desktops que também
 * suportam). true = a folha nativa abriu (mesmo que o usuário cancele —
 * cancelar é escolha dele, não cai pro zip depois disso). false = sem
 * suporte, ou falha real — quem chamou tenta o zip em seguida.
 *
 * Revertido: uma "otimização" que testava canShare com um arquivo falso de 1
 * byte antes de buscar os arquivos de verdade (pra evitar o desktop baixar
 * tudo em dobro) — testado no iPhone/Safari real e a folha nativa de
 * compartilhar nunca abria, caía direto pro zip. Sem confirmação de que
 * esse fluxo (a versão de baixo, com arquivos reais) já tinha funcionado
 * antes dessa mudança, o mais seguro é voltar exatamente pro que já existia
 * quando essa função foi desenhada — a checagem com arquivo fake é
 * suspeita, mas não confirmada; não vale o risco de manter algo não
 * verificável no caminho principal do fluxo de mobile. */
/* DIAGNÓSTICO TEMPORÁRIO — investigando por que a folha de compartilhar não
 * abre no iPhone/Safari real (sempre cai pro zip). Sem remote debugging
 * disponível no aparelho, alert() é o jeito mais rápido de ver em qual dos 5
 * pontos de falha isso está parando. Remover assim que a causa real for
 * confirmada, não é pra ficar em produção. */
function debugAlert(message: string) {
  if (typeof window !== 'undefined' && typeof window.alert === 'function') {
    window.alert(`[debug download] ${message}`);
  }
}

async function tryWebShare(productIds: number[], guestProof?: GuestDownloadProof): Promise<boolean> {
  const startedAt = Date.now();

  if (typeof navigator === 'undefined' || typeof navigator.share !== 'function' || typeof navigator.canShare !== 'function') {
    debugAlert('navigator.share/canShare não existem nesse navegador');
    return false;
  }

  const results = await Promise.all(productIds.map((productId) => requestDownload(productId, guestProof)));
  if (results.some(isDownloadError)) {
    debugAlert('requestDownload falhou (signed URLs)');
    return false;
  }
  const downloadFiles = (results as RequestDownloadResult[]).flatMap((result) => result.files);

  // busca todos em paralelo (não um por vez) — mais rápido e evita que um
  // arquivo lento deixe os de trás perto/além do TTL da URL assinada
  let files: File[];
  try {
    files = await Promise.all(
      downloadFiles.map(async (file) => {
        const response = await fetchWithTimeout(file.url);
        if (!response.ok) throw new Error(`fetch failed: ${response.status}`);
        const blob = await response.blob();
        return new File([blob], file.file_name, { type: blob.type || 'image/jpeg' });
      }),
    );
  } catch (error) {
    debugAlert(`fetch dos arquivos falhou depois de ${Date.now() - startedAt}ms: ${(error as Error).message}`);
    return false;
  }

  const elapsedBeforeShare = Date.now() - startedAt;

  if (files.length === 0) {
    debugAlert(`nenhum arquivo baixado (${elapsedBeforeShare}ms)`);
    return false;
  }
  if (!navigator.canShare({ files })) {
    debugAlert(`canShare(arquivos reais) retornou false depois de ${elapsedBeforeShare}ms — ${files.length} arquivo(s), ${files.map((f) => f.type).join(',')}`);
    return false;
  }

  try {
    await navigator.share({ files });
    return true;
  } catch (error) {
    // usuário fechou a folha nativa sem escolher nada — decisão dele, não
    // é uma falha que devesse cair pro fallback de zip
    if (error instanceof Error && error.name === 'AbortError') return true;
    debugAlert(
      `share() lançou erro depois de ${elapsedBeforeShare}ms de espera: ${(error as Error).name} — ${(error as Error).message}`,
    );
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
async function downloadZip(productIds: number[], guestProof?: GuestDownloadProof, orderId?: number): Promise<boolean> {
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

/** ponto de entrada único pra baixar 1 ou vários produtos — decide entre
 * compartilhar (mobile/qualquer navegador com suporte, cai direto na
 * galeria) e zip (desktop, ou fallback sem suporte). Sempre chamado direto
 * do handler de clique — nunca atrás de um setTimeout, senão o gesto do
 * usuário some antes do navigator.share poder usar ele. */
export async function downloadOrShare(productIds: number[], guestProof?: GuestDownloadProof, orderId?: number): Promise<boolean> {
  const shared = await tryWebShare(productIds, guestProof);
  if (shared) return true;
  return downloadZip(productIds, guestProof, orderId);
}
