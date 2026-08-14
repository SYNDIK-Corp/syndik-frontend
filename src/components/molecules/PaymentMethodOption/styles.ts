import styled from 'styled-components';

export const Header = styled.button<{ $active: boolean }>`
  width: 100%;
  cursor: pointer;
  padding: 15px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  background: ${({ theme, $active }) => ($active ? theme.colors.surface : theme.colors.white)};
  border: none;
  font-family: inherit;
  color: inherit;
  transition: background 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.surface};
  }
`;

export const Left = styled.span`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const Dot = styled.span<{ $active: boolean }>`
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background: ${({ theme, $active }) => ($active ? theme.colors.black : 'transparent')};
  box-shadow: inset 0 0 0 1px ${({ theme }) => theme.colors.black};
`;

export const Label = styled.span`
  font-size: 14px;
  font-weight: 500;
`;

export const Trailing = styled.span`
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const Panel = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding: 16px;
`;
