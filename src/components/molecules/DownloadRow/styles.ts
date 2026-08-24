import styled from 'styled-components';

export const Container = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding: 12px 0;
  display: grid;
  grid-template-columns: 56px 1fr auto;
  gap: 14px;
  align-items: center;
  transition: background 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.surface};
  }

  @media (max-width: 760px) {
    padding: 9px 0;
    grid-template-columns: 44px 1fr auto;
    gap: 10px;
  }
`;

export const Thumb = styled.div`
  width: 56px;
  height: 56px;
  background: ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  text-align: center;
  padding: 6px;
  font-size: 9px;
  font-weight: 500;
  letter-spacing: 0.12em;

  @media (max-width: 760px) {
    width: 44px;
    height: 44px;
    font-size: 7px;
    padding: 4px;
  }
`;

export const ThumbImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;

  @media (max-width: 760px) {
    gap: 3px;
  }
`;

export const Kind = styled.span`
  font-size: 9px;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const Name = styled.span`
  font-size: 15px;
  font-weight: 500;
`;

export const Spec = styled.span`
  font-size: 11px;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  white-space: nowrap;
`;

export const Meta = styled.span`
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const DownloadButton = styled.button`
  height: 38px;
  padding: 0 16px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.black};
  cursor: pointer;
  font-size: 10px;
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

  &:disabled {
    opacity: 0.6;
    cursor: default;
    pointer-events: none;
  }
`;
