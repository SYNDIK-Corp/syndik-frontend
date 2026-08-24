import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  display: inline-block;
`;

export const Trigger = styled.button<{ $primary?: boolean }>`
  height: ${({ $primary }) => ($primary ? '46px' : '38px')};
  padding: 0 16px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: ${({ theme, $primary }) => ($primary ? theme.colors.black : theme.colors.white)};
  color: ${({ theme, $primary }) => ($primary ? theme.colors.white : theme.colors.black)};
  border: 1px solid ${({ theme }) => theme.colors.black};
  cursor: pointer;
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  transition:
    background 0.3s ease,
    color 0.3s ease;

  &:hover {
    background: ${({ theme, $primary }) => ($primary ? theme.colors.white : theme.colors.black)};
    color: ${({ theme, $primary }) => ($primary ? theme.colors.black : theme.colors.white)};
  }

  &:disabled {
    opacity: 0.6;
    cursor: default;
    pointer-events: none;
  }
`;

export const Panel = styled.div`
  position: absolute;
  z-index: ${({ theme }) => theme.zIndices.drawer};
  top: calc(100% + 6px);
  right: 0;
  min-width: 220px;
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.black};
  box-shadow: 0 12px 28px rgba(10, 10, 10, 0.14);
  display: flex;
  flex-direction: column;
  padding: 6px;
`;

export const Option = styled.button<{ $hasHint?: boolean }>`
  min-height: 40px;
  padding: 8px 12px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 2px;
  text-align: left;
  background: none;
  border: 0;
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
  transition: background 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.surface};
  }
`;

/* explica o que vai acontecer antes do clique (ex.: "salva na galeria" vs
   "baixa como .zip") — só faz diferença em celular de verdade, é onde a
   escolha muda o resultado (desktop sempre vira zip de qualquer forma) */
export const OptionHint = styled.span`
  display: none;

  @media (max-width: 860px) {
    display: block;
    font-size: 10px;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const Divider = styled.div`
  margin: 6px 4px;
  height: 1px;
  background: ${({ theme }) => theme.colors.border};
`;
