import styled from 'styled-components';

export const Container = styled.section`
  min-height: 100vh;
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: clamp(48px, 8vh, 96px) 0 clamp(48px, 8vh, 96px) clamp(20px, 4vw, 56px);
`;

export const Header = styled.div`
  max-width: 1600px;
  padding-right: clamp(20px, 4vw, 56px);
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
  flex-wrap: wrap;
`;

export const Title = styled.h2`
  margin-top: 14px;
  font-weight: 300;
  font-size: clamp(26px, 3.2vw, 46px);
  letter-spacing: -0.02em;
  text-transform: uppercase;
`;

export const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 22px;
`;

export const ViewAllWrapper = styled.div`
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
    background 0.35s ease,
    color 0.35s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.text};
  }

  &:active {
    background: ${({ theme }) => theme.colors.text};
    color: ${({ theme }) => theme.colors.white};
  }

  /* achado real (MVP 1.2): as setas passavam despercebidas no mobile —
     borda fina/baixo contraste sumia perto do resto do cabeçalho. Preenche
     sólido no touch, sem depender de :hover (que não existe em touch) */
  @media (max-width: 640px) {
    width: 38px;
    height: 38px;
    background: ${({ theme }) => theme.colors.black};
    border-color: ${({ theme }) => theme.colors.black};
    color: ${({ theme }) => theme.colors.white};
  }
`;

export const Rail = styled.div`
  margin-top: clamp(30px, 5vh, 58px);
  display: flex;
  gap: 24px;
  overflow-x: auto;
  scroll-snap-type: x proximity;
  scrollbar-width: none;
  -ms-overflow-style: none;

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
  flex: 0 0 clamp(20px, 4vw, 56px);
`;
