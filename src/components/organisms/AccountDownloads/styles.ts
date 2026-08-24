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

  @media (max-width: 760px) {
    margin-top: 14px;
  }
`;

export const Footer = styled.div`
  margin-top: 22px;
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;

  @media (max-width: 760px) {
    margin-top: 16px;
  }
`;


export const ZipInfo = styled.span`
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
`;
