import styled, { keyframes } from 'styled-components';

const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(4px); }
`;

const fadeInUp = keyframes`
  from { opacity: 0; transform: translate(-50%, 8px); }
  to { opacity: 1; transform: translate(-50%, 0); }
`;

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

export const Nudge = styled.div<{ $leaving: boolean }>`
  display: none;

  @media (max-width: 900px) {
    display: flex;
    align-items: center;
    gap: 8px;
    position: fixed;
    left: 50%;
    bottom: 20px;
    z-index: ${({ theme }) => theme.zIndices.navbar - 1};
    padding: 10px 16px;
    background: ${({ theme }) => theme.colors.black};
    color: ${({ theme }) => theme.colors.white};
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    white-space: nowrap;
    box-shadow: 0 8px 24px rgba(10, 10, 10, 0.25);
    animation: ${({ $leaving }) => ($leaving ? fadeOut : fadeInUp)} 0.35s ease forwards;
    pointer-events: none;

    @media (prefers-reduced-motion: reduce) {
      animation: ${fadeInUp} 0.01s linear forwards;
    }
  }
`;

export const Chevron = styled.span`
  display: inline-flex;
  animation: ${bounce} 1.4s ease-in-out infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;
