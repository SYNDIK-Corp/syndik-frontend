import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.aside`
  position: sticky;
  top: calc(${({ theme }) => theme.sizes.navbarHeight} + 24px);
  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.black};
  padding-top: 14px;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
`;

export const Title = styled.span`
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
`;

export const PrintButton = styled.button`
  background: none;
  border: 0;
  padding: 0;
  cursor: pointer;
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
  position: relative;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -3px;
    height: 1px;
    width: 0;
    background: currentColor;
    transition: width 0.45s cubic-bezier(0.2, 0.7, 0.2, 1);
  }

  &:hover::after {
    width: 100%;
  }
`;

export const InfoList = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 11px;
  font-size: 13px;
`;

export const InfoRow = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 14px;
`;

export const InfoLabel = styled.span`
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const InfoValue = styled.span`
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Totals = styled.div`
  margin-top: 22px;
  display: flex;
  flex-direction: column;
  gap: 11px;
  font-size: 13px;
`;

export const TotalRow = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
`;

export const PaidRow = styled.div`
  margin-top: 6px;
  padding-top: 14px;
  border-top: 1px solid ${({ theme }) => theme.colors.black};
  display: flex;
  align-items: baseline;
  justify-content: space-between;
`;

export const PaidLabel = styled.span`
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
`;

export const PaidValue = styled.span`
  font-size: 22px;
  font-weight: 500;
`;

export const Note = styled.div`
  margin-top: 30px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding-top: 14px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const NoteLabel = styled.span`
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const NoteBody = styled.span`
  font-size: 12px;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const noteCtaCss = css`
  position: relative;
  align-self: flex-start;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -3px;
    height: 1px;
    width: 0;
    background: currentColor;
    transition: width 0.45s cubic-bezier(0.2, 0.7, 0.2, 1);
  }

  &:hover::after {
    width: 100%;
  }
`;

export const NoteCtaLink = styled(Link)`
  ${noteCtaCss}
`;

export const NoteCtaAnchor = styled.a`
  ${noteCtaCss}
`;
