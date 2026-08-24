import { useTranslation } from 'react-i18next';
import type { DiscountTier } from '@/lib/couponsApi';
import { formatDate, formatPrice } from '@/lib/format';
import * as S from './styles';

export type AccountTab = 'downloads' | 'orders' | 'details';

export interface AccountSidebarProps {
  email: string;
  userId: string;
  activeTab: AccountTab;
  onTabChange: (tab: AccountTab) => void;
  onSignOut: () => void;
  downloadsCount: number;
  ordersCount: number;
  totalSpent: number;
  /* data do pedido pago mais antigo — null pra quem ainda não comprou nada */
  customerSince: string | null;
  /* maior subtotal entre os pedidos pagos — usado só pra plotar na mesma
     barra de tier do carrinho (o desconto é por pedido, não cumulativo;
     isso mostra o que o histórico já alcançou, não uma meta acumulada) */
  bestOrderSubtotal: number;
  discountTiers: DiscountTier[];
}

export function AccountSidebar({
  email,
  userId,
  activeTab,
  onTabChange,
  onSignOut,
  downloadsCount,
  ordersCount,
  totalSpent,
  customerSince,
  bestOrderSubtotal,
  discountTiers,
}: AccountSidebarProps) {
  const { t, i18n } = useTranslation();
  /* "Membro ####" — 4 primeiros caracteres do uuid real, só decorativo
     (não é um id sequencial de verdade, é o próprio id do usuário) */
  const memberId = userId.slice(0, 4).toUpperCase();

  const tabs: { key: AccountTab; label: string; count?: number }[] = [
    { key: 'downloads', label: t('account.sidebar.tabs.downloads'), count: downloadsCount },
    { key: 'orders', label: t('account.sidebar.tabs.orders'), count: ordersCount },
    { key: 'details', label: t('account.sidebar.tabs.details') },
  ];

  const lastTier = discountTiers[discountTiers.length - 1];
  const nextTier = discountTiers.find((tier) => bestOrderSubtotal < tier.min_subtotal);
  const bestHitTier = [...discountTiers].reverse().find((tier) => bestOrderSubtotal >= tier.min_subtotal);
  const progressPercent = lastTier ? Math.min(100, (bestOrderSubtotal / lastTier.min_subtotal) * 100) : 0;

  return (
    <S.Container>
      <S.MemberTag>{t('account.memberTag', { id: memberId })}</S.MemberTag>
      <S.Email>{email}</S.Email>

      <S.StatsRow>
        <S.Stat>
          <S.StatValue>{formatPrice(totalSpent, i18n.language)}</S.StatValue>
          <S.StatLabel>{t('account.sidebar.stats.totalSpent')}</S.StatLabel>
        </S.Stat>
        <S.Stat>
          <S.StatValue>{customerSince ? formatDate(customerSince, i18n.language) : '—'}</S.StatValue>
          <S.StatLabel>{t('account.sidebar.stats.customerSince')}</S.StatLabel>
        </S.Stat>
      </S.StatsRow>

      <S.Nav>
        {tabs.map((tab) => (
          <S.NavLink key={tab.key} type="button" $active={activeTab === tab.key} onClick={() => onTabChange(tab.key)}>
            <S.NavLinkLabel $active={activeTab === tab.key}>{tab.label}</S.NavLinkLabel>
            {tab.count !== undefined && <S.NavLinkCount>{tab.count}</S.NavLinkCount>}
          </S.NavLink>
        ))}
      </S.Nav>

      <S.SignOutButton type="button" onClick={onSignOut}>
        {t('account.sidebar.signOut')}
      </S.SignOutButton>

      {lastTier && (
        <S.MemberRateBox>
          <S.MemberRateLabel>{t('account.sidebar.memberRate.label')}</S.MemberRateLabel>
          <S.MemberRateBody>
            {bestHitTier
              ? nextTier
                ? t('account.sidebar.memberRate.progress', {
                    percent: Math.round(bestHitTier.discount_rate * 100),
                    nextPercent: Math.round(nextTier.discount_rate * 100),
                    amount: formatPrice(nextTier.min_subtotal - bestOrderSubtotal, i18n.language),
                  })
                : t('account.sidebar.memberRate.topTier', { percent: Math.round(bestHitTier.discount_rate * 100) })
              : t('account.sidebar.memberRate.none', {
                  percent: Math.round(discountTiers[0].discount_rate * 100),
                  amount: formatPrice(discountTiers[0].min_subtotal, i18n.language),
                })}
          </S.MemberRateBody>

          <S.MemberRateTrack>
            <S.MemberRateFill $percent={progressPercent} />
            {discountTiers.map((tier) => (
              <S.MemberRateTick
                key={tier.id}
                $position={lastTier ? (tier.min_subtotal / lastTier.min_subtotal) * 100 : 0}
                $hit={bestOrderSubtotal >= tier.min_subtotal}
              />
            ))}
          </S.MemberRateTrack>

          <S.MemberRateCta to="/products/screens">
            {t('account.sidebar.memberRate.cta')} <span aria-hidden="true">→</span>
          </S.MemberRateCta>
        </S.MemberRateBox>
      )}
    </S.Container>
  );
}
