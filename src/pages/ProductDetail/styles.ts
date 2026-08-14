import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Breadcrumb = styled.div`
  max-width: 1700px;
  margin: 0 auto;
  padding: 18px clamp(16px, 3vw, 40px) 0;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const BreadcrumbLink = styled(Link)`
  position: relative;
  color: inherit;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -4px;
    height: 1px;
    width: 0;
    background: currentColor;
    transition: width 0.45s cubic-bezier(0.2, 0.7, 0.2, 1);
  }

  &:hover::after {
    width: 100%;
  }
`;

export const BreadcrumbCurrent = styled.span`
  color: ${({ theme }) => theme.colors.text};
`;

export const Section = styled.section`
  max-width: 1700px;
  margin: 0 auto;
  padding: clamp(18px, 3vh, 32px) clamp(16px, 3vw, 40px) 0;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(320px, 0.85fr);
  gap: clamp(28px, 4vw, 72px);
  align-items: start;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;
