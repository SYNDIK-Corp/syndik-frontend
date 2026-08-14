import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  padding-bottom: clamp(20px, 5vh, 60px);
`;

export const Title = styled.h1`
  margin-top: 16px;
  font-size: clamp(34px, 4.4vw, 62px);
  font-weight: 300;
  line-height: 0.95;
  letter-spacing: -0.04em;
  text-transform: uppercase;
`;

export const PriceRow = styled.div`
  margin-top: 18px;
  display: flex;
  align-items: baseline;
  gap: 14px;
`;

export const Price = styled.span`
  font-size: 24px;
  font-weight: 500;
`;

export const ComparePrice = styled.span`
  font-size: 15px;
  color: ${({ theme }) => theme.colors.textMuted};
  text-decoration: line-through;
`;

export const SaleTag = styled.span`
  font-size: 9px;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  background: ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.white};
  padding: 5px 9px;
`;

export const Description = styled.p`
  margin-top: 22px;
  font-size: 15px;
  line-height: 1.8;
  color: ${({ theme }) => theme.colors.textMuted};
  max-width: 42ch;
`;

export const IncludedList = styled.div`
  margin-top: 26px;
  display: flex;
  flex-direction: column;
`;

export const IncludedHeader = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.black};
  padding: 13px 0;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 14px;
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const IncludedRow = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding: 12px 0;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 14px;
  transition: padding-left 0.4s cubic-bezier(0.2, 0.7, 0.2, 1);

  &:last-child {
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }

  &:hover {
    padding-left: 8px;
  }
`;

export const IncludedLabel = styled.span`
  font-size: 13px;
  font-weight: 500;
`;

export const IncludedValue = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const AddToCartButton = styled.button`
  margin-top: 24px;
  width: 100%;
  height: 58px;
  background: ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  cursor: pointer;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
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

export const Perks = styled.div`
  margin-top: 14px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px 24px;
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const ExclusivityBox = styled.div`
  margin-top: 30px;
  padding: 16px 18px;
  background: ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  flex-wrap: wrap;
`;

export const ExclusivityText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const ExclusivityLabel = styled.span`
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.6);
`;

export const ExclusivityBody = styled.span`
  font-size: 13px;
`;

export const ExclusivityCta = styled(Link)`
  color: ${({ theme }) => theme.colors.white};
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  white-space: nowrap;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -4px;
    height: 1px;
    width: 0;
    background: currentColor;
    transition: width 0.45s cubic-bezier(0.2, 0.7, 0.2, 1);
  }

  &:hover::after {
    width: 100%;
  }
`;

export const FaqList = styled.div`
  margin-top: 28px;
  display: flex;
  flex-direction: column;
`;
