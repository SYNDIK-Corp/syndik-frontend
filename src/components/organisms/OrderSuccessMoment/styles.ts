import styled, { keyframes, css } from 'styled-components';

const CIRCLE_LENGTH = 340;
const CHECK_LENGTH = 80;

const drawCircle = keyframes`
  from { stroke-dashoffset: ${CIRCLE_LENGTH}; }
  to { stroke-dashoffset: 0; }
`;

const drawCheck = keyframes`
  from { stroke-dashoffset: ${CHECK_LENGTH}; }
  to { stroke-dashoffset: 0; }
`;

const popIn = keyframes`
  0% { opacity: 0; transform: scale(0.6); }
  65% { opacity: 1; transform: scale(1.07); }
  100% { opacity: 1; transform: scale(1); }
`;

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const Container = styled.div<{ $exiting: boolean }>`
  min-height: 56vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 40px 24px;
  opacity: ${({ $exiting }) => ($exiting ? 0 : 1)};
  transform: ${({ $exiting }) => ($exiting ? 'scale(0.98)' : 'scale(1)')};
  transition:
    opacity 0.35s ease,
    transform 0.35s ease;
`;

export const Seal = styled.div`
  width: 84px;
  height: 84px;
  animation: ${popIn} 0.6s cubic-bezier(0.2, 0.7, 0.2, 1) both;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const SealSvg = styled.svg`
  width: 100%;
  height: 100%;

  circle {
    stroke: ${({ theme }) => theme.colors.black};
    stroke-width: 2.5;
    stroke-dasharray: ${CIRCLE_LENGTH};
    animation: ${drawCircle} 0.7s cubic-bezier(0.2, 0.7, 0.2, 1) both;
  }

  path {
    stroke: ${({ theme }) => theme.colors.success};
    stroke-width: 6;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-dasharray: ${CHECK_LENGTH};
    animation: ${drawCheck} 0.45s cubic-bezier(0.2, 0.7, 0.2, 1) 0.5s both;
  }

  @media (prefers-reduced-motion: reduce) {
    circle,
    path {
      animation: none;
      stroke-dashoffset: 0;
    }
  }
`;

const staggered = css`
  opacity: 0;
  animation: ${fadeUp} 0.6s cubic-bezier(0.2, 0.7, 0.2, 1) both;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 1;
  }
`;

export const Eyebrow = styled.span`
  margin-top: 26px;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.success};
  ${staggered}
  animation-delay: 0.75s;
`;

export const Headline = styled.h1`
  margin-top: 10px;
  font-size: clamp(30px, 4vw, 52px);
  font-weight: 300;
  line-height: 0.98;
  letter-spacing: -0.03em;
  text-transform: uppercase;
  ${staggered}
  animation-delay: 0.85s;
`;

export const OrderNumber = styled.span`
  margin-top: 14px;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
  ${staggered}
  animation-delay: 0.95s;
`;
