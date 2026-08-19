import styled from 'styled-components';

export const Field = styled.textarea`
  width: 100%;
  min-height: 140px;
  padding: 13px 15px;
  resize: vertical;
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
