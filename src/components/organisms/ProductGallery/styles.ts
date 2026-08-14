import styled from 'styled-components';

export const Container = styled.div`
  position: sticky;
  top: calc(${({ theme }) => theme.sizes.navbarHeight} + 20px);
  display: flex;
  flex-direction: column;
  gap: 14px;

  @media (max-width: 900px) {
    position: static;
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 16px;
`;

export const Counter = styled.span`
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const CounterValue = styled.span`
  color: ${({ theme }) => theme.colors.text};
`;

export const Arrows = styled.div`
  display: flex;
  gap: 8px;
`;

export const Arrow = styled.button`
  background: none;
  border: 1px solid ${({ theme }) => theme.colors.border};
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.text};
  transition:
    border-color 0.35s ease,
    background 0.35s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.text};
  }

  &:active {
    background: ${({ theme }) => theme.colors.text};
    color: ${({ theme }) => theme.colors.white};
  }
`;

export const Zoomer = styled.div`
  position: relative;
  aspect-ratio: 4 / 3;
  background: ${({ theme }) => theme.colors.black};
  overflow: hidden;
`;

export const ZoomImage = styled.div`
  position: absolute;
  inset: 0;
  transition: transform 1.1s cubic-bezier(0.2, 0.7, 0.2, 1);

  ${Zoomer}:hover & {
    transform: scale(1.45);
  }
`;

export const Layer = styled.div<{ $active: boolean }>`
  position: absolute;
  inset: 0;
  opacity: ${({ $active }) => ($active ? 1 : 0)};
  transition: opacity 0.6s cubic-bezier(0.2, 0.7, 0.2, 1);
`;

export const ZoomHint = styled.span`
  position: absolute;
  left: 0;
  top: 14px;
  background: ${({ theme }) => theme.colors.white};
  padding: 6px 11px;
  font-size: 9px;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  pointer-events: none;
`;

export const Filmstrip = styled.div`
  display: flex;
  gap: 8px;
  overflow-x: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Thumb = styled.button<{ $active: boolean }>`
  flex: 0 0 62px;
  aspect-ratio: 1 / 1;
  padding: 0;
  border: none;
  background: ${({ theme }) => theme.colors.black};
  cursor: pointer;
  opacity: ${({ $active }) => ($active ? 1 : 0.45)};
  box-shadow: ${({ $active, theme }) => ($active ? `inset 0 0 0 1px ${theme.colors.text}` : 'none')};
  transition: opacity 0.3s ease;

  &:hover {
    opacity: ${({ $active }) => ($active ? 1 : 0.8)};
  }
`;

export const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const FooterHighlight = styled.span`
  color: ${({ theme }) => theme.colors.text};
`;
