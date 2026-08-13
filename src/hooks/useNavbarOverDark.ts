import { useEffect, useState } from 'react';

/*
 * Verifica se a seção sob a navbar está marcada como escura
 * (data-navbar-theme="dark") no ponto vertical `probeY`.
 */
export function useNavbarOverDark(probeY = 36) {
  const [overDark, setOverDark] = useState(false);

  useEffect(() => {
    const update = () => {
      const sections = document.querySelectorAll('[data-navbar-theme="dark"]');
      let isDark = false;

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= probeY && rect.bottom >= probeY) isDark = true;
      });

      setOverDark(isDark);
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [probeY]);

  return overDark;
}
