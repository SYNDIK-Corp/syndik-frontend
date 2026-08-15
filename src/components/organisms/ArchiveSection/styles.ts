import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

export const Container = styled.section`
  padding: clamp(44px, 7vh, 84px) clamp(20px, 4vw, 56px);
`;

export const Grid = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: clamp(16px, 2.5vh, 28px) clamp(24px, 4vw, 64px);
  align-items: center;
`;

/* ---- vitrine de mockups ---- */

export const Showcase = styled.div`
  grid-column: span 7;
  position: relative;
  padding-bottom: 8%;

  @media (max-width: 900px) {
    grid-column: 1 / -1;
  }
`;

export const Laptop = styled.div`
  width: 76%;
`;

export const LaptopBody = styled.div`
  background: #d7d7d7;
  padding: 9px;
  border-radius: 10px 10px 4px 4px;
`;

export const LaptopScreen = styled.div`
  position: relative;
  aspect-ratio: 16 / 10;
  background: ${({ theme }) => theme.colors.black};
  border-radius: 4px;
  overflow: hidden;
`;

export const LaptopBase = styled.div`
  width: 112%;
  margin-left: -6%;
  height: 11px;
  background: #c6c6c6;
  border-radius: 0 0 9px 9px;
  position: relative;
`;

export const LaptopNotch = styled.div`
  position: absolute;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
  width: 16%;
  height: 4px;
  background: #b0b0b0;
  border-radius: 0 0 4px 4px;
`;

export const Phone = styled.div`
  position: absolute;
  left: 44%;
  bottom: 6%;
  width: 16%;
  background: #141414;
  padding: 5px;
  border-radius: 24px;
  box-shadow: 0 18px 40px rgba(10, 10, 10, 0.18);
  animation: ${float} 7s ease-in-out 1.4s infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const PhoneScreen = styled.div`
  position: relative;
  aspect-ratio: 9 / 19.5;
  background: ${({ theme }) => theme.colors.black};
  border-radius: 20px;
  overflow: hidden;
`;

export const PhoneNotch = styled.div`
  position: absolute;
  left: 50%;
  top: 7px;
  transform: translateX(-50%);
  width: 32%;
  height: 7px;
  background: ${({ theme }) => theme.colors.black};
  border-radius: 4px;
`;

export const CoverBlock = styled.div`
  position: absolute;
  right: 0;
  top: 4%;
  width: 30%;
  animation: ${float} 5.5s ease-in-out infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const CoverArt = styled.div`
  position: relative;
  aspect-ratio: 1 / 1;
  background: ${({ theme }) => theme.colors.black};
  overflow: hidden;
  box-shadow: 0 24px 60px rgba(10, 10, 10, 0.2);
`;

export const CoverTag = styled.span`
  position: absolute;
  left: 0;
  top: 12px;
  background: ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.white};
  padding: 6px 11px;
  font-size: 9px;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
`;

export const NowPlaying = styled.div`
  margin-top: 14px;
  background: ${({ theme }) => theme.colors.black};
  padding: 11px 12px;
  display: flex;
  align-items: center;
  gap: 11px;
`;

export const NowPlayingThumb = styled.div`
  width: 34px;
  height: 34px;
  flex: 0 0 34px;
  overflow: hidden;
  background: #1a1a1a;
`;

export const NowPlayingInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
`;

export const TrackName = styled.span`
  color: ${({ theme }) => theme.colors.white};
  font-size: 11px;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const NowPlayingLabel = styled.span`
  color: rgba(255, 255, 255, 0.55);
  font-size: 9px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
`;

export const SlotImage = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const ThumbImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

export const Caption = styled.div`
  margin-top: 20px;
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const CoverCaption = styled.div`
  margin-top: 12px;
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
`;

/* ---- conteúdo ---- */

export const Content = styled.div`
  grid-column: span 5;

  @media (max-width: 900px) {
    grid-column: 1 / -1;
  }
`;

export const Title = styled.h2`
  margin-top: 14px;
  font-weight: 300;
  font-size: clamp(28px, 3.4vw, 50px);
  line-height: 0.95;
  letter-spacing: -0.04em;
  text-transform: uppercase;
  white-space: pre-line;
`;

export const Description = styled.p`
  margin-top: 18px;
  max-width: 36ch;
  font-size: 14px;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const Rows = styled.div`
  margin-top: 22px;
  display: flex;
  flex-direction: column;
`;

export const Row = styled(Link)`
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding: 11px 0;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 18px;
  transition:
    padding-left 0.4s cubic-bezier(0.2, 0.7, 0.2, 1),
    color 0.3s ease;

  &:last-child {
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }

  &:hover {
    padding-left: 10px;
  }
`;

export const RowName = styled.span`
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.04em;
  text-transform: uppercase;
`;

export const RowPrice = styled.span`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const Cta = styled(Link)`
  margin-top: 22px;
  display: inline-block;
  background: ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.white};
  padding: 17px 30px;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.18em;
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

/* ---- ficha técnica ---- */

export const SpecSheet = styled.div`
  grid-column: span 12;
`;

export const SpecSheetSpacing = styled.div`
  margin-top: 16px;
`;
