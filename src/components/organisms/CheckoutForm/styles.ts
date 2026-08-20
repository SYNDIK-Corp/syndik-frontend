import styled, { css, keyframes } from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 56px 64px 80px;

  @media (max-width: 760px) {
    padding: 40px 20px 56px;
  }
`;

export const Pane = styled.div`
  width: min(520px, 100%);
  display: flex;
  flex-direction: column;
`;

export const SectionHeader = styled.div`
  margin-top: 0;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 16px;
`;

export const Section = styled.div`
  margin-top: 34px;
`;

export const SectionTitle = styled.h2`
  margin: 0;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 0.01em;
`;

export const SectionSubtitle = styled.p`
  margin: 8px 0 0;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const SignInButton = styled.button`
  position: relative;
  background: none;
  border: 0;
  padding: 0;
  cursor: pointer;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
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

export const FieldGroup = styled.div`
  margin-top: 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const FieldRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
`;

export const CheckboxLabel = styled.label`
  margin-top: 14px;
  display: flex;
  align-items: center;
  gap: 11px;
  cursor: pointer;
`;

export const Checkbox = styled.input`
  width: 15px;
  height: 15px;
  accent-color: ${({ theme }) => theme.colors.black};
`;

export const CheckboxText = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const EmbeddedCheckoutWrap = styled.div`
  margin-top: 16px;

  /* o iframe do Stripe já traz o próprio espaçamento/estilo interno — só
     garante que não fica com altura 0 antes de montar */
  min-height: 320px;
`;

export const PaymentError = styled.p`
  margin-top: 14px;
  font-size: 12px;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.danger};
`;

export const TermsLabel = styled.label`
  margin-top: 24px;
  display: flex;
  align-items: flex-start;
  gap: 11px;
  cursor: pointer;
`;

export const TermsText = styled.span`
  font-size: 12px;
  line-height: 1.65;
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

export const PayButton = styled.button<{ $enabled: boolean }>`
  margin-top: 18px;
  height: 58px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
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

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

export const Spinner = styled.span`
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.35);
  border-top-color: currentColor;
  animation: ${spin} 0.7s linear infinite;

  @media (prefers-reduced-motion: reduce) {
    animation-duration: 1.4s;
  }
`;

export const PayNote = styled.span`
  margin-top: 12px;
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
`;
