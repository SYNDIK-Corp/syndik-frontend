import { supabase } from '@/lib/supabase';
import { getAttribution, getOrInitVisitorId, getSessionId } from '@/lib/attribution';

/** Dispara um evento de analytics (page_view, add_to_cart, checkout_click,
 * ...). Fire-and-forget: nunca lança, nunca bloqueia a UI — uma falha de
 * rede aqui não pode impedir a ação real que o usuário está fazendo. */
export function track(eventType: string, payload: Record<string, unknown> = {}): void {
  const attribution = getAttribution();

  supabase.functions
    .invoke('track-event', {
      body: {
        event_type: eventType,
        payload,
        visitor_id: getOrInitVisitorId(),
        session_id: getSessionId(),
        utm_source: attribution?.source,
        utm_campaign: attribution?.campaign,
        referrer: document.referrer || undefined,
      },
    })
    .catch(() => {
      /* analytics é best-effort — falha aqui não deve aparecer pro usuário */
    });
}
