import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  flex-wrap: wrap;
`;

export const Badge = styled.span`
  height: 26px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 0 9px;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.text};
`;

export const MastercardMark = styled.span`
  display: flex;
  align-items: center;

  span:first-child {
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background: currentColor;
  }

  span:last-child {
    width: 13px;
    height: 13px;
    border-radius: 50%;
    border: 1.4px solid currentColor;
    margin-left: -5px;
  }
`;

const wordmarkVariant = {
  visa: css`
    font-style: italic;
    font-weight: 800;
    letter-spacing: -0.01em;
  `,
  elo: css`
    text-transform: lowercase;
    font-weight: 700;
  `,
  stripe: css`
    text-transform: lowercase;
    font-weight: 600;
    letter-spacing: -0.02em;
  `,
  paypal: css`
    font-weight: 700;
  `,
};

export const Wordmark = styled.span<{ $style: keyof typeof wordmarkVariant }>`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 12px;
  ${({ $style }) => wordmarkVariant[$style]}
`;

export const BoxMark = styled.span`
  background: ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.white};
  padding: 3px 5px;
  font-size: 8px;
  font-weight: 700;
  letter-spacing: 0.06em;
`;

export const IconWordmark = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 10.5px;
  font-weight: 600;
`;

export const AppleGlyph = styled.svg`
  width: 11px;
  height: 11px;
  fill: currentColor;
`;

export const GCircle = styled.span`
  width: 13px;
  height: 13px;
  border-radius: 50%;
  border: 1.2px solid currentColor;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 8px;
  font-weight: 700;
  line-height: 1;
`;
