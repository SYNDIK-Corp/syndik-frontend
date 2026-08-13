import styled from 'styled-components';

export const Backdrop = styled.div<{ $open: boolean }>`
  position: fixed;
  inset: 0;
  z-index: ${({ theme }) => theme.zIndices.drawer};
  background: rgba(10, 10, 10, 0.28);
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  pointer-events: ${({ $open }) => ($open ? 'auto' : 'none')};
  transition: opacity 0.35s ease;
`;

export const Drawer = styled.aside<{ $open: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: ${({ theme }) => theme.zIndices.drawer + 1};
  width: min(420px, 92vw);
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.text};
  box-shadow: -20px 0 60px rgba(10, 10, 10, 0.18);
  transform: translateX(${({ $open }) => ($open ? '0' : '100%')});
  transition: transform 0.4s cubic-bezier(0.2, 0.7, 0.2, 1);
`;

export const Header = styled.div`
  padding: 20px 22px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const HeaderLabel = styled.span`
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
`;

export const CloseButton = styled.button`
  background: none;
  border: 0;
  cursor: pointer;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const Lines = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 6px 22px;
`;

export const EmptyMessage = styled.p`
  margin-top: 28px;
  font-size: 13px;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const Line = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding: 16px 0;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 14px;
`;

export const LineInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const LineSku = styled.span`
  font-size: 9px;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const LineName = styled.span`
  font-size: 13px;
  font-weight: 500;
`;

export const LineActions = styled.div`
  display: flex;
  align-items: baseline;
  gap: 14px;
`;

export const LinePrice = styled.span`
  font-size: 13px;
`;

export const RemoveButton = styled.button`
  background: none;
  border: 0;
  cursor: pointer;
  font-size: 15px;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1;
`;

export const Footer = styled.div`
  padding: 20px 22px;
  border-top: 1px solid ${({ theme }) => theme.colors.text};
`;

export const TotalRow = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
`;

export const TotalLabel = styled.span`
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const TotalValue = styled.span`
  font-size: 18px;
  font-weight: 500;
`;

export const CheckoutButton = styled.button`
  margin-top: 16px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 52px;
  background: ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.white};
  border: none;
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

export const Perks = styled.div`
  margin-top: 14px;
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
`;
