const VISITOR_ID_KEY = 'syndik.visitor_id';
const SESSION_ID_KEY = 'syndik.session_id';
const ATTRIBUTION_KEY = 'syndik.attribution';

export interface Attribution {
  source: string;
  campaign: string | null;
  ts: number;
}

function newUuid(): string {
  return crypto.randomUUID();
}

/* Identidade do visitante anônimo — persiste entre sessões (localStorage)
 * pra ligar page_view/add_to_cart/checkout_click/compra do mesmo visitante
 * mesmo em visitas separadas. */
export function getOrInitVisitorId(): string {
  try {
    const existing = localStorage.getItem(VISITOR_ID_KEY);
    if (existing) return existing;
    const id = newUuid();
    localStorage.setItem(VISITOR_ID_KEY, id);
    return id;
  } catch {
    return newUuid();
  }
}

/* Uma sessão por aba — não persiste entre fechamentos (sessionStorage). */
export function getSessionId(): string {
  try {
    const existing = sessionStorage.getItem(SESSION_ID_KEY);
    if (existing) return existing;
    const id = newUuid();
    sessionStorage.setItem(SESSION_ID_KEY, id);
    return id;
  } catch {
    return newUuid();
  }
}

export function getAttribution(): Attribution | null {
  try {
    const raw = localStorage.getItem(ATTRIBUTION_KEY);
    return raw ? (JSON.parse(raw) as Attribution) : null;
  } catch {
    return null;
  }
}

function setAttributionOnce(source: string, campaign: string | null): void {
  try {
    if (getAttribution()) return; // first-touch: não sobrescreve origem já salva
    localStorage.setItem(ATTRIBUTION_KEY, JSON.stringify({ source, campaign, ts: Date.now() } satisfies Attribution));
  } catch {
    /* localStorage indisponível: attribution simplesmente não persiste */
  }
}

/* Chamado uma vez no mount do app. O redirect /go/:platform (link-redirect)
 * já loga o clique original (link_click) com IP/país/estado no servidor;
 * aqui só persistimos a mesma origem pra anexar aos eventos seguintes deste
 * visitante (add_to_cart, checkout_click, pedido). */
export function captureAttributionFromUrl(): void {
  const params = new URLSearchParams(window.location.search);
  const source = params.get('utm_source');
  if (!source) return;
  setAttributionOnce(source, params.get('utm_campaign'));
}
