import styled from 'styled-components';

export const Container = styled.div`
  max-width: 620px;
  margin: 0 auto;
  padding: clamp(48px, 8vh, 96px) ${({ theme }) => theme.spacing.xl};
`;

export const Title = styled.h1`
  font-size: clamp(28px, 3.4vw, 46px);
  font-weight: 300;
  letter-spacing: -0.03em;
  text-transform: uppercase;
`;

export const Description = styled.p`
  margin-top: 14px;
  max-width: 48ch;
  font-size: 14px;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const Form = styled.form`
  margin-top: 36px;
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

export const SocialRow = styled.div`
  display: grid;
  grid-template-columns: 140px 1fr;
  gap: 10px;

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 9px;
`;

export const FieldLabel = styled.label`
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const SubmitButton = styled.button`
  margin-top: 8px;
  align-self: flex-start;
  height: 50px;
  padding: 0 30px;
  background: ${({ theme }) => theme.colors.black};
  border: 1px solid ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  transition:
    background 0.3s ease,
    color 0.3s ease,
    opacity 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.black};
  }

  &:disabled {
    opacity: 0.5;
    cursor: default;
  }
`;

export const StatusMessage = styled.p<{ $error?: boolean }>`
  margin-top: 4px;
  font-size: 13px;
  color: ${({ theme, $error }) => ($error ? theme.colors.danger : theme.colors.success)};
`;
