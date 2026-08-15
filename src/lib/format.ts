export function formatPrice(value: number, locale: string, currency = 'USD') {
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(value);
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

export function formatList(items: string[], locale: string) {
  return new Intl.ListFormat(locale, { style: 'long', type: 'conjunction' }).format(items);
}
