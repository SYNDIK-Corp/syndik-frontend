import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  margin-top: clamp(48px, 10vh, 90px);
  max-width: 46ch;
`;

export const Title = styled.h2`
  margin: 0;
  font-size: clamp(24px, 3vw, 42px);
  font-weight: 300;
  line-height: 1;
  letter-spacing: -0.03em;
  text-transform: uppercase;
`;

export const Description = styled.p`
  margin-top: 18px;
  font-size: 14px;
  line-height: 1.8;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const Actions = styled.div`
  margin-top: 24px;
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
`;

export const CommissionButton = styled(Link)`
  height: 52px;
  padding: 0 24px;
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.white};
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  transition:
    background 0.3s ease,
    color 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.black};
    box-shadow: inset 0 0 0 1px ${({ theme }) => theme.colors.black};
  }
`;

export const BrowseLink = styled(Link)`
  position: relative;
  font-size: 11px;
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
