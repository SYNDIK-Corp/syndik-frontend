export const theme = {
  colors: {
    primary: '#111111',
    primaryHover: '#000000',
    secondary: '#111111',
    background: '#FFFFFF',
    surface: '#F4F4F4',
    text: '#111111',
    textMuted: '#666666',
    border: '#E5E5E5',
    danger: '#DC2626',
    success: '#16A34A',
    white: '#FFFFFF',
  },
  fonts: {
    body: "'Archivo Variable', 'Archivo', system-ui, -apple-system, sans-serif",
    display: "'Space Grotesk Variable', 'Space Grotesk', 'Archivo Variable', sans-serif",
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.5rem',
    xxl: '2rem',
    display: 'clamp(2rem, 3vw + 1rem, 3.25rem)',
  },
  sizes: {
    navbarHeight: '4.5rem',
    logoNavWidth: '5.375rem',
  },
  zIndices: {
    navbar: 100,
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem',
  },
  radii: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '1rem',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 2px rgba(15, 23, 42, 0.06)',
    md: '0 4px 12px rgba(15, 23, 42, 0.10)',
  },
} as const;

export type AppTheme = typeof theme;
