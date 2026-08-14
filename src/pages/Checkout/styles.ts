import styled from 'styled-components';

export const Grid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  align-items: start;
  min-height: calc(100vh - 65px);

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;
