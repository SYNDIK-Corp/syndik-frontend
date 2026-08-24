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
  margin-top: 8px;
  font-size: 16px;
  font-weight: 500;
  word-break: break-word;
`;

export const StatsRow = styled.div`
  margin-top: 18px;
  display: flex;
  gap: 20px;
`;

export const Stat = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

export const StatValue = styled.span`
  font-size: 14px;
  font-weight: 600;
`;

export const StatLabel = styled.span`
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const Nav = styled.div`
  margin-top: 18px;
  border-top: 1px solid ${({ theme }) => theme.colors.black};

  @media (max-width: 760px) {
    margin-top: 14px;
  }
`;

export const NavLink = styled.button<{ $active: boolean }>`
  width: 100%;
  cursor: pointer;
  padding: 10px 0;

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
  margin-top: 16px;

  @media (max-width: 760px) {
    margin-top: 12px;
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
  margin-top: 22px;
  background: ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.white};
  padding: 16px;

  @media (max-width: 760px) {
    margin-top: 16px;
    padding: 14px;
  }
`;

export const MemberRateTrack = styled.div`
  margin-top: 14px;
  position: relative;
  height: 4px;
  background: rgba(255, 255, 255, 0.2);
`;

export const MemberRateFill = styled.div<{ $percent: number }>`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: ${({ $percent }) => $percent}%;
  background: ${({ theme }) => theme.colors.success};
  transition: width 0.6s cubic-bezier(0.2, 0.7, 0.2, 1);
`;

export const MemberRateTick = styled.span<{ $position: number; $hit: boolean }>`
  position: absolute;
  left: ${({ $position }) => $position}%;
  top: -3px;
  width: 10px;
  height: 10px;
  margin-left: -5px;
  border-radius: 50%;
  background: ${({ theme, $hit }) => ($hit ? theme.colors.success : 'rgba(255, 255, 255, 0.5)')};
  transition: background 0.4s ease;
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
