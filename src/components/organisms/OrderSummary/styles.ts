import styled from 'styled-components';
import { TextField } from '@/components/atoms/TextField';

export const Container = styled.aside`
  background: ${({ theme }) => theme.colors.surface};
  border-left: 1px solid ${({ theme }) => theme.colors.border};
  align-self: stretch;
  padding: 56px 64px 80px;

  @media (max-width: 760px) {
    padding: 20px 20px 24px;
    border-left: none;
    /* empilhado, o resumo vem primeiro (reorder no Checkout/styles.ts) —
       a borda que separava as duas colunas vira borda embaixo, não em
       cima, senão fica sem separação nenhuma das duas seções */
    border-top: none;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }
`;

export const Pane = styled.div`
  width: min(520px, 100%);
  display: flex;
  flex-direction: column;
`;

export const EmptyMessage = styled.p`
  margin: 0 0 8px;
  font-size: 13px;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const CodeBox = styled.div`
  margin-top: 8px;
  display: flex;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.white};
`;

export const CodeInput = styled(TextField)`
  border: 0;
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

export const ApplyButton = styled.button`
  flex: 0 0 92px;
  height: 50px;
  background: ${({ theme }) => theme.colors.surface};
  border: 0;
  border-left: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  transition:
    background 0.3s ease,
    color 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.black};
    color: ${({ theme }) => theme.colors.white};
  }
`;

export const CodeNote = styled.span`
  margin-top: 8px;
  font-size: 11px;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const Totals = styled.div`
  margin-top: 26px;
  display: flex;
  flex-direction: column;
  gap: 11px;

  @media (max-width: 760px) {
    margin-top: 16px;
  }
`;

export const TotalRow = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  font-size: 13px;
`;

export const TotalRowLabel = styled.span`
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const GrandTotal = styled.div`
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px solid ${({ theme }) => theme.colors.black};
  display: flex;
  align-items: baseline;
  justify-content: space-between;

  @media (max-width: 760px) {
    margin-top: 14px;
    padding-top: 12px;
  }
`;

export const GrandTotalLabel = styled.span`
  font-size: 18px;
  font-weight: 500;
`;

export const GrandTotalValue = styled.span`
  display: flex;
  align-items: baseline;
  gap: 9px;
`;

export const Currency = styled.span`
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const Amount = styled.span`
  font-size: 24px;
  font-weight: 500;
`;

export const AddonsSection = styled.div`
  margin-top: 30px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding-top: 16px;

  @media (max-width: 760px) {
    margin-top: 18px;
    padding-top: 12px;
  }
`;

export const AddonsLabel = styled.span`
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const AddonsList = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
`;

export const BrandsRow = styled.div`
  margin-top: 26px;

  @media (max-width: 760px) {
    margin-top: 16px;
  }
`;
