import styled, { css } from 'styled-components';
import type { ButtonVariant } from '.';

export const Container = styled.button<{ $variant: ButtonVariant }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.lg}`};
  border: 1px solid transparent;
  border-radius: ${({ theme }) => theme.radii.md};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: 600;
  transition: background-color 0.2s ease;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  ${({ theme, $variant }) =>
    $variant === 'primary' &&
    css`
      background-color: ${theme.colors.primary};
      color: ${theme.colors.white};

      &:hover:not(:disabled) {
        background-color: ${theme.colors.primaryHover};
      }
    `}

  ${({ theme, $variant }) =>
    $variant === 'light' &&
    css`
      background-color: ${theme.colors.white};
      color: ${theme.colors.secondary};

      &:hover:not(:disabled) {
        background-color: ${theme.colors.surface};
      }
    `}

  ${({ theme, $variant }) =>
    $variant === 'outline' &&
    css`
      background-color: transparent;
      color: ${theme.colors.primary};
      border-color: ${theme.colors.primary};

      &:hover:not(:disabled) {
        background-color: ${theme.colors.surface};
      }
    `}
`;
