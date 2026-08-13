import { useEffect, useState } from 'react';

export type NavbarSectionTheme = 'light' | 'dark' | 'black';

/*
 * Devolve o tema da seção sob a navbar no ponto vertical `probeY`,
 * lido do atributo data-navbar-theme ("dark" | "black") da seção.
 * Sem seção marcada, assume fundo claro ("light").
 */
export function useNavbarSectionTheme(probeY = 32) {
  const [sectionTheme, setSectionTheme] = useState<NavbarSectionTheme>('light');

  useEffect(() => {
    const update = () => {
      const sections = document.querySelectorAll<HTMLElement>('[data-navbar-theme]');
      let current: NavbarSectionTheme = 'light';

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= probeY && rect.bottom >= probeY) {
          current = section.dataset.navbarTheme as NavbarSectionTheme;
        }
      });

      setSectionTheme(current);
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [probeY]);

  return sectionTheme;
}
