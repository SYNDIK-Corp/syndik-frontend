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
  background: rgba(10, 10, 10, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  animation: ${fadeIn} 0.25s ease;
`;

export const Card = styled.div`
  width: 100%;
  max-width: 380px;
  background: ${({ theme }) => theme.colors.white};
  padding: 28px;
  animation: ${popIn} 0.3s cubic-bezier(0.2, 0.7, 0.2, 1);
`;

export const Title = styled.h2`
  font-size: 18px;
  font-weight: 500;
  letter-spacing: -0.01em;
`;

export const Body = styled.p`
  margin-top: 10px;
  font-size: 13px;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const ProductName = styled.span`
  color: ${({ theme }) => theme.colors.text};
  font-weight: 500;
`;

export const Actions = styled.div`
  margin-top: 22px;
  display: flex;
  gap: 10px;
`;

export const ConfirmButton = styled.button`
  flex: 1;
  height: 46px;
  background: ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.white};
  border: 0;
  cursor: pointer;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  transition:
    background 0.3s ease,
    color 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.black};
    box-shadow: inset 0 0 0 1px ${({ theme }) => theme.colors.black};
  }
`;

export const CancelButton = styled.button`
  flex: 1;
  height: 46px;
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.textMuted};
  border: 1px solid ${({ theme }) => theme.colors.border};
  cursor: pointer;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  transition:
    border-color 0.3s ease,
    color 0.3s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.black};
    color: ${({ theme }) => theme.colors.text};
  }
`;
