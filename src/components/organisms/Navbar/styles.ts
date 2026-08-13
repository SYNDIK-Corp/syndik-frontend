import styled, { css } from 'styled-components';
import { NavLink } from 'react-router-dom';

export type NavbarMode = 'solid' | 'light' | 'dark' | 'black';

export const Container = styled.header<{ $mode: NavbarMode }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: ${({ theme }) => theme.zIndices.navbar};
  height: ${({ theme }) => theme.sizes.navbarHeight};
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  padding: 0 ${({ theme }) => theme.spacing.xl};
  transition:
    background-color 0.25s ease,
    color 0.25s ease,
    box-shadow 0.25s ease;

  ${({ theme, $mode }) => {
    switch ($mode) {
      case 'solid':
        return css`
          background-color: ${theme.colors.white};
          color: ${theme.colors.text};
          box-shadow: ${theme.shadows.sm};
        `;
      case 'black':
        return css`
          background-color: ${theme.colors.black};
          color: ${theme.colors.white};
        `;
      case 'dark':
        return css`
          background-color: transparent;
          color: ${theme.colors.white};
        `;
      default:
        return css`
          background-color: transparent;
          color: ${theme.colors.text};
        `;
    }
  }}
`;

export const LeftCell = styled.div`
  display: flex;
  align-items: center;
`;

export const NavLinks = styled.nav`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: 640px) {
    display: none;
  }
`;

export const MobileLeft = styled.div`
  display: none;
  align-items: center;
  gap: 2px;

  @media (max-width: 640px) {
    display: flex;
  }
`;

export const NavItem = styled(NavLink)`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 500;
  opacity: 0.75;
  transition: opacity 0.2s ease;

  &:hover,
  &.active {
    opacity: 1;
  }
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const IconButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  border: none;
  border-radius: ${({ theme }) => theme.radii.full};
  background-color: transparent;
  color: inherit;
  opacity: 0.85;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 1;
  }
`;

export const DesktopSearchButton = styled(IconButton)`
  @media (max-width: 640px) {
    display: none;
  }
`;
