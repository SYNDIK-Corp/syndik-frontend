import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    -webkit-font-smoothing: antialiased;
  }

  body {
    font-family: ${({ theme }) => theme.fonts.body};
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    /* Fase 11.7: conteúdo não é selecionável em lugar nenhum do site, exceto
       campos de formulário (precisam continuar selecionáveis pra digitar/
       colar normalmente — email, PIN, cartão, etc). */
    -webkit-user-select: none;
    user-select: none;
  }

  input,
  textarea {
    -webkit-user-select: text;
    user-select: text;
  }

  button {
    font-family: inherit;
    cursor: pointer;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`;
