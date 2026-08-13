import styled from 'styled-components';

export const Container = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: var(--eyebrow-color, ${({ theme }) => theme.colors.textMuted});
`;

export const Dot = styled.span`
  width: 6px;
  height: 6px;
  background: var(--eyebrow-dot-color, ${({ theme }) => theme.colors.text});
  display: block;
  flex: 0 0 auto;
`;
