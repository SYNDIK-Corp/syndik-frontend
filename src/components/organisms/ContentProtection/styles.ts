import styled, { keyframes } from 'styled-components';

const fade = keyframes`
  0%, 100% { opacity: 0; transform: translate(-50%, 4px); }
  10%, 90% { opacity: 1; transform: translate(-50%, 0); }
`;

export const Toast = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 9999;
  transform: translate(-50%, 0);
  background: ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.white};
  padding: 10px 18px;
  border-radius: 4px;
  font-size: 13px;
  letter-spacing: 0.02em;
  pointer-events: none;
  animation: ${fade} 1.6s ease forwards;
`;
