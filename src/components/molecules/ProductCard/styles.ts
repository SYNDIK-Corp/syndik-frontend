import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const AltImage = styled.div`
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.8s cubic-bezier(0.2, 0.7, 0.2, 1);
`;

export const CartButton = styled.button`
  position: absolute;
  left: 12px;
  bottom: 12px;
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.text};
  color: ${({ theme }) => theme.colors.text};
  opacity: 0;
  transform: translateY(6px);
  transition:
    opacity 0.35s ease,
    transform 0.5s cubic-bezier(0.2, 0.7, 0.2, 1),
    background 0.3s ease,
    color 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.text};
    color: ${({ theme }) => theme.colors.white};
  }
`;

export const Container = styled(Link)`
  display: block;

  &:hover ${AltImage} {
    opacity: 1;
  }

  &:hover ${CartButton} {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Frame = styled.div`
  position: relative;
  aspect-ratio: 4 / 5;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.surface};
`;

export const Image = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const SaleTag = styled.span`
  position: absolute;
  left: 0;
  top: 14px;
  background: ${({ theme }) => theme.colors.text};
  color: ${({ theme }) => theme.colors.white};
  padding: 6px 11px 6px 12px;
  font-size: 9px;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  pointer-events: none;
`;

export const Meta = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const Collection = styled.span`
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const Name = styled.span`
  font-size: 15px;
  font-weight: 500;
  letter-spacing: 0.02em;
`;

export const Prices = styled.div`
  margin-top: 4px;
  display: flex;
  align-items: baseline;
  gap: 10px;
`;

export const Price = styled.span`
  font-size: 14px;
  font-weight: 500;
`;

export const ComparePrice = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textMuted};
  text-decoration: line-through;
`;
