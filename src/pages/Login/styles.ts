import styled, { keyframes } from 'styled-components';
import { TextField } from '@/components/atoms/TextField';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const Container = styled.div`
  min-height: 100vh;
  min-height: 100svh;
  display: grid;
  grid-template-columns: 1.1fr 1fr;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
  }
`;

export const ArtPane = styled.div`
  position: relative;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.black};

  @media (max-width: 860px) {
    display: none;
  }
`;

export const ArtImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  animation: ${fadeIn} 0.5s ease;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const FormPane = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xxl};

  @media (max-width: 480px) {
    padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.lg};
  }
`;

export const FormColumn = styled.div`
  width: 100%;
  max-width: 340px;
  display: flex;
  flex-direction: column;
`;

export const LogoWrapper = styled.div`
  align-self: center;
`;

export const Tabs = styled.div`
  margin-top: 32px;
  display: flex;
  border: 1px solid ${({ theme }) => theme.colors.black};
`;

export const Tab = styled.button<{ $active: boolean }>`
  flex: 1;
  height: 42px;
  border: 0;
  cursor: pointer;
  background: ${({ theme, $active }) => ($active ? theme.colors.black : 'transparent')};
  color: ${({ theme, $active }) => ($active ? theme.colors.white : theme.colors.textMuted)};
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  transition:
    background 0.25s ease,
    color 0.25s ease;

  &:hover {
    color: ${({ theme, $active }) => ($active ? theme.colors.white : theme.colors.text)};
  }
`;

export const Title = styled.h1`
  margin: 40px 0 0;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(22px, 3vw, 28px);
  font-weight: 300;
  line-height: 1.25;
  letter-spacing: -0.01em;
  text-transform: uppercase;
  text-align: center;
  white-space: pre-line;
`;

export const Description = styled.p`
  margin: 12px 0 0;
  font-size: 13px;
  line-height: 1.65;
  color: ${({ theme }) => theme.colors.textMuted};
  text-align: center;
`;

export const Field = styled.div`
  margin-top: 28px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const CodeInput = styled(TextField)`
  letter-spacing: 0.5em;
  text-align: center;
  font-size: 18px;
`;

export const SubmitButton = styled.button`
  margin-top: 12px;
  height: 50px;
  background: ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.white};
  border: 0;
  cursor: pointer;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  transition:
    background 0.3s ease,
    color 0.3s ease,
    opacity 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.black};
    box-shadow: inset 0 0 0 1px ${({ theme }) => theme.colors.black};
  }

  &:disabled {
    opacity: 0.5;
    cursor: default;
  }
`;

export const Hint = styled.span<{ $error?: boolean }>`
  margin-top: 10px;
  font-size: 11px;
  text-align: center;
  color: ${({ theme, $error }) => ($error ? theme.colors.danger : theme.colors.textMuted)};
`;

export const ChangeEmailLink = styled.button`
  align-self: center;
  margin-top: 16px;
  background: none;
  border: 0;
  padding: 0;
  cursor: pointer;
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
  text-decoration: underline;
  text-underline-offset: 3px;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const Terms = styled.p`
  margin-top: 28px;
  font-size: 11px;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.textMuted};
  text-align: center;
`;

export const TermLink = styled.a`
  position: relative;
  color: ${({ theme }) => theme.colors.text};

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -2px;
    height: 1px;
    width: 0;
    background: currentColor;
    transition: width 0.45s cubic-bezier(0.2, 0.7, 0.2, 1);
  }

  &:hover::after {
    width: 100%;
  }
`;
