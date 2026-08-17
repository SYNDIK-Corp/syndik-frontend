import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/* React Router não reseta o scroll ao trocar de rota (comportamento de SPA,
   não é bug do browser) — sem isso, navegar pra uma página nova a partir de
   um ponto rolado (ex.: clicar num card lá embaixo em "mais vendidos" na
   home) abre a página nova naquele mesmo scroll, geralmente perto do fim. */
export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
