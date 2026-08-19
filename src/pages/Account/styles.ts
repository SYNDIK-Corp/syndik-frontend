import styled from 'styled-components';

export const Dashboard = styled.section`
  max-width: 1500px;
  margin: 0 auto;
  padding: 56px clamp(20px, 4vw, 40px) 96px;
  display: grid;
  grid-template-columns: minmax(200px, 0.28fr) minmax(0, 1fr);
  gap: clamp(32px, 6vw, 64px);
  align-items: start;

  /* MVP 1.4: compacta pra reduzir o scroll no mobile */
  @media (max-width: 760px) {
    grid-template-columns: 1fr;
    padding: 28px clamp(16px, 4vw, 24px) 56px;
    gap: 28px;
  }
`;
