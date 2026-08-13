import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.section`
  background: ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.white};
  min-height: 100vh;
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: clamp(52px, 8vh, 88px) 0 0;
`;

export const Grid = styled.div`
  width: 100%;
  padding: 0 clamp(20px, 4vw, 56px);
  max-width: 1600px;
  /* auto vertical: centraliza o conteúdo entre o topo e o letreiro */
  margin: auto;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: clamp(24px, 3vw, 52px);
  align-items: start;
`;

export const TextColumn = styled.div`
  grid-column: span 5;
  display: flex;
  flex-direction: column;
  --eyebrow-color: rgba(255, 255, 255, 0.55);
  --eyebrow-dot-color: ${({ theme }) => theme.colors.white};

  @media (max-width: 900px) {
    grid-column: 1 / -1;
  }
`;

export const Title = styled.h2`
  margin-top: 20px;
  font-size: clamp(32px, 4.6vw, 70px);
  font-weight: 300;
  line-height: 0.9;
  letter-spacing: -0.04em;
  text-transform: uppercase;
  white-space: pre-line;
`;

export const Description = styled.p`
  margin-top: 22px;
  max-width: 34ch;
  font-size: 14px;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.62);
`;

export const Actions = styled.div`
  margin-top: 28px;
  display: flex;
  align-items: center;
  gap: 22px;
  flex-wrap: wrap;
`;

export const PrimaryCta = styled(Link)`
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.black};
  padding: 15px 24px;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  transition:
    background 0.3s ease,
    color 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.black};
    color: ${({ theme }) => theme.colors.white};
    box-shadow: inset 0 0 0 1px ${({ theme }) => theme.colors.white};
  }
`;

export const Perks = styled.div`
  margin-top: 26px;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.68);
  line-height: 2;
`;

export const CardSlot = styled.div<{ $span: number }>`
  grid-column: span ${({ $span }) => $span};

  @media (max-width: 900px) {
    grid-column: span 6;
  }

  @media (max-width: 560px) {
    grid-column: 1 / -1;
  }
`;

export const Ticker = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.16);
  padding: 14px 0;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.7);
`;
