import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Icon } from '@/components/atoms/Icon';
import * as S from './styles';

const SCROLL_THRESHOLD_PX = 120;
const FADE_OUT_MS = 350;

/** selo flutuante só no mobile empilhado — o resumo do pedido agora vem
 * primeiro no Checkout, então dá pra pessoa achar que já era e nunca
 * chegar no formulário de pagamento mais embaixo. Some sozinho assim que
 * a pessoa começa a rolar (não fica grudado incomodando o resto da
 * compra). */
export function ScrollNudge() {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(true);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (!visible) return;
    const handleScroll = () => {
      if (window.scrollY > SCROLL_THRESHOLD_PX) {
        setLeaving(true);
        setTimeout(() => setVisible(false), FADE_OUT_MS);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [visible]);

  if (!visible) return null;

  return (
    <S.Nudge $leaving={leaving} role="status">
      <S.Chevron aria-hidden="true">
        <Icon name="chevron-down" size={12} />
      </S.Chevron>
      <span>{t('checkout.scrollNudge')}</span>
    </S.Nudge>
  );
}
