import styled, { keyframes } from 'styled-components';

const pulse = keyframes`
  0%, 100% {
    opacity: 0.4;
    transform: scale(0.94);
  }
  50% {
    opacity: 1;
    transform: scale(1);
  }
`;

const glow = keyframes`
  0%, 100% {
    opacity: 0.5;
  }
  50% {
    opacity: 0.9;
  }
`;

export const Container = styled.div`
  /* fixed (não relative/min-height) — cobre 100% da viewport abaixo do
     navbar, sempre, não importa a posição de scroll herdada da página
     anterior ou a altura real do documento (que fica curta com só o
     loader). É o que garante que o footer nunca apareça atrás do logo
     enquanto carrega. */
  position: fixed;
  top: ${({ theme }) => theme.sizes.navbarHeight};
  left: 0;
  right: 0;
  bottom: 0;
  background: ${({ theme }) => theme.colors.background};
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

export const Glow = styled.div`
  position: absolute;
  width: 420px;
  height: 420px;
  border-radius: 50%;
  background: radial-gradient(circle, ${({ theme }) => theme.colors.surface} 0%, transparent 70%);
  filter: blur(64px);
  animation: ${glow} 2.4s ease-in-out infinite;
`;

export const LogoWrap = styled.div`
  position: relative;
  color: ${({ theme }) => theme.colors.text};
  animation: ${pulse} 1.6s cubic-bezier(0.4, 0, 0.6, 1) infinite;
`;
