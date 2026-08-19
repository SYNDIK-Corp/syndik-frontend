import styled from 'styled-components';

export const Container = styled.div`
  padding-bottom: 20px;
  display: grid;
  grid-template-columns: 116px 1fr;
  gap: 16px;
`;

export const Thumb = styled.div`
  position: relative;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 8px;
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.14em;
`;

export const ThumbImage = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Top = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 14px;
`;

export const Meta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
`;

export const Sku = styled.span`
  font-size: 9px;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const Name = styled.span`
  font-size: 14px;
  font-weight: 500;
  line-height: 1.35;
`;

export const Description = styled.span`
  font-size: 11px;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const Prices = styled.div`
  text-align: right;
  display: flex;
  flex-direction: column;
  gap: 5px;
  white-space: nowrap;
`;

export const ComparePrice = styled.span`
  font-size: 11px;
  color: ${({ theme }) => theme.colors.textMuted};
  text-decoration: line-through;
`;

export const Price = styled.span`
  font-size: 15px;
  font-weight: 500;
`;

export const Bottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

/* MVP 2.2.3: tratamento de cor dedicado pra economia/desconto — antes era
   preto/branco igual a qualquer outro elemento da UI, sem se destacar como
   "isso é vantagem financeira" à primeira vista */
export const SaveTag = styled.span`
  background: ${({ theme }) => theme.colors.success};
  color: ${({ theme }) => theme.colors.white};
  padding: 5px 9px;
  font-size: 9px;
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
`;

export const RemoveButton = styled.button`
  background: none;
  border: 0;
  padding: 4px;
  cursor: pointer;
  display: flex;
  color: ${({ theme }) => theme.colors.textMuted};
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;
