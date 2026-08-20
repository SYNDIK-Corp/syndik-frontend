import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { Frame as ProductCardFrame } from '@/components/molecules/ProductCard/styles';

export const Container = styled.div`
  padding-bottom: 64px;
`;

export const Header = styled.header`
  max-width: 1700px;
  margin: 0 auto;
  padding: clamp(32px, 6vh, 68px) clamp(16px, 3vw, 40px) 0;
`;

export const HeaderTop = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 28px;
  flex-wrap: wrap;
`;

export const Title = styled.h1`
  margin-top: 14px;
  font-size: clamp(30px, 4vw, 62px);
  font-weight: 300;
  line-height: 0.95;
  letter-spacing: -0.04em;
  text-transform: uppercase;
`;

export const Toggle = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.colors.black};
`;

const toggleItem = css`
  padding: 12px 18px;
  white-space: nowrap;
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
`;

export const ToggleActive = styled.span`
  ${toggleItem}
  background: ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.white};
`;

export const ToggleLink = styled(Link)`
  ${toggleItem}
  color: ${({ theme }) => theme.colors.textMuted};
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;


export const GridSection = styled.section`
  max-width: 1700px;
  margin: 0 auto;
  padding: clamp(22px, 4vh, 40px) clamp(16px, 3vw, 40px) 0;

  @media (max-width: 720px) {
    padding-left: 12px;
    padding-right: 12px;
  }
`;

export const Grid = styled.div`
  display: grid;
  /* máximo 5 colunas na largura do container (1700px) — abaixo disso reduz
     naturalmente conforme a tela encolhe, nunca passa de 5 */
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px 18px;

  /* MVP 1.3: grid deliberado de 2 colunas no mobile (em vez do auto-fill
     genérico) + cards bem mais altos pra visualização melhor */
  @media (max-width: 720px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px 8px;

    ${ProductCardFrame} {
      aspect-ratio: 2 / 3;
    }
  }
`;

export const BottomBar = styled.div`
  max-width: 1700px;
  margin: clamp(40px, 7vh, 80px) auto 0;
  padding: 0 clamp(16px, 3vw, 40px);
`;

export const BottomBarInner = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.black};
  padding-top: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
`;
