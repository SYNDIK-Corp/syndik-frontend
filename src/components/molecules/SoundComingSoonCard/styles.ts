import styled from 'styled-components';

export const Container = styled.div`
  display: block;
`;

export const Frame = styled.div`
  position: relative;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  background:
    repeating-linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.05) 0px,
      rgba(255, 255, 255, 0.05) 1px,
      transparent 1px,
      transparent 14px
    ),
    #161616;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Wordmark = styled.span`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(13px, 1.6vw, 18px);
  font-weight: 500;
  letter-spacing: 0.32em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.28);
`;

export const Badge = styled.span`
  position: absolute;
  left: 0;
  top: 14px;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.4);
  color: rgba(255, 255, 255, 0.85);
  padding: 6px 11px 6px 12px;
  font-size: 9px;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
`;

export const Meta = styled.div`
  margin-top: 16px;
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: 4px 16px;
`;

export const Name = styled.span`
  font-size: 17px;
  font-weight: 400;
  letter-spacing: 0.01em;
  color: ${({ theme }) => theme.colors.white};
`;

export const Collection = styled.span`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.55);
  white-space: nowrap;
`;
