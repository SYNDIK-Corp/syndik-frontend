import styled from 'styled-components';

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
