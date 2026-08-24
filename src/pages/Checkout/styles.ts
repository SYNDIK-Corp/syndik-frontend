import styled from 'styled-components';

export const Grid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  align-items: start;
  min-height: calc(100vh - 65px);

  @media (max-width: 900px) {
    grid-template-columns: 1fr;

    /* empilhado, mostra primeiro o que a pessoa está levando (itens,
       desconto, valores) e só depois contato/pagamento — troca só a ordem
       visual (CSS), a ordem no DOM continua a mesma. */
    & > *:first-child {
      order: 2;
    }
    & > *:last-child {
      order: 1;
    }
  }
`;
