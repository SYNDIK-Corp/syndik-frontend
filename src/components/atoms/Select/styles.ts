import styled from 'styled-components';

export const Field = styled.select`
  width: 100%;
  height: 50px;
  padding: 0 15px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  outline: none;
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.text};
  font-size: 14px;
  font-family: inherit;
  appearance: none;
  background-image: linear-gradient(45deg, transparent 50%, currentColor 50%), linear-gradient(135deg, currentColor 50%, transparent 50%);
  background-position:
    calc(100% - 20px) center,
    calc(100% - 15px) center;
  background-size:
    5px 5px,
    5px 5px;
  background-repeat: no-repeat;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: ${({ theme }) => theme.colors.text};
  }
`;
