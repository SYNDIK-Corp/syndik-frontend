import styled, { css, keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

export const Backdrop = styled.div<{ $open: boolean }>`
  position: fixed;
  inset: 0;
  z-index: ${({ theme }) => theme.zIndices.drawer};
  background: rgba(10, 10, 10, 0.32);
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  pointer-events: ${({ $open }) => ($open ? 'auto' : 'none')};
  transition: opacity 0.35s ease;
`;

export const OverlayContent = styled.div`
  position: fixed;
  inset: 0;
  z-index: ${({ theme }) => theme.zIndices.drawer + 1};
  display: flex;
  justify-content: flex-end;
  align-items: stretch;
  gap: 18px;
  padding: 18px;
  pointer-events: none;
`;

export const RecommendationsRail = styled.div<{ $open: boolean }>`
  width: 208px;
  align-self: stretch;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 14px;
  scrollbar-width: none;
  pointer-events: ${({ $open }) => ($open ? 'auto' : 'none')};
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  transform: translateX(${({ $open }) => ($open ? '0' : '16px')});
  transition:
    opacity 0.4s ease,
    transform 0.4s cubic-bezier(0.2, 0.7, 0.2, 1);

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 900px) {
    display: none;
  }
`;

export const Drawer = styled.aside<{ $open: boolean }>`
  width: min(456px, 92vw);
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.text};
  box-shadow: -24px 0 70px rgba(10, 10, 10, 0.2);
  pointer-events: ${({ $open }) => ($open ? 'auto' : 'none')};
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  transform: translateX(${({ $open }) => ($open ? '0' : '24px')});
  transition:
    opacity 0.4s ease,
    transform 0.4s cubic-bezier(0.2, 0.7, 0.2, 1);
`;

export const Header = styled.div`
  padding: 18px 22px;
  display: grid;
  grid-template-columns: 24px 1fr 24px;
  align-items: center;
`;

export const Title = styled.span`
  text-align: center;
  font-size: 17px;
  font-weight: 500;
  letter-spacing: 0.02em;
`;

export const CloseButton = styled.button`
  justify-self: end;
  background: none;
  border: 0;
  padding: 0;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
`;

const urgentPulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.55; }
`;

export const HoldBanner = styled.div<{ $urgent: boolean }>`
  background: ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.white};
  padding: 10px 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;

  svg {
    flex: 0 0 auto;
    animation: ${({ $urgent }) => ($urgent ? css`${urgentPulse} 1s ease-in-out infinite` : 'none')};
  }
`;

export const HoldClock = styled.span`
  font-variant-numeric: tabular-nums;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0;
  background: rgba(255, 255, 255, 0.14);
  padding: 2px 8px;
`;

export const UnlockSection = styled.div`
  padding: 18px 22px 0;
`;

export const UnlockMessage = styled.div`
  text-align: center;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textMuted};
`;

/* MVP 2.2.3: valores de economia/desconto em destaque próprio (verde,
   theme.colors.success — token já existia no design system, nunca usado em
   lugar nenhum) em vez de se misturar com o resto do texto em preto */
export const Emphasis = styled.strong`
  font-weight: 700;
  color: ${({ theme }) => theme.colors.success};
`;

export const ProgressTrack = styled.div`
  margin-top: 16px;
  position: relative;
  height: 5px;
  background: ${({ theme }) => theme.colors.border};
`;

export const ProgressFill = styled.div<{ $percent: number }>`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: ${({ $percent }) => $percent}%;
  background: ${({ theme }) => theme.colors.success};
  transition: width 0.6s cubic-bezier(0.2, 0.7, 0.2, 1);
`;

export const ProgressTick = styled.span<{ $position: number; $hit: boolean }>`
  position: absolute;
  left: ${({ $position }) => $position}%;
  top: -4px;
  width: 13px;
  height: 13px;
  margin-left: -6.5px;
  background: ${({ theme, $hit }) => ($hit ? theme.colors.success : theme.colors.white)};
  box-shadow: inset 0 0 0 1px ${({ theme, $hit }) => ($hit ? theme.colors.success : theme.colors.black)};
  transform: scale(${({ $hit }) => ($hit ? 1.15 : 1)});
  transition:
    background 0.4s ease,
    box-shadow 0.4s ease,
    transform 0.4s cubic-bezier(0.2, 0.7, 0.2, 1);
`;

export const TierLabels = styled.div`
  margin-top: 14px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
`;

export const TierLabel = styled.span<{ $hit: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  height: 24px;
  border: 1px solid ${({ theme, $hit }) => ($hit ? theme.colors.success : theme.colors.border)};
  background: ${({ theme, $hit }) => ($hit ? theme.colors.success : 'transparent')};
  color: ${({ theme, $hit }) => ($hit ? theme.colors.white : theme.colors.textMuted)};
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  transition:
    background 0.3s ease,
    border-color 0.3s ease,
    color 0.3s ease;
`;

export const Lines = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 18px 22px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const EmptyMessage = styled.p`
  margin: 26px 0;
  font-size: 13px;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const Footer = styled.div`
  padding: 16px 22px 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const SummaryRow = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const SubtotalRow = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
`;

export const SubtotalLabel = styled.span`
  font-size: 15px;
  font-weight: 500;
`;

export const SubtotalValue = styled.span`
  font-size: 17px;
  font-weight: 500;
`;

export const TermsLabel = styled.label`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  cursor: pointer;
`;

export const TermsCheckbox = styled.input`
  margin-top: 2px;
  width: 15px;
  height: 15px;
  accent-color: ${({ theme }) => theme.colors.black};
`;

export const TermsText = styled.span`
  font-size: 11px;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const TermLink = styled.a`
  position: relative;
  color: ${({ theme }) => theme.colors.text};

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

export const CheckoutButton = styled.button<{ $enabled: boolean }>`
  height: 56px;
  background: ${({ $enabled, theme }) => ($enabled ? theme.colors.black : '#BFBFBF')};
  color: ${({ theme }) => theme.colors.white};
  border: 0;
  cursor: ${({ $enabled }) => ($enabled ? 'pointer' : 'default')};
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  transition:
    background 0.3s ease,
    color 0.3s ease,
    box-shadow 0.3s ease;

  ${({ $enabled, theme }) =>
    $enabled &&
    css`
      &:hover {
        background: ${theme.colors.white};
        color: ${theme.colors.black};
        box-shadow: inset 0 0 0 1px ${theme.colors.black};
      }
    `}
`;

export const PaymentRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
`;

export const PaymentButton = styled.button`
  height: 46px;
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.black};
  cursor: pointer;
  font-size: 10px;
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

export const ContinueShopping = styled(Link)`
  align-self: center;
  margin-top: 2px;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
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
