import styled from 'styled-components';

export const StatusMessage = styled.section`
  max-width: 640px;
  margin: 0 auto;
  padding: clamp(80px, 14vh, 140px) clamp(20px, 4vw, 40px);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;

export const StatusTitle = styled.h1`
  font-size: clamp(24px, 3vw, 32px);
  font-weight: 600;
`;

export const StatusBody = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 15px;
  line-height: 1.5;
`;

export const Grid = styled.section`
  max-width: 1500px;
  margin: 0 auto;
  padding: clamp(40px, 8vh, 64px) clamp(20px, 4vw, 40px) 0;
  display: grid;
  grid-template-columns: minmax(0, 1.25fr) minmax(300px, 0.75fr);
  gap: clamp(32px, 6vw, 72px);
  align-items: start;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;
