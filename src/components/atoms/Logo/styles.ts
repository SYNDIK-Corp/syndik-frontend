import styled from 'styled-components';
import { Link } from 'react-router-dom';
import logoMask from '@/assets/logo/logo-mask.png';

export const Container = styled(Link)<{ $width?: string }>`
  display: block;
  width: ${({ theme, $width }) => $width ?? theme.sizes.logoNavWidth};
  aspect-ratio: 2.15 / 1;
  background-color: currentColor;
  -webkit-mask: url(${logoMask}) center / contain no-repeat;
  mask: url(${logoMask}) center / contain no-repeat;
  transition: background-color 0.25s ease;
`;
