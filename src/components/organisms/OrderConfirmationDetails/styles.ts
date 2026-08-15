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
  margin-top: 16px;
  font-size: clamp(32px, 4.6vw, 72px);
  font-weight: 300;
  line-height: 0.94;
  letter-spacing: -0.04em;
  text-transform: uppercase;
  white-space: pre-line;
`;

export const Description = styled.p`
  margin-top: 20px;
  max-width: 44ch;
  font-size: 15px;
  line-height: 1.8;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const EmailHighlight = styled.span`
  color: ${({ theme }) => theme.colors.text};
`;

export const DownloadActions = styled.div`
  margin-top: 30px;
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
`;

export const DownloadAllButton = styled.button`
  height: 56px;
  padding: 0 28px;
  background: ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.white};
  border: 0;
  cursor: pointer;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  display: flex;
  align-items: center;
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

export const ZipNote = styled.span`
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const FilesSection = styled.div`
  margin-top: 40px;
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
  margin-top: 34px;
  background: ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.white};
  padding: 20px 22px;
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
`;

export const InstallSection = styled.div`
  margin-top: 28px;
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
