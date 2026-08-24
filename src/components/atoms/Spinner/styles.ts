import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

export const Spin = styled.span<{ $size: number }>`
  display: inline-block;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  border-radius: 50%;
  border: 2px solid rgba(128, 128, 128, 0.35);
  border-top-color: currentColor;
  animation: ${spin} 0.7s linear infinite;

  @media (prefers-reduced-motion: reduce) {
    animation-duration: 1.4s;
  }
`;
