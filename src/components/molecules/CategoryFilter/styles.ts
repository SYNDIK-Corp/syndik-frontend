import styled, { keyframes } from 'styled-components';

export const Wrap = styled.div`
  position: relative;
`;

/* rola horizontalmente no mobile (não quebra linha) — mesma convenção de
   rail usada no carrossel de miniaturas do ProductGallery e no rail do
   BestSellers, sem barra de rolagem visível. Padding vertical evita a
   borda dos pills ficar cortada pelo próprio scroll container. */
export const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 2px 6px;
  overflow-x: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Pill = styled.button<{ $active: boolean }>`
  flex: 0 0 auto;
  cursor: pointer;
  height: 36px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  border: 1px solid ${({ theme, $active }) => ($active ? theme.colors.black : theme.colors.border)};
  border-radius: 100px;
  background: ${({ theme, $active }) => ($active ? theme.colors.black : 'transparent')};
  box-shadow: ${({ $active }) => ($active ? '0 6px 16px rgba(17, 17, 17, 0.16)' : 'none')};
  font-family: inherit;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  white-space: nowrap;
  color: ${({ theme, $active }) => ($active ? theme.colors.white : theme.colors.text)};
  transition:
    background 0.25s ease,
    border-color 0.25s ease,
    color 0.25s ease,
    box-shadow 0.25s ease,
    transform 0.15s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.black};
    transform: translateY(-1px);
  }

  &:active {
    transform: scale(0.95);
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
    &:hover,
    &:active {
      transform: none;
    }
  }
`;

const bounceX = keyframes`
  0%, 100% { transform: translateX(0); opacity: 0.45; }
  50% { transform: translateX(4px); opacity: 1; }
`;

/* setinha só no mobile, só quando sobra categoria fora da tela — some
   sozinha assim que o usuário rola até o fim (checado via scroll no Row). */
export const ScrollHint = styled.div`
  position: absolute;
  right: -2px;
  top: 0;
  bottom: 6px;
  display: flex;
  align-items: center;
  padding-left: 28px;
  pointer-events: none;
  background: linear-gradient(to right, transparent, ${({ theme }) => theme.colors.background} 65%);
  color: ${({ theme }) => theme.colors.textMuted};

  svg {
    animation: ${bounceX} 1.3s ease-in-out infinite;
  }

  @media (min-width: 721px) {
    display: none;
  }

  @media (prefers-reduced-motion: reduce) {
    svg {
      animation: none;
    }
  }
`;
