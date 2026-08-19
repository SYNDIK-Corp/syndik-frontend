import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.aside`
  position: sticky;
  top: calc(${({ theme }) => theme.sizes.navbarHeight} + 24px);
`;

export const MemberTag = styled.div`
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const Email = styled.div`
  margin-top: 10px;
  font-size: 17px;
  font-weight: 500;
  word-break: break-word;
`;

export const Nav = styled.div`
  margin-top: 26px;
  border-top: 1px solid ${({ theme }) => theme.colors.black};

  @media (max-width: 760px) {
    margin-top: 16px;
  }
`;

export const NavLink = styled.button<{ $active: boolean }>`
  width: 100%;
  cursor: pointer;
  padding: 12px 0;

  @media (max-width: 760px) {
    padding: 9px 0;
  }
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  border: 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background: none;
  font-family: inherit;
  transition: padding-left 0.4s cubic-bezier(0.2, 0.7, 0.2, 1);

  &:hover {
    padding-left: 8px;
  }
`;

export const NavLinkLabel = styled.span<{ $active: boolean }>`
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.04em;
  color: ${({ theme, $active }) => ($active ? theme.colors.text : theme.colors.textMuted)};
`;

export const NavLinkCount = styled.span`
  font-size: 11px;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const SignOutButton = styled.button`
  margin-top: 22px;

  @media (max-width: 760px) {
    margin-top: 14px;
  }
  background: none;
  border: 0;
  padding: 0;
  cursor: pointer;
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const MemberRateBox = styled.div`
  margin-top: 34px;
  background: ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.white};
  padding: 18px;

  @media (max-width: 760px) {
    margin-top: 20px;
    padding: 14px;
  }
`;

export const MemberRateLabel = styled.span`
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.6);
`;

export const MemberRateBody = styled.p`
  margin: 10px 0 0;
  font-size: 13px;
  line-height: 1.6;
`;

export const MemberRateCta = styled(Link)`
  position: relative;
  display: inline-block;
  margin-top: 14px;
  color: ${({ theme }) => theme.colors.white};
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -3px;
    height: 1px;
    width: 0;
    background: currentColor;
    transition: width 0.45s cubic-bezier(0.2, 0.7, 0.2, 1);
  }

  &:hover::after {
    width: 100%;
  }
`;
