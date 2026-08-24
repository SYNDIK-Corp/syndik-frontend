import styled, { keyframes } from 'styled-components';

const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(4px); }
`;

/* só anima opacidade/Y — a centralização horizontal (translateX(-50%))
 * fica fixa no elemento, fora do keyframe. Antes dependia só da animação
 * pra centralizar (translate(-50%, ...) só existia dentro do @keyframes);
 * se a animação não disparasse do jeito esperado no aparelho real, o
 * elemento ficava sem esse transform, saindo do lugar (metade fora da
 * tela) — bem provável causa real de "não apareceu" no celular. */
const fadeInUp = keyframes`
  from { opacity: 0; transform: translate(-50%, 8px); }
  to { opacity: 1; transform: translate(-50%, 0); }
`;

const fadeOut = keyframes`
  from { opacity: 1; transform: translate(-50%, 0); }
  to { opacity: 0; transform: translate(-50%, 0); }
`;

export const Nudge = styled.div<{ $leaving: boolean }>`
  display: none;

  @media (max-width: 900px) {
    display: flex;
    align-items: center;
    gap: 8px;
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    /* env(safe-area-inset-bottom) — Safari mobile tem sua própria barra
       embaixo, sem isso o selo pode ficar escondido atrás dela em vez de
       visível acima */
    bottom: calc(20px + env(safe-area-inset-bottom, 0px));
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
      animation: none;
      opacity: ${({ $leaving }) => ($leaving ? 0 : 1)};
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
