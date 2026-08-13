import styled from 'styled-components';

export const Container = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.border};

  &:last-of-type {
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }
`;

export const Header = styled.button`
  width: 100%;
  padding: 16px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  font-size: 14px;
  font-family: inherit;
  text-align: left;
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
`;

export const Plus = styled.span<{ $open: boolean }>`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 16px;
  line-height: 1;
  transform: rotate(${({ $open }) => ($open ? '45deg' : '0deg')});
  transition: transform 0.35s cubic-bezier(0.2, 0.7, 0.2, 1);
`;

export const AnswerWrapper = styled.div<{ $open: boolean }>`
  display: grid;
  grid-template-rows: ${({ $open }) => ($open ? '1fr' : '0fr')};
  transition: grid-template-rows 0.45s cubic-bezier(0.2, 0.7, 0.2, 1);
`;

export const AnswerInner = styled.div`
  overflow: hidden;
  min-height: 0;
`;

export const Answer = styled.div`
  padding: 0 0 18px;
  font-size: 12px;
  line-height: 1.75;
  color: ${({ theme }) => theme.colors.textMuted};
  max-width: 56ch;
`;
