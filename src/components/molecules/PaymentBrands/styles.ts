import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  flex-wrap: wrap;
`;

export const Badge = styled.span`
  height: 24px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 0 8px;
  display: flex;
  align-items: center;
  font-size: 8px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
`;
