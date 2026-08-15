import styled from 'styled-components';

export const Header = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
  flex-wrap: wrap;
`;

export const Title = styled.h1`
  margin: 0;
  font-size: clamp(26px, 3.2vw, 44px);
  font-weight: 300;
  letter-spacing: -0.03em;
  text-transform: uppercase;
`;

export const NeverExpire = styled.span`
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const List = styled.div`
  margin-top: 24px;
  border-top: 1px solid ${({ theme }) => theme.colors.black};
`;

export const Footer = styled.div`
  margin-top: 22px;
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
`;

export const DownloadAllButton = styled.button`
  height: 52px;
  padding: 0 26px;
  background: ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.white};
  border: 0;
  cursor: pointer;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
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

export const ZipInfo = styled.span`
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
`;
