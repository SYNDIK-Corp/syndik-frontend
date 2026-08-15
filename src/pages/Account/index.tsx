import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MainLayout } from '@/components/templates/MainLayout';
import { AccountGate } from '@/components/organisms/AccountGate';
import { AccountSidebar, type AccountTab } from '@/components/organisms/AccountSidebar';
import { AccountDownloads } from '@/components/organisms/AccountDownloads';
import { AccountOrders } from '@/components/organisms/AccountOrders';
import { AccountDetails } from '@/components/organisms/AccountDetails';
import { accountDownloads } from '@/data/accountDownloads';
import { accountOrders } from '@/data/accountOrders';
import * as S from './styles';

export function Account() {
  const { t } = useTranslation();
  const [signedIn, setSignedIn] = useState(false);
  const [activeTab, setActiveTab] = useState<AccountTab>('downloads');
  const memberEmail = t('account.mockEmail');

  const handleSignOut = () => {
    setSignedIn(false);
    setActiveTab('downloads');
  };

  return (
    <MainLayout>
      {signedIn ? (
        <S.Dashboard>
          <AccountSidebar
            email={memberEmail}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            onSignOut={handleSignOut}
            downloadsCount={accountDownloads.length}
            ordersCount={accountOrders.length}
          />

          {activeTab === 'downloads' && <AccountDownloads />}
          {activeTab === 'orders' && <AccountOrders />}
          {activeTab === 'details' && <AccountDetails email={memberEmail} />}
        </S.Dashboard>
      ) : (
        <AccountGate onSignIn={() => setSignedIn(true)} />
      )}
    </MainLayout>
  );
}
