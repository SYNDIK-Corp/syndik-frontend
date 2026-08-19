import styled, { keyframes, css } from 'styled-components';
import logoMask from '@/assets/logo/logo-mask.png';

const revealAndBreathe = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.92);
  }
  18% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.55;
    transform: scale(1.03);
  }
  82% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

export const Container = styled.div<{ $exiting: boolean }>`
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #000;
  opacity: ${({ $exiting }) => ($exiting ? 0 : 1)};
  transition: opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: ${({ $exiting }) => ($exiting ? 'none' : 'auto')};
`;

export const Mark = styled.div<{ $exiting: boolean }>`
  width: clamp(140px, 22vw, 220px);
  aspect-ratio: 2.15 / 1;
  background-color: #fff;
  -webkit-mask: url(${logoMask}) center / contain no-repeat;
  mask: url(${logoMask}) center / contain no-repeat;
  animation: ${revealAndBreathe} 2.6s ease-in-out infinite;

  ${({ $exiting }) =>
    $exiting &&
    css`
      animation: none;
      opacity: 0;
      transform: scale(1.08);
      transition:
        opacity 0.6s ease,
        transform 0.6s ease;
    `}

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 1;
    transform: scale(1);
  }
`;
