import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Grid = styled.div`
  margin-top: 32px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: clamp(24px, 4vw, 48px);
  align-items: start;
`;

export const ColumnLabel = styled.span`
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const List = styled.div`
  margin-top: 12px;
  border-top: 1px solid ${({ theme }) => theme.colors.black};
`;

export const TermRow = styled(Link)`
  padding: 9px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  transition:
    padding-left 0.4s cubic-bezier(0.2, 0.7, 0.2, 1),
    color 0.3s cubic-bezier(0.2, 0.7, 0.2, 1);

  &:hover {
    padding-left: 8px;
    color: ${({ theme }) => theme.colors.black};
  }
`;

export const TermLabel = styled.span`
  font-size: 14px;
`;

export const TermHits = styled.span`
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const LastDropCard = styled.div`
  margin-top: 14px;
`;
