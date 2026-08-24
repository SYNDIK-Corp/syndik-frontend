import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const popIn = keyframes`
  from { opacity: 0; transform: translateY(8px) scale(0.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
`;

export const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: ${({ theme }) => theme.zIndices.drawer + 2};
  background: rgba(10, 10, 10, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  animation: ${fadeIn} 0.25s ease;
`;

export const Card = styled.div`
  width: 100%;
  max-width: 560px;
  max-height: 82vh;
  overflow-y: auto;
  background: ${({ theme }) => theme.colors.white};
  padding: 24px;
  animation: ${popIn} 0.3s cubic-bezier(0.2, 0.7, 0.2, 1);
`;

export const Header = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
`;

export const Title = styled.h2`
  font-size: 18px;
  font-weight: 500;
  letter-spacing: -0.01em;
`;

export const CloseButton = styled.button`
  background: none;
  border: 0;
  padding: 4px;
  margin: -4px;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.textMuted};

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const Grid = styled.div`
  margin-top: 18px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  gap: 14px;
`;

export const Cell = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Thumb = styled.div`
  aspect-ratio: 3 / 4;
  background: ${({ theme }) => theme.colors.surface};
  overflow: hidden;
`;

export const ThumbImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

export const CellActions = styled.div`
  display: flex;
  gap: 6px;
`;

export const CellButton = styled.button`
  flex: 1;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.black};
  cursor: pointer;
  font-size: 9px;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  transition:
    background 0.2s ease,
    color 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.black};
    color: ${({ theme }) => theme.colors.white};
  }

  &:disabled {
    opacity: 0.6;
    cursor: default;
    pointer-events: none;
  }
`;

export const EmptyMessage = styled.p`
  margin-top: 18px;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textMuted};
`;
