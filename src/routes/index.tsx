import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Home } from '@/pages/Home';
import { Catalog } from '@/pages/Catalog';
import { Contact } from '@/pages/Contact';

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Navigate to="/products/screens" replace />} />
        <Route path="/products/screens" element={<Catalog sheet="screens" />} />
        <Route path="/products/sound" element={<Catalog sheet="sound" />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}
