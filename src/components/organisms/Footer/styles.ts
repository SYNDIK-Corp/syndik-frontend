import styled from 'styled-components';

export const Container = styled.footer`
  padding: clamp(28px, 4vh, 44px) clamp(20px, 4vw, 56px) 22px;
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.text};
`;

export const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const Divider = styled.hr`
  margin: clamp(20px, 3vh, 32px) 0 0;
  border: none;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

export const Bottom = styled.div`
  margin-top: 16px;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 16px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    justify-items: center;
    gap: 8px;
    text-align: center;
  }
`;

export const Rights = styled.span`
  font-size: 11px;
  letter-spacing: 0.04em;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const Terms = styled.span`
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
`;
