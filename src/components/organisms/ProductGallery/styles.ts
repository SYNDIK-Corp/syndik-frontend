import styled, { css, keyframes } from 'styled-components';

const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(6px); }
`;

/* a galeria vaza até a borda esquerda real da viewport — a conta desfaz, só
 * pra este componente, o centering (max-width 1700px + margin auto) e o
 * padding esquerdo do <Section> em pages/ProductDetail/styles.ts; mudou um
 * dos dois valores lá, muda aqui também. */
const bleedLeft = css`
  margin-left: calc(-1 * (max(0px, (100vw - 1700px) / 2) + clamp(16px, 3vw, 40px)));
  width: calc(100% + max(0px, (100vw - 1700px) / 2) + clamp(16px, 3vw, 40px));
`;

/* sticky preenchendo a viewport inteira (menos a navbar); o scroll de
 * verdade acontece dentro de Scroll, não aqui — Container só posiciona e
 * corta (overflow: hidden) pra caber o ScrollHint sobreposto. */
export const Container = styled.div`
  position: sticky;
  top: ${({ theme }) => theme.sizes.navbarHeight};
  height: calc(100vh - ${({ theme }) => theme.sizes.navbarHeight});
  overflow: hidden;

  ${bleedLeft}

  @media (max-width: 900px) {
    position: static;
    height: auto;
    overflow: visible;
    margin-left: 0;
    width: 100%;
  }
`;

/* scroll próprio: o usuário rola as imagens primeiro; só quando chega ao
 * fim desse scroll interno o encadeamento nativo do navegador passa a
 * rolar a página (comportamento padrão do browser, nenhum JS precisa
 * simular isso). */
export const Scroll = styled.div`
  height: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 900px) {
    height: auto;
    overflow: visible;
  }
`;

export const Plate = styled.div`
  flex: none;
`;

/* sem crop — altura natural, imagem inteira sempre visível */
export const Image = styled.img`
  display: block;
  width: 100%;
  height: auto;
`;

export const ScrollHint = styled.button`
  position: absolute;
  left: 50%;
  bottom: 16px;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: ${({ theme }) => theme.radii.full};
  background: rgba(17, 17, 17, 0.72);
  color: ${({ theme }) => theme.colors.white};
  cursor: pointer;

  svg {
    animation: ${bounce} 1.4s ease-in-out infinite;
  }

  @media (prefers-reduced-motion: reduce) {
    svg {
      animation: none;
    }
  }

  @media (max-width: 900px) {
    display: none;
  }
`;
