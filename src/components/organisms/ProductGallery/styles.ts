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

/* wrapper neutro — vira o único item de grid que o <Grid> do ProductDetail
 * enxerga; por dentro, Container (desktop) e o preview+grid mobile
 * coexistem no DOM e se alternam só por CSS, sem remount ao redimensionar. */
export const Root = styled.div``;

/* sticky preenchendo a viewport inteira (menos a navbar); o scroll de
 * verdade acontece dentro de Scroll, não aqui — Container só posiciona e
 * corta (overflow: hidden) pra caber o ScrollHint sobreposto. Só desktop —
 * no mobile o preview+grid abaixo assume. */
export const Container = styled.div`
  position: sticky;
  top: ${({ theme }) => theme.sizes.navbarHeight};
  height: calc(100vh - ${({ theme }) => theme.sizes.navbarHeight});
  overflow: hidden;

  ${bleedLeft}

  @media (max-width: 900px) {
    display: none;
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

/* mobile — volta ao padrão anterior: uma imagem em destaque + grid de
 * miniaturas clicáveis abaixo pra trocar qual imagem aparece em destaque. */
export const MobilePreview = styled.div`
  display: none;

  @media (max-width: 900px) {
    display: block;
  }
`;

export const MobileImage = styled.img`
  display: block;
  width: 100%;
  height: auto;
`;

/* virou carrossel de uma linha só (era grid de 3 colunas, quebrava em
 * várias linhas com 7 imagens) — objetivo é compactar a tela mobile pra
 * caber mais coisa (preço, botão de compra) sem rolar tanto. Mesma
 * convenção de rail horizontal do BestSellers: overflow-x + scroll-snap,
 * sem barra de rolagem visível. */
export const MobileGrid = styled.div`
  display: none;

  @media (max-width: 900px) {
    display: flex;
    justify-content: center;
    gap: 6px;
    margin-top: 8px;
    overflow-x: auto;
    scroll-snap-type: x proximity;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

export const MobileThumb = styled.button<{ $active: boolean }>`
  display: block;
  flex: 0 0 auto;
  padding: 0;
  border: 2px solid ${({ theme, $active }) => ($active ? theme.colors.text : 'transparent')};
  border-radius: ${({ theme }) => theme.radii.sm};
  overflow: hidden;
  background: none;
  cursor: pointer;
  opacity: ${({ $active }) => ($active ? 1 : 0.6)};
  scroll-snap-align: start;
  transition:
    opacity 0.2s ease,
    border-color 0.2s ease;
`;

/* miniatura pequena de propósito (pedido explícito) — quadrada, bem menor
 * que a altura de 96px do grid anterior. */
export const MobileThumbImage = styled.img`
  display: block;
  width: 56px;
  height: 56px;
  object-fit: cover;
`;
