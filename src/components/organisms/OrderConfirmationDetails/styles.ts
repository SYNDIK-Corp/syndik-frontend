import styled, { keyframes } from 'styled-components';

const stampIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const Container = styled.div`
  animation: ${stampIn} 0.7s cubic-bezier(0.2, 0.7, 0.2, 1);

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const Title = styled.h1`
  margin-top: 8px;
  font-size: clamp(22px, 2.8vw, 36px);
  font-weight: 300;
  line-height: 0.96;
  letter-spacing: -0.03em;
  text-transform: uppercase;
  white-space: pre-line;
`;

export const Description = styled.p`
  margin-top: 10px;
  max-width: 44ch;
  font-size: 13px;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const EmailHighlight = styled.span`
  color: ${({ theme }) => theme.colors.text};
`;

export const DownloadActions = styled.div`
  margin-top: 16px;
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
`;

export const ZipNote = styled.span`
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const FilesSection = styled.div`
  margin-top: 20px;
`;

export const FilesHeader = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.black};
  padding-top: 14px;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 20px;
`;

export const FilesTitle = styled.span`
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
`;

export const FilesNeverExpire = styled.span`
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const PinBox = styled.div`
  margin-top: 18px;
  background: ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.white};
  padding: 14px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
`;

export const PinText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
`;

export const PinLabel = styled.span`
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.6);
`;

export const PinBody = styled.span`
  font-size: 14px;
  line-height: 1.55;
  max-width: 46ch;
`;

export const PinFeedback = styled.span<{ $tone: 'success' | 'error' }>`
  font-size: 12px;
  line-height: 1.5;
  max-width: 46ch;
  color: ${({ theme, $tone }) => ($tone === 'success' ? theme.colors.success : '#FF8A80')};
`;

export const PinLoginLink = styled.a`
  color: inherit;
  text-decoration: underline;
  text-underline-offset: 2px;
`;

export const PinRow = styled.div`
  display: flex;
  gap: 8px;
`;

export const PinInput = styled.input`
  width: 116px;
  height: 46px;
  padding: 0 12px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  background: transparent;
  color: ${({ theme }) => theme.colors.white};
  outline: 0;
  text-align: center;
  letter-spacing: 0.5em;
  font-size: 17px;
  font-family: inherit;

  &::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }

  &:disabled {
    opacity: 0.5;
    cursor: default;
  }
`;

export const PinSaveButton = styled.button`
  height: 46px;
  padding: 0 20px;
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.black};
  border: 0;
  cursor: pointer;
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;

  &:disabled {
    opacity: 0.6;
    cursor: default;
  }
`;

export const InstallSection = styled.div`
  margin-top: 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const InstallLabel = styled.span`
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
`;
