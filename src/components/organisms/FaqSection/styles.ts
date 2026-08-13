import styled from 'styled-components';

export const Container = styled.section`
  padding: clamp(44px, 7vh, 84px) clamp(20px, 4vw, 56px);
`;

export const Grid = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: clamp(28px, 5vw, 80px);
  align-items: start;
`;

export const Title = styled.h2`
  margin-top: 14px;
  font-weight: 300;
  font-size: clamp(28px, 3.2vw, 44px);
  letter-spacing: -0.03em;
`;

export const Description = styled.p`
  margin-top: 16px;
  font-size: 16px;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.textMuted};
  max-width: 34ch;
`;

export const Note = styled.p`
  margin-top: 20px;
  font-size: 14px;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.textMuted};
  max-width: 34ch;
`;

export const CtaWrapper = styled.div`
  margin-top: 18px;
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
`;
