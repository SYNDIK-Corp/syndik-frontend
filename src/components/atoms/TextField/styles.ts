import styled from 'styled-components';

export const Input = styled.input`
  width: 100%;
  height: 50px;
  padding: 0 15px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  outline: none;
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.text};
  font-size: 14px;
  font-family: inherit;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: ${({ theme }) => theme.colors.text};
  }

  &::placeholder {
    color: #999999;
  }
`;
