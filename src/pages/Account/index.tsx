import { useEffect, useState } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import { MainLayout } from '@/components/templates/MainLayout';
import { PageLoader } from '@/components/molecules/PageLoader';
import { AccountSidebar, type AccountTab } from '@/components/organisms/AccountSidebar';
import { AccountDownloads } from '@/components/organisms/AccountDownloads';
import { AccountOrders } from '@/components/organisms/AccountOrders';
import { AccountDetails } from '@/components/organisms/AccountDetails';
import { fetchMyEntitlements } from '@/lib/entitlementsApi';
import { fetchMyOrders } from '@/lib/ordersApi';
import { fetchDiscountTiers, type DiscountTier } from '@/lib/couponsApi';
import { useAuth } from '@/hooks/useAuth';
import * as S from './styles';

const VALID_TABS: AccountTab[] = ['downloads', 'orders', 'details'];

export function Account() {
  const { session, profile, loading, signOut } = useAuth();
  const [searchParams] = useSearchParams();
  // volta pra aba certa quando vem de um link direto (ex.: "back" do
  // recibo pra Orders) — só lida com o valor no primeiro render, trocar de
  // aba depois disso é só estado local (não fica reescrevendo a URL a cada
  // clique)
  const [activeTab, setActiveTab] = useState<AccountTab>(() => {
    const requested = searchParams.get('tab');
    return VALID_TABS.includes(requested as AccountTab) ? (requested as AccountTab) : 'downloads';
  });
  const [downloadsCount, setDownloadsCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);
  const [totalSpent, setTotalSpent] = useState(0);
  const [customerSince, setCustomerSince] = useState<string | null>(null);
  const [bestOrderSubtotal, setBestOrderSubtotal] = useState(0);
  const [discountTiers, setDiscountTiers] = useState<DiscountTier[]>([]);

  useEffect(() => {
    if (!session) return;
    fetchMyEntitlements().then((entitlements) => setDownloadsCount(entitlements.length));
    fetchDiscountTiers().then(setDiscountTiers);
    fetchMyOrders().then((orders) => {
      setOrdersCount(orders.length);
      const paidOrders = orders.filter((order) => order.status === 'paid');
      setTotalSpent(paidOrders.reduce((sum, order) => sum + order.total, 0));
      setBestOrderSubtotal(paidOrders.reduce((max, order) => Math.max(max, order.subtotal), 0));
      const earliest = paidOrders
        .map((order) => order.paidAt ?? order.createdAt)
        .sort()[0];
      setCustomerSince(earliest ?? null);
    });
  }, [session]);

  const handleSignOut = () => {
    signOut();
    setActiveTab('downloads');
  };

  // loading = só a sessão inicial (localStorage) ainda restaurando. Depois
  // de um login novo, session já vem rápido via onAuthStateChange, mas
  // profile é buscado à parte (efeito separado no AuthContext) — nesse
  // intervalo session existe e profile ainda é null. Tratar isso como "não
  // logado" (e redirecionar) cria um ping-pong com o guard de sessão do
  // /login (que redireciona de volta pra cá) — tela branca no meio do
  // login. session ausente = não logado de verdade, manda pro /login;
  // session presente sem profile ainda = só esperar mais um instante.
  if (loading || (session && !profile)) {
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
          totalSpent={totalSpent}
          customerSince={customerSince}
          bestOrderSubtotal={bestOrderSubtotal}
          discountTiers={discountTiers}
        />

        {activeTab === 'downloads' && <AccountDownloads />}
        {activeTab === 'orders' && <AccountOrders />}
        {activeTab === 'details' && <AccountDetails profile={profile} />}
      </S.Dashboard>
    </MainLayout>
  );
}
