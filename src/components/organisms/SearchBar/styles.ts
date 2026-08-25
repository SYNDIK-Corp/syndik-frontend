import styled from 'styled-components';

export const Row = styled.div`
  display: flex;
  align-items: center;
  gap: clamp(14px, 3vw, 24px);
`;

export const IconWrapper = styled.span`
  flex: 0 0 auto;
  display: flex;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const Input = styled.input`
  flex: 1;
  min-width: 0;
  border: 0;
  outline: 0;
  background: none;
  font-family: inherit;
  font-weight: 300;
  font-size: clamp(28px, 5.4vw, 72px);
  letter-spacing: -0.03em;
  color: ${({ theme }) => theme.colors.text};

  &::placeholder {
    color: ${({ theme }) => theme.colors.text};
    opacity: 1;
  }
`;

export const ClearButton = styled.button`
  flex: 0 0 auto;
  background: none;
  border: 0;
  cursor: pointer;
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
  transition:
    color 0.3s cubic-bezier(0.2, 0.7, 0.2, 1),
    transform 0.2s cubic-bezier(0.2, 0.7, 0.2, 1);

  &:hover {
    color: ${({ theme }) => theme.colors.black};
  }

  &:active {
    transform: scale(0.94);
  }
`;
