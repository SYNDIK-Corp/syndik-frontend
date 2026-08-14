import styled from 'styled-components';

export const Container = styled.div`
  padding-bottom: 20px;
  display: grid;
  grid-template-columns: 74px 1fr auto;
  gap: 16px;
  align-items: start;
`;

export const ThumbWrapper = styled.div`
  position: relative;
  width: 74px;
  height: 74px;
`;

export const Thumb = styled.div`
  position: absolute;
  inset: 0;
  background: ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 6px;
  font-size: 9px;
  font-weight: 500;
  letter-spacing: 0.12em;
`;

export const QtyBadge = styled.span`
  position: absolute;
  right: -7px;
  top: -7px;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 500;
  box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.surface};
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
`;

export const Sku = styled.span`
  font-size: 9px;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const Name = styled.span`
  font-size: 14px;
  line-height: 1.4;
`;

export const RemoveButton = styled.button`
  align-self: flex-start;
  background: none;
  border: 0;
  padding: 0;
  cursor: pointer;
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const Price = styled.span`
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
`;
