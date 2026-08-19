import styled from 'styled-components';

export const Container = styled.div`
  background: ${({ theme }) => theme.colors.white};
  padding: 14px;
  transition: box-shadow 0.35s ease;

  &:hover {
    box-shadow: inset 0 0 0 1px ${({ theme }) => theme.colors.black};
  }
`;

export const Thumb = styled.div`
  position: relative;
  aspect-ratio: 4 / 5;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 8px;
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.14em;
`;

export const ThumbImage = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const Meta = styled.div`
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const Sku = styled.span`
  font-size: 9px;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const Name = styled.span`
  font-size: 12px;
  font-weight: 500;
  line-height: 1.35;
`;

export const Prices = styled.div`
  display: flex;
  align-items: baseline;
  gap: 8px;
`;

export const Price = styled.span`
  font-size: 13px;
  font-weight: 500;
`;

export const ComparePrice = styled.span`
  font-size: 11px;
  color: ${({ theme }) => theme.colors.textMuted};
  text-decoration: line-through;
`;

export const SaveTag = styled.span`
  align-self: flex-start;
  background: ${({ theme }) => theme.colors.success};
  color: ${({ theme }) => theme.colors.white};
  padding: 4px 8px;
  font-size: 8px;
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
`;

export const AddButton = styled.button`
  margin-top: 4px;
  height: 34px;
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.black};
  cursor: pointer;
  font-size: 9px;
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  transition:
    background 0.3s ease,
    color 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.black};
    color: ${({ theme }) => theme.colors.white};
  }
`;
