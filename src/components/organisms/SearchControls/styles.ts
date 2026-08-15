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
  padding: 10px 18px;
  background: ${({ theme, $active }) => ($active ? theme.colors.black : theme.colors.white)};
  color: ${({ theme, $active }) => ($active ? theme.colors.white : theme.colors.text)};
  font-family: inherit;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  transition:
    border-color 0.3s ease,
    background 0.3s ease,
    color 0.3s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.black};
  }
`;

export const Count = styled.span`
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
`;
