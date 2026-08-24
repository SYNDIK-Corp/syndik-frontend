import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const popIn = keyframes`
  from { opacity: 0; transform: translateY(8px) scale(0.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
`;

const spin = keyframes`
  to { transform: rotate(360deg); }
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
  animation: ${fadeIn} 0.2s ease;
`;

export const Card = styled.div`
  width: 100%;
  max-width: 320px;
  background: ${({ theme }) => theme.colors.white};
  padding: 32px 28px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 14px;
  animation: ${popIn} 0.25s cubic-bezier(0.2, 0.7, 0.2, 1);
`;

export const Spinner = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-top-color: ${({ theme }) => theme.colors.black};
  animation: ${spin} 0.7s linear infinite;

  @media (prefers-reduced-motion: reduce) {
    animation-duration: 1.4s;
  }
`;

export const Icon = styled.div<{ $tone: 'success' | 'error' }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme, $tone }) => ($tone === 'success' ? theme.colors.success : theme.colors.danger)};
  color: ${({ theme }) => theme.colors.white};
`;

export const Message = styled.p`
  font-size: 14px;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.text};
`;

export const CloseButton = styled.button`
  margin-top: 4px;
  height: 40px;
  padding: 0 24px;
  background: ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.white};
  border: 0;
  cursor: pointer;
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }
`;
