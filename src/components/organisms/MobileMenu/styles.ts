import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const Backdrop = styled.div<{ $open: boolean }>`
  position: fixed;
  inset: 0;
  z-index: ${({ theme }) => theme.zIndices.drawer};
  background: rgba(10, 10, 10, 0.45);
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  pointer-events: ${({ $open }) => ($open ? 'auto' : 'none')};
  transition: opacity 0.35s ease;

  @media (min-width: 641px) {
    display: none;
  }
`;

export const Drawer = styled.aside<{ $open: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: ${({ theme }) => theme.zIndices.drawer + 1};
  width: min(320px, 86vw);
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.text};
  transform: translateX(${({ $open }) => ($open ? '0' : '-100%')});
  transition: transform 0.4s cubic-bezier(0.2, 0.7, 0.2, 1);

  @media (min-width: 641px) {
    display: none;
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const HeaderLabel = styled.span`
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const CloseButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border: none;
  background: transparent;
  color: inherit;
`;

export const Nav = styled.nav`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 20px;
  overflow-y: auto;
`;

export const NavItem = styled(NavLink)`
  padding: 12px 0;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  transition: color 0.2s ease;

  &:hover,
  &.active {
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const MiniSection = styled.div`
  padding: 18px 20px 22px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

export const MiniTitle = styled.span`
  display: block;
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const MiniRail = styled.div`
  margin-top: 14px;
  display: flex;
  gap: 12px;
  overflow-x: auto;
  scroll-snap-type: x proximity;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const MiniItem = styled.div`
  flex: 0 0 124px;
  scroll-snap-align: start;
`;
