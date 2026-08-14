import styled from 'styled-components';

export const Container = styled.section`
  padding: clamp(48px, 8vh, 100px) 0 clamp(48px, 8vh, 96px) clamp(16px, 3vw, 40px);
`;

export const Header = styled.div`
  max-width: 1700px;
  padding-right: clamp(16px, 3vw, 40px);
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
  flex-wrap: wrap;
`;

export const Title = styled.h2`
  margin-top: 12px;
  font-size: clamp(22px, 2.6vw, 38px);
  font-weight: 300;
  letter-spacing: -0.025em;
  text-transform: uppercase;
`;

export const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const ViewSheetWrapper = styled.div`
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const Arrows = styled.div`
  display: flex;
  gap: 8px;
`;

export const Arrow = styled.button`
  background: none;
  border: 1px solid ${({ theme }) => theme.colors.border};
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.text};
  transition:
    border-color 0.35s ease,
    background 0.35s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.text};
  }

  &:active {
    background: ${({ theme }) => theme.colors.text};
    color: ${({ theme }) => theme.colors.white};
  }
`;

export const Rail = styled.div`
  margin-top: 26px;
  display: flex;
  gap: 24px;
  overflow-x: auto;
  scroll-snap-type: x proximity;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const RailItem = styled.div`
  flex: 0 0 calc((100% - 96px) / 4.5);
  scroll-snap-align: start;

  @media (max-width: 900px) {
    flex-basis: calc((100% - 48px) / 2.2);
  }

  @media (max-width: 560px) {
    flex-basis: calc((100% - 24px) / 1.35);
  }
`;

export const RailSpacer = styled.div`
  flex: 0 0 clamp(16px, 3vw, 40px);
`;
