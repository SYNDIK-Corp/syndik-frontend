import styled from 'styled-components';

export const Container = styled.div`
  max-width: 460px;
`;

export const Title = styled.h1`
  margin: 0;
  font-size: clamp(26px, 3.2vw, 44px);
  font-weight: 300;
  letter-spacing: -0.03em;
  text-transform: uppercase;
`;

export const Fields = styled.div`
  margin-top: 26px;
  display: flex;
  flex-direction: column;
  gap: 18px;

  @media (max-width: 760px) {
    margin-top: 16px;
    gap: 14px;
  }
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 9px;
`;

export const FieldLabel = styled.span`
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const PinRow = styled.div`
  display: flex;
  gap: 8px;
`;

export const SaveButton = styled.button`
  flex: 0 0 96px;
  height: 50px;
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
`;

export const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 11px;
  cursor: pointer;
`;

export const Checkbox = styled.input`
  width: 15px;
  height: 15px;
  accent-color: ${({ theme }) => theme.colors.black};
`;

export const CheckboxText = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const DangerZone = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const DangerLabel = styled.span`
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const DangerBody = styled.span`
  font-size: 12px;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const DeleteButton = styled.button`
  align-self: flex-start;
  height: 42px;
  padding: 0 18px;
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
`;
