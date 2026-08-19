import styled from 'styled-components';

export const Title = styled.h1`
  margin: 0;
  font-size: clamp(26px, 3.2vw, 44px);
  font-weight: 300;
  letter-spacing: -0.03em;
  text-transform: uppercase;
`;

export const List = styled.div`
  margin-top: 24px;
  border-top: 1px solid ${({ theme }) => theme.colors.black};

  @media (max-width: 760px) {
    margin-top: 14px;
  }
`;
