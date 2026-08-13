import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import type { CardTone } from '.';

export const AltImage = styled.div`
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.8s cubic-bezier(0.2, 0.7, 0.2, 1);
`;

export const CartButton = styled.button`
  position: absolute;
  left: 12px;
  bottom: 12px;
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--card-cart-bg);
  border: 1px solid var(--card-fg);
  color: var(--card-fg);
  opacity: 0;
  transform: translateY(6px);
  transition:
    opacity 0.35s ease,
    transform 0.5s cubic-bezier(0.2, 0.7, 0.2, 1),
    background 0.3s ease,
    color 0.3s ease;

  &:hover {
    background: var(--card-fg);
    color: var(--card-bg);
  }
`;

export const Frame = styled.div<{ $ratio: string; $sold?: boolean }>`
  position: relative;
  aspect-ratio: ${({ $ratio }) => $ratio};
  overflow: hidden;
  background-color: var(--card-frame);
  opacity: ${({ $sold }) => ($sold ? 0.42 : 1)};
`;

export const Image = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const Tag = styled.span<{ $sold?: boolean }>`
  position: absolute;
  left: 0;
  top: 14px;
  background: ${({ theme, $sold }) => ($sold ? theme.colors.textMuted : 'var(--card-fg)')};
  color: ${({ theme, $sold }) => ($sold ? theme.colors.white : 'var(--card-bg)')};
  padding: 6px 11px 6px 12px;
  font-size: 9px;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  pointer-events: none;
`;

export const Meta = styled.div<{ $layout: 'stack' | 'row' }>`
  color: var(--card-fg);

  ${({ $layout }) =>
    $layout === 'row'
      ? css`
          margin-top: 14px;
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 16px;
        `
      : css`
          margin-top: 16px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        `}
`;

export const MetaInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const Collection = styled.span`
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--card-muted);
`;

export const Name = styled.span<{ $layout: 'stack' | 'row' }>`
  font-size: ${({ $layout }) => ($layout === 'row' ? '16px' : '15px')};
  font-weight: 500;
  letter-spacing: 0.02em;
`;

export const Prices = styled.div`
  margin-top: 4px;
  display: flex;
  align-items: baseline;
  gap: 10px;
`;

export const Price = styled.span<{ $layout: 'stack' | 'row' }>`
  font-size: ${({ $layout }) => ($layout === 'row' ? '16px' : '14px')};
  font-weight: 500;
`;

export const ComparePrice = styled.span`
  font-size: 12px;
  color: var(--card-muted);
  text-decoration: line-through;
`;

export const SoldLabel = styled.span<{ $layout: 'stack' | 'row' }>`
  font-size: ${({ $layout }) => ($layout === 'row' ? '16px' : '14px')};
  font-weight: 500;
  color: var(--card-muted);
`;

export const Container = styled(Link)<{ $tone: CardTone; $compact: boolean; $dense: boolean }>`
  display: block;

  ${({ theme, $tone }) =>
    $tone === 'dark'
      ? css`
          --card-fg: ${theme.colors.white};
          --card-bg: ${theme.colors.black};
          --card-muted: rgba(255, 255, 255, 0.55);
          --card-frame: #1a1a1a;
          --card-cart-bg: transparent;
        `
      : css`
          --card-fg: ${theme.colors.text};
          --card-bg: ${theme.colors.white};
          --card-muted: ${theme.colors.textMuted};
          --card-frame: ${theme.colors.surface};
          --card-cart-bg: ${theme.colors.white};
        `}

  &:hover ${AltImage} {
    opacity: 1;
  }

  &:hover ${CartButton} {
    opacity: 1;
    transform: translateY(0);
  }

  ${({ $compact }) =>
    $compact &&
    css`
      ${CartButton} {
        display: none;
      }

      ${Tag} {
        top: 10px;
        padding: 4px 8px;
        font-size: 8px;
      }

      ${Meta} {
        margin-top: 10px;
        gap: 4px;
      }

      ${Collection} {
        font-size: 9px;
        letter-spacing: 0.16em;
      }

      ${Name} {
        font-size: 12px;
      }

      ${Prices} {
        margin-top: 2px;
        gap: 8px;
      }

      ${Price} {
        font-size: 12px;
      }

      ${ComparePrice} {
        font-size: 10px;
      }
    `}

  ${({ $dense }) =>
    $dense &&
    css`
      ${Tag} {
        top: 10px;
        padding: 4px 8px;
        font-size: 8px;
      }

      ${CartButton} {
        left: 8px;
        bottom: 8px;
        width: 36px;
        height: 36px;
      }

      ${Meta} {
        margin-top: 10px;
        gap: 10px;
      }

      ${MetaInfo} {
        gap: 4px;
        min-width: 0;
      }

      ${Collection} {
        font-size: 8px;
      }

      ${Name} {
        font-size: 12px;
      }

      ${Price}, ${SoldLabel} {
        font-size: 12px;
      }
    `}
`;
