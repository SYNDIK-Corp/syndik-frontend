import { ThemeProvider } from 'styled-components';
import { theme } from '@/styles/theme';
import { GlobalStyle } from '@/styles/global';
import { AuthProvider } from '@/contexts/AuthContext';
import { CartProvider } from '@/contexts/CartContext';
import { AppRoutes } from '@/routes';
import { ContentProtection } from '@/components/organisms/ContentProtection';
import '@/lib/i18n';

export function App() {
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
