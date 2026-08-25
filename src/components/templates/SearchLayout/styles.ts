import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Bordered = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.black};
`;

export const HeaderTop = styled.div`
  max-width: 1700px;
  margin: 0 auto;
  padding: 14px clamp(20px, 4vw, 40px) 0;
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
  transition: color 0.3s cubic-bezier(0.2, 0.7, 0.2, 1);

  svg {
    transition: transform 0.3s cubic-bezier(0.2, 0.7, 0.2, 1);
  }

  &:hover {
    color: ${({ theme }) => theme.colors.black};

    svg {
      transform: rotate(90deg);
    }
  }
`;

export const SearchBarWrapper = styled.div`
  max-width: 1700px;
  margin: 0 auto;
  padding: clamp(20px, 3.5vh, 32px) clamp(20px, 4vw, 40px) clamp(14px, 2vh, 20px);
`;
