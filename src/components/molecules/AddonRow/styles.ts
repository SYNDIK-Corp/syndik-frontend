import styled from 'styled-components';

export const Container = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding: 13px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
`;

export const Thumb = styled.div`
  flex: 0 0 auto;
  position: relative;
  width: 44px;
  height: 44px;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.surface};
`;

export const ThumbImage = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
`;

export const Name = styled.span`
  font-size: 13px;
  font-weight: 500;
`;

export const Description = styled.span`
  font-size: 11px;
  line-height: 1.55;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  white-space: nowrap;
`;

export const Price = styled.span`
  font-size: 13px;
  font-weight: 500;
`;

export const AddButton = styled.button`
  height: 32px;
  padding: 0 12px;
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
