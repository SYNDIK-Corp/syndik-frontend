import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Header = styled.header`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const HeaderInner = styled.div`
  max-width: 1500px;
  margin: 0 auto;
  padding: 16px 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
`;

export const RightGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 22px;
`;

export const OrderBadge = styled.span`
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const AccountLink = styled(Link)`
  position: relative;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.16em;
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
