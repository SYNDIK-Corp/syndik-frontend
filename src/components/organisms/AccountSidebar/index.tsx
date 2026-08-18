import { useTranslation } from 'react-i18next';
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
}

export function AccountSidebar({
  email,
  userId,
  activeTab,
  onTabChange,
  onSignOut,
  downloadsCount,
  ordersCount,
}: AccountSidebarProps) {
  const { t } = useTranslation();
  /* "Membro ####" — 4 primeiros caracteres do uuid real, só decorativo
     (não é um id sequencial de verdade, é o próprio id do usuário) */
  const memberId = userId.slice(0, 4).toUpperCase();

  const tabs: { key: AccountTab; label: string; count?: number }[] = [
    { key: 'downloads', label: t('account.sidebar.tabs.downloads'), count: downloadsCount },
    { key: 'orders', label: t('account.sidebar.tabs.orders'), count: ordersCount },
    { key: 'details', label: t('account.sidebar.tabs.details') },
  ];

  return (
    <S.Container>
      <S.MemberTag>{t('account.memberTag', { id: memberId })}</S.MemberTag>
      <S.Email>{email}</S.Email>

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

      <S.MemberRateBox>
        <S.MemberRateLabel>{t('account.sidebar.memberRate.label')}</S.MemberRateLabel>
        <S.MemberRateBody>{t('account.sidebar.memberRate.body')}</S.MemberRateBody>
        <S.MemberRateCta to="/products/screens">
          {t('account.sidebar.memberRate.cta')} <span aria-hidden="true">→</span>
        </S.MemberRateCta>
      </S.MemberRateBox>
    </S.Container>
  );
}
