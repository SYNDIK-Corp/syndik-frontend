import styled from 'styled-components';

export const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
`;

export const Chips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const Chip = styled.button<{ $active: boolean }>`
  cursor: pointer;
  white-space: nowrap;
  border: 1px solid ${({ theme, $active }) => ($active ? theme.colors.black : theme.colors.border)};
  padding: 9px 16px;
  background: ${({ theme, $active }) => ($active ? theme.colors.black : theme.colors.white)};
  color: ${({ theme, $active }) => ($active ? theme.colors.white : theme.colors.text)};
  font-family: inherit;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  transition:
    border-color 0.3s cubic-bezier(0.2, 0.7, 0.2, 1),
    background 0.3s cubic-bezier(0.2, 0.7, 0.2, 1),
    color 0.3s cubic-bezier(0.2, 0.7, 0.2, 1),
    transform 0.2s cubic-bezier(0.2, 0.7, 0.2, 1);

  &:hover {
    border-color: ${({ theme }) => theme.colors.black};
    background: ${({ theme, $active }) => ($active ? theme.colors.black : theme.colors.surface)};
  }

  &:active {
    transform: scale(0.96);
  }
`;

export const Count = styled.span`
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
`;
