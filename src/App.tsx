import { ThemeProvider } from 'styled-components';
import { theme } from '@/styles/theme';
import { GlobalStyle } from '@/styles/global';
import { CartProvider } from '@/contexts/CartContext';
import { AppRoutes } from '@/routes';
import '@/lib/i18n';

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <CartProvider>
        <AppRoutes />
      </CartProvider>
    </ThemeProvider>
  );
}
