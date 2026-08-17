export function formatPrice(value: number, locale: string, currency = 'USD') {
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(value);
}

/* preço compacto pra telas mais densas: "U$ 3,99" em vez do "US$ 3,99"
   (formatação por extenso do Intl pra moeda estrangeira em pt-BR) — loja é
   USD-only, então o símbolo não precisa carregar a formatação de moeda
   completa do Intl, só o separador decimal correto por locale. */
export function formatPriceCompact(value: number, locale: string) {
  const amount = new Intl.NumberFormat(locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);
  return `U$ ${amount}`;
}

export function formatCountdown(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, '0')}`;
}

export function formatDate(iso: string, locale: string) {
  return new Intl.DateTimeFormat(locale, { day: '2-digit', month: 'short', year: 'numeric' }).format(
    new Date(iso),
  );
}

export function formatDateTime(iso: string, locale: string) {
  return new Intl.DateTimeFormat(locale, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(iso));
}

export function formatFileSize(megabytes: number) {
  return `${megabytes} MB`;
}

/* drops.style ("money-power", "trap-rap-legends") -> label de categoria do
   Drop ("MONEY / POWER", "TRAP / RAP LEGENDS"). Só o primeiro hífen vira
   " / " (separador de categoria); o resto vira espaço, porque o segundo
   segmento pode ter mais de uma palavra. */
export function formatStyleLabel(style: string): string {
  return style.toUpperCase().replace('-', ' / ').replace(/-/g, ' ');
}

/* mesma entrada, mas sem barra interna nenhuma ("MONEY POWER",
   "TRAP RAP LEGENDS") — pra compor com um prefixo de marca (ex.:
   "SYNDIK / MONEY POWER") sem repetir "/" quando a categoria tem mais de
   uma palavra. */
export function formatStyleWords(style: string): string {
  return style.toUpperCase().replace(/-/g, ' ');
}

export function formatList(items: string[], locale: string) {
  return new Intl.ListFormat(locale, { style: 'long', type: 'conjunction' }).format(items);
}
