import styled from 'styled-components';
import { TextField } from '@/components/atoms/TextField';

export const Container = styled.section`
  max-width: 1500px;
  margin: 0 auto;
  padding: clamp(60px, 14vh, 140px) clamp(20px, 4vw, 40px);
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: clamp(40px, 8vw, 90px);
  align-items: center;
`;

export const Title = styled.h1`
  margin-top: 16px;
  font-size: clamp(32px, 4.4vw, 66px);
  font-weight: 300;
  line-height: 0.94;
  letter-spacing: -0.04em;
  text-transform: uppercase;
  white-space: pre-line;
`;

export const Description = styled.p`
  margin-top: 20px;
  max-width: 38ch;
  font-size: 15px;
  line-height: 1.8;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const FormColumn = styled.div`
  max-width: 380px;
  width: 100%;
`;

export const PinRow = styled.div`
  display: flex;
  gap: 8px;
`;

export const PinInput = styled(TextField)`
  letter-spacing: 0.5em;
  text-align: center;
  font-size: 20px;
`;

export const EnterButton = styled.button`
  flex: 0 0 96px;
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
  display: block;
  margin-top: 10px;
  font-size: 11px;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const LostPinBox = styled.div`
  margin-top: 22px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding-top: 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const LostPinLabel = styled.span`
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const LostPinDescription = styled.span`
  font-size: 12px;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const SendLinkButton = styled.button`
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
