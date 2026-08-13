import styled from 'styled-components';

export const Container = styled.section`
  position: relative;
  /* 100svh: altura exata da viewport em qualquer dispositivo, estável no mobile */
  height: 100vh;
  height: 100svh;
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

export const Pane = styled.div`
  position: relative;
  overflow: hidden;
  background: linear-gradient(160deg, #334155 0%, #0f172a 100%);

  &:last-of-type {
    background: linear-gradient(200deg, #1e293b 0%, #0f172a 100%);
  }
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

export const Content = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  text-align: center;
  color: ${({ theme }) => theme.colors.white};
  pointer-events: none;
`;

export const Title = styled.h1`
  font-size: clamp(30px, 4.4vw, 68px);
  font-weight: 300;
  line-height: 0.98;
  letter-spacing: -0.035em;
  text-transform: uppercase;
  white-space: pre-line;
  max-width: 40rem;
  text-shadow: 0 2px 12px rgba(15, 23, 42, 0.35);
`;

export const CtaWrapper = styled.div`
  pointer-events: auto;
`;
