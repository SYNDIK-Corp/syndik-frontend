import styled from 'styled-components';

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 0 clamp(18px, 2.4vw, 36px);
`;

export const Item = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding: 13px 0 15px;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const Head = styled.div`
  display: flex;
  align-items: baseline;
  gap: 10px;
`;

export const Number = styled.span`
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.2em;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const Name = styled.span`
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.02em;
  text-transform: uppercase;
`;

export const Description = styled.span`
  font-size: 11px;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.textMuted};
`;
