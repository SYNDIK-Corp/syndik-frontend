import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Bordered = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.black};
`;

export const HeaderTop = styled.div`
  max-width: 1700px;
  margin: 0 auto;
  padding: 16px clamp(20px, 4vw, 40px) 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
`;

export const CloseLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const SearchBarWrapper = styled.div`
  max-width: 1700px;
  margin: 0 auto;
  padding: clamp(28px, 5vh, 46px) clamp(20px, 4vw, 40px) clamp(20px, 3vh, 30px);
`;
