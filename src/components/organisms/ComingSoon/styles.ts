import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: clamp(28px, 5vh, 48px);
  padding: clamp(24px, 4vh, 40px) 0 clamp(40px, 6vh, 64px);
`;

const shimmer = keyframes`
  0% {
    background-position: -150% 0;
  }
  100% {
    background-position: 150% 0;
  }
`;

export const Ghosts = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 220px));
  gap: 18px;
`;

export const Ghost = styled.div`
  aspect-ratio: 1 / 1;
  background: ${({ theme }) =>
    `linear-gradient(110deg, ${theme.colors.surface} 30%, #e6e6e6 45%, ${theme.colors.surface} 60%)`};
  background-size: 250% 100%;
  animation: ${shimmer} 2.6s ease-in-out infinite;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 14px;
  max-width: 560px;
`;

export const Badge = styled.span`
  display: inline-flex;
  background: ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.white};
  padding: 6px 12px;
  font-size: 9px;
  font-weight: 500;
  letter-spacing: 0.24em;
  text-transform: uppercase;
`;

export const Headline = styled.h2`
  font-size: clamp(24px, 3.2vw, 40px);
  font-weight: 300;
  line-height: 1.05;
  letter-spacing: -0.02em;
  text-transform: uppercase;
`;

export const Body = styled.p`
  font-size: 14px;
  line-height: 1.65;
  color: ${({ theme }) => theme.colors.textMuted};
  max-width: 48ch;
`;

export const CtaWrap = styled.div`
  margin-top: 8px;
`;
