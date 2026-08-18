import { FunctionsHttpError } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

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

/** pede signed URLs (TTL curto) pra todos os arquivos de um produto já
 * comprado — a Edge Function confere entitlement ativa antes de assinar
 * qualquer coisa, nunca confia no product_id vindo do client sozinho. */
export async function requestDownload(productId: number): Promise<RequestDownloadResult | DownloadError> {
  const { data, error } = await supabase.functions.invoke<RequestDownloadResult>('request-download', {
    body: { product_id: productId },
  });
  if (error) return readDownloadError(error);
  if (!data) return { code: 'unexpected' };
  return data;
}

export function isDownloadError(result: RequestDownloadResult | DownloadError): result is DownloadError {
  return 'code' in result;
}

/** dispara o download de cada arquivo assinado via link temporário. Um
 * <a download> clicado por vez, com um pequeno intervalo — clicar todos no
 * mesmo tick esbarra no bloqueio de pop-up/múltiplos downloads de vários
 * navegadores. */
export function triggerFileDownloads(files: DownloadFile[]): void {
  files.forEach((file, index) => {
    setTimeout(() => {
      const link = document.createElement('a');
      link.href = file.url;
      link.download = file.file_name;
      document.body.appendChild(link);
      link.click();
      link.remove();
    }, index * 300);
  });
}
