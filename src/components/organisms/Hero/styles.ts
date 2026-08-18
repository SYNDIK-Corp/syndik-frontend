import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.section`
  position: relative;
  /* 100svh: altura exata da viewport em qualquer dispositivo, estável no mobile */
  height: 100vh;
  height: 100svh;
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

/* fundo neutro (preto — combina com data-navbar-theme="dark" do Hero)
   enquanto a imagem de marketing ainda não chegou do Supabase; antes era um
   gradiente slate bem diferente do resto do site, dava um "flash" visível
   antes da imagem real aparecer (achado real, Fase 11.1). */
export const Pane = styled.div`
  position: relative;
  overflow: hidden;
  background: #000;
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

/* só usado quando o painel tem link_to cadastrado — cobre o painel inteiro,
   fica atrás do S.Content (pointer-events:none) então não interfere no CTA
   central. */
export const PaneLink = styled(Link)`
  position: absolute;
  inset: 0;
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
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(22px, 3vw, 44px);
  font-weight: 300;
  line-height: 1.3;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  white-space: pre-line;
  max-width: 44rem;
  text-shadow: 0 2px 12px rgba(15, 23, 42, 0.35);
`;

export const CtaWrapper = styled.div`
  pointer-events: auto;
`;
