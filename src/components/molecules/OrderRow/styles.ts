import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding: 18px 0;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 18px;
  align-items: center;
  transition: background 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.surface};
  }
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
  min-width: 0;
`;

export const Meta = styled.span`
  font-size: 9px;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const Items = styled.span`
  font-size: 14px;
`;

export const PaymentMethod = styled.span`
  font-size: 11px;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  white-space: nowrap;
`;

export const Total = styled.span`
  font-size: 15px;
  font-weight: 500;
`;

export const ReceiptLink = styled(Link)`
  height: 36px;
  padding: 0 14px;
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.black};
  font-size: 9px;
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  transition:
    background 0.3s ease,
    color 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.black};
    color: ${({ theme }) => theme.colors.white};
  }
`;
