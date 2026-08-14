import styled, { css } from 'styled-components';
import { TextField } from '@/components/atoms/TextField';

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

export const ExpressLabel = styled.span`
  text-align: center;
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const ExpressGrid = styled.div`
  margin-top: 14px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const expressButtonBase = css`
  height: 50px;
  cursor: pointer;
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  transition:
    background 0.3s ease,
    color 0.3s ease,
    border-color 0.3s ease;
`;

export const ExpressPrimaryButton = styled.button`
  ${expressButtonBase}
  background: ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.white};
  border: 0;

  &:hover {
    background: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.black};
    box-shadow: inset 0 0 0 1px ${({ theme }) => theme.colors.black};
  }
`;

export const ExpressOutlineButton = styled.button`
  ${expressButtonBase}
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.black};

  &:hover {
    background: ${({ theme }) => theme.colors.black};
    color: ${({ theme }) => theme.colors.white};
  }
`;

export const Divider = styled.div`
  margin: 26px 0 0;
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const DividerLine = styled.span`
  flex: 1;
  height: 1px;
  background: ${({ theme }) => theme.colors.border};
`;

export const DividerLabel = styled.span`
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const SectionHeader = styled.div`
  margin-top: 26px;
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

export const PinBox = styled.div<{ $open: boolean }>`
  margin-top: 14px;
  border: 1px solid ${({ theme }) => theme.colors.black};
  padding: 16px;
  display: ${({ $open }) => ($open ? 'flex' : 'none')};
  flex-direction: column;
  gap: 12px;
`;

export const PinLabel = styled.span`
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const PinRow = styled.div`
  display: flex;
  gap: 8px;
`;

export const PinInput = styled(TextField)`
  letter-spacing: 0.5em;
  text-align: center;
  font-size: 18px;
`;

export const PinEnterButton = styled.button`
  flex: 0 0 88px;
  height: 50px;
  background: ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.white};
  border: 0;
  cursor: pointer;
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  transition:
    background 0.3s ease,
    color 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.black};
    box-shadow: inset 0 0 0 1px ${({ theme }) => theme.colors.black};
  }
`;

export const PinHint = styled.span`
  font-size: 11px;
  color: ${({ theme }) => theme.colors.textMuted};
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

export const PaymentBox = styled.div`
  margin-top: 16px;
  border: 1px solid ${({ theme }) => theme.colors.black};
`;

export const Brand = styled.span`
  height: 24px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 0 8px;
  display: flex;
  align-items: center;
  font-size: 8px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const MoreBrands = styled.span`
  font-size: 10px;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const CardPanel = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const PixNote = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding: 16px;
  font-size: 13px;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.textMuted};
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

export const PayNote = styled.span`
  margin-top: 12px;
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
`;
