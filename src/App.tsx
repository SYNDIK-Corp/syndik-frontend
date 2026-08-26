import { useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/styles/theme';
import { GlobalStyle } from '@/styles/global';
import { AuthProvider } from '@/contexts/AuthContext';
import { CartProvider } from '@/contexts/CartContext';
import { AppRoutes } from '@/routes';
import { ContentProtection } from '@/components/organisms/ContentProtection';
import { captureAttributionFromUrl } from '@/lib/attribution';
import '@/lib/i18n';

export function App() {
  useEffect(() => {
    captureAttributionFromUrl();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <ContentProtection />
      <AuthProvider>
        <CartProvider>
          <AppRoutes />
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
