import styled, { keyframes } from 'styled-components';

const tick = keyframes`
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
`;

export const Container = styled.div`
  overflow: hidden;
`;

export const Track = styled.div`
  display: flex;
  width: max-content;
  animation: ${tick} 30s linear infinite;
`;

export const Item = styled.span`
  padding-right: 40px;
  white-space: nowrap;
`;
