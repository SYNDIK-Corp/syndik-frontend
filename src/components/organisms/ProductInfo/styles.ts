import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  padding-bottom: clamp(20px, 5vh, 60px);
`;

export const Title = styled.h1`
  margin-top: 14px;
  font-size: clamp(26px, 2.6vw, 40px);
  font-weight: 300;
  line-height: 1.02;
  letter-spacing: -0.03em;
  text-transform: uppercase;
`;

export const Subtitle = styled.p`
  margin-top: 6px;
  font-size: 13px;
  letter-spacing: 0.01em;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const PriceRow = styled.div`
  margin-top: 14px;
  display: flex;
  align-items: baseline;
  gap: 12px;
`;

export const Price = styled.span`
  font-size: 20px;
  font-weight: 500;
`;

export const ComparePrice = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.danger};
  text-decoration: line-through;
  text-decoration-thickness: 1.5px;
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

export const Description = styled.div`
  margin-top: 14px;
  max-width: 48ch;
  font-size: 13px;
  line-height: 1.65;
  color: ${({ theme }) => theme.colors.textMuted};

  p {
    margin: 0;
  }
`;

export const DetailsToggle = styled.button`
  margin-top: 10px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.text};
`;

export const ToggleIcon = styled.span<{ $open: boolean }>`
  display: flex;
  transform: rotate(${({ $open }) => ($open ? '180deg' : '0deg')});
  transition: transform 0.35s cubic-bezier(0.2, 0.7, 0.2, 1);
`;

export const DetailsPanel = styled.div<{ $open: boolean }>`
  display: grid;
  grid-template-rows: ${({ $open }) => ($open ? '1fr' : '0fr')};
  transition: grid-template-rows 0.4s cubic-bezier(0.2, 0.7, 0.2, 1);
`;

export const DetailsPanelInner = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-top: 12px;
`;

export const MetaLine = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 8px;
  font-size: 12.5px;
  line-height: 1.55;
`;

export const MetaLabel = styled.span`
  flex: 0 0 auto;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.text};
`;

const badgeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const IncludedBar = styled.div`
  margin-top: 20px;
  padding: 11px 0;
  border-top: 1px solid ${({ theme }) => theme.colors.black};
  border-bottom: 1px solid ${({ theme }) => theme.colors.black};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
`;

export const IncludedTotal = styled.span`
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
`;

export const IncludedBadges = styled.div`
  display: flex;
  gap: 22px;
`;

export const IncludedBadge = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  animation: ${badgeIn} 0.5s cubic-bezier(0.2, 0.7, 0.2, 1) both;
`;

export const IncludedValue = styled.span`
  font-size: 15px;
  font-weight: 600;
  line-height: 1;
`;

export const IncludedLabel = styled.span`
  font-size: 9px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const AddToCartButton = styled.button`
  margin-top: 18px;
  width: 100%;
  height: 46px;
  background: ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  cursor: pointer;
  font-size: 10.5px;
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
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

export const TrustBar = styled.div`
  margin-top: 16px;
  padding-top: 12px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const TrustLabel = styled.span`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 9px;
  font-weight: 600;
  font-style: italic;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const TrustRow = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
`;

export const TrustItem = styled.span`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.text};

  svg {
    flex: 0 0 auto;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const TrustDivider = styled.span`
  flex: 0 0 auto;
  width: 1px;
  height: 14px;
  background: ${({ theme }) => theme.colors.border};
`;

export const ExclusivityBox = styled.div`
  position: relative;
  overflow: hidden;
  margin-top: 20px;
  padding: 15px 18px;
  background: ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.white};
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(
      -45deg,
      rgba(255, 255, 255, 0.035) 0,
      rgba(255, 255, 255, 0.035) 1px,
      transparent 1px,
      transparent 9px
    );
    pointer-events: none;
  }
`;

export const ExclusivityMark = styled.span`
  flex: 0 0 auto;
  font-size: 18px;
  line-height: 1;
  color: rgba(255, 255, 255, 0.35);
`;

export const ExclusivityText = styled.div`
  flex: 1 1 220px;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const ExclusivityLabel = styled.span`
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.6);
`;

export const ExclusivityBody = styled.span`
  font-size: 12.5px;
  line-height: 1.4;
`;

export const ExclusivityCta = styled(Link)`
  position: relative;
  color: ${({ theme }) => theme.colors.white};
  font-size: 10.5px;
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  white-space: nowrap;

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
  margin-top: 22px;
  display: flex;
  flex-direction: column;
`;
