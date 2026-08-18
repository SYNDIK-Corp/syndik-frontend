import { useState } from 'react';
import { MainLayout } from '@/components/templates/MainLayout';
import { PageLoader } from '@/components/molecules/PageLoader';
import { AccountGate } from '@/components/organisms/AccountGate';
import { AccountSidebar, type AccountTab } from '@/components/organisms/AccountSidebar';
import { AccountDownloads } from '@/components/organisms/AccountDownloads';
import { AccountOrders } from '@/components/organisms/AccountOrders';
import { AccountDetails } from '@/components/organisms/AccountDetails';
import { accountDownloads } from '@/data/accountDownloads';
import { accountOrders } from '@/data/accountOrders';
import { useAuth } from '@/hooks/useAuth';
import * as S from './styles';

export function Account() {
  const { session, profile, loading, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState<AccountTab>('downloads');

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

  return (
    <MainLayout>
      {session && profile ? (
        <S.Dashboard>
          <AccountSidebar
            email={profile.email}
            userId={profile.id}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            onSignOut={handleSignOut}
            downloadsCount={accountDownloads.length}
            ordersCount={accountOrders.length}
          />

          {activeTab === 'downloads' && <AccountDownloads />}
          {activeTab === 'orders' && <AccountOrders />}
          {activeTab === 'details' && <AccountDetails profile={profile} />}
        </S.Dashboard>
      ) : (
        <AccountGate onSignIn={() => setActiveTab('downloads')} />
      )}
    </MainLayout>
  );
}
