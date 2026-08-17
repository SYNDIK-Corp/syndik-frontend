import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ScrollToTop } from './ScrollToTop';
import { Home } from '@/pages/Home';
import { Catalog } from '@/pages/Catalog';
import { ProductDetail } from '@/pages/ProductDetail';
import { Checkout } from '@/pages/Checkout';
import { Account } from '@/pages/Account';
import { OrderConfirmation } from '@/pages/OrderConfirmation';
import { Search } from '@/pages/Search';
import { Contact } from '@/pages/Contact';

export function AppRoutes() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Navigate to="/products/screens" replace />} />
        <Route path="/products/screens" element={<Catalog sheet="screens" />} />
        <Route path="/products/sound" element={<Catalog sheet="sound" />} />
        <Route path="/products/:sheet/:id" element={<ProductDetail />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/account" element={<Account />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
        <Route path="/search" element={<Search />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}
