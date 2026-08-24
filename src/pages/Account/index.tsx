import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { MainLayout } from '@/components/templates/MainLayout';
import { PageLoader } from '@/components/molecules/PageLoader';
import { AccountSidebar, type AccountTab } from '@/components/organisms/AccountSidebar';
import { AccountDownloads } from '@/components/organisms/AccountDownloads';
import { AccountOrders } from '@/components/organisms/AccountOrders';
import { AccountDetails } from '@/components/organisms/AccountDetails';
import { fetchMyEntitlements } from '@/lib/entitlementsApi';
import { fetchMyOrders } from '@/lib/ordersApi';
import { useAuth } from '@/hooks/useAuth';
import * as S from './styles';

export function Account() {
  const { session, profile, loading, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState<AccountTab>('downloads');
  const [downloadsCount, setDownloadsCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);

  useEffect(() => {
    if (!session) return;
    fetchMyEntitlements().then((entitlements) => setDownloadsCount(entitlements.length));
    fetchMyOrders().then((orders) => setOrdersCount(orders.length));
  }, [session]);

  const handleSignOut = () => {
    signOut();
    setActiveTab('downloads');
  };

  if (loading) {
    return (
      <MainLayout>
        <PageLoader />
      </MainLayout>
    );
  }

  // mesma tela de login pra tudo (checkout, conta) — o AccountGate antigo
  // (email+PIN) foi aposentado quando login/registro viraram email+código.
  if (!session || !profile) {
    return <Navigate to="/login?redirect=/account" replace />;
  }

  return (
    <MainLayout>
      <S.Dashboard>
        <AccountSidebar
          email={profile.email}
          userId={profile.id}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onSignOut={handleSignOut}
          downloadsCount={downloadsCount}
          ordersCount={ordersCount}
        />

        {activeTab === 'downloads' && <AccountDownloads />}
        {activeTab === 'orders' && <AccountOrders />}
        {activeTab === 'details' && <AccountDetails profile={profile} />}
      </S.Dashboard>
    </MainLayout>
  );
}
