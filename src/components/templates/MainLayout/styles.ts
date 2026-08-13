import styled, { css } from 'styled-components';

export const Main = styled.main<{ $offsetNavbar: boolean }>`
  ${({ theme, $offsetNavbar }) =>
    $offsetNavbar &&
    css`
      padding-top: ${theme.sizes.navbarHeight};
    `}
`;
