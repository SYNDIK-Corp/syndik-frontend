import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { track } from '@/lib/trackEvent';

/* React Router não reseta o scroll ao trocar de rota (comportamento de SPA,
   não é bug do browser) — sem isso, navegar pra uma página nova a partir de
   um ponto rolado (ex.: clicar num card lá embaixo em "mais vendidos" na
   home) abre a página nova naquele mesmo scroll, geralmente perto do fim.
   Também é o único ponto que reage a toda troca de rota — aproveitado pra
   disparar page_view sem duplicar o listener em cada página. */
export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    track('page_view', { path: pathname });
  }, [pathname]);

  return null;
}
