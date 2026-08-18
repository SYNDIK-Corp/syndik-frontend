import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as S from './styles';

/* campos de formulário continuam com clique direito/cópia normais — só o
   conteúdo do site (imagem, texto) é protegido. */
function isFormField(target: EventTarget | null): boolean {
  const el = target as HTMLElement | null;
  return !!el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable);
}

/* Fase 11.7 — dissuasão, não proteção real (contornável via DevTools/
   view-source): bloqueia clique direito, cópia e arrastar imagem no site
   inteiro, mostra um toast curto avisando. `user-select: none`
   (styles/global.ts) já cobre a maior parte da seleção — mas com nada
   selecionado o evento `copy` nativo não dispara sozinho (não tem o que
   copiar), então o atalho Ctrl/Cmd+C é pego direto no `keydown`, sem
   depender de existir seleção. */
export function ContentProtection() {
  const { t } = useTranslation();
  const [toastKey, setToastKey] = useState(0);
  const hideTimeout = useRef<number | undefined>(undefined);

  useEffect(() => {
    const showToast = () => {
      setToastKey((key) => key + 1);
    };

    const handleContextMenu = (event: MouseEvent) => {
      if (isFormField(event.target)) return;
      event.preventDefault();
      showToast();
    };

    const handleCopy = (event: ClipboardEvent) => {
      if (isFormField(event.target)) return;
      event.preventDefault();
      showToast();
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      const isCopyShortcut = (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'c';
      if (!isCopyShortcut || isFormField(event.target)) return;
      event.preventDefault();
      showToast();
    };

    // impede salvar imagem só arrastando pro desktop/outra janela — achado
    // real do usuário testando, funciona em qualquer <img> do site
    const handleDragStart = (event: DragEvent) => {
      if ((event.target as HTMLElement | null)?.tagName === 'IMG') {
        event.preventDefault();
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('copy', handleCopy);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('dragstart', handleDragStart);
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('copy', handleCopy);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('dragstart', handleDragStart);
    };
  }, []);

  useEffect(() => {
    if (toastKey === 0) return;
    window.clearTimeout(hideTimeout.current);
    hideTimeout.current = window.setTimeout(() => setToastKey(0), 1600);
    return () => window.clearTimeout(hideTimeout.current);
  }, [toastKey]);

  if (toastKey === 0) return null;
  return <S.Toast key={toastKey}>{t('security.contentProtected')}</S.Toast>;
}
