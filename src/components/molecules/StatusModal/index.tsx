import { Icon } from '@/components/atoms/Icon';
import * as S from './styles';

export type StatusModalState = 'loading' | 'success' | 'error';

export interface StatusModalProps {
  status: StatusModalState;
  /* mostrado só em success/error — loading não tem texto próprio, quem
     chama decide a mensagem certa pra cada operação */
  message?: string;
  closeLabel?: string;
  /* ausente em loading (não dá pra fechar/cancelar uma operação em
     andamento) */
  onClose?: () => void;
}

/** popup genérico de resultado — loading centralizado enquanto uma ação
 * roda, depois sucesso ou erro. Mesmo padrão estrutural de
 * DuplicateItemModal/ImagePickerModal (Backdrop + Card), sem depender de
 * nenhum contexto específico. */
export function StatusModal({ status, message, closeLabel, onClose }: StatusModalProps) {
  return (
    <S.Backdrop onClick={status !== 'loading' ? onClose : undefined}>
      <S.Card onClick={(event) => event.stopPropagation()} role="status">
        {status === 'loading' && <S.Spinner aria-hidden="true" />}
        {status === 'success' && (
          <S.Icon $tone="success" aria-hidden="true">
            <Icon name="check" size={18} />
          </S.Icon>
        )}
        {status === 'error' && (
          <S.Icon $tone="error" aria-hidden="true">
            <Icon name="close" size={18} />
          </S.Icon>
        )}

        {message && <S.Message>{message}</S.Message>}

        {status !== 'loading' && onClose && (
          <S.CloseButton type="button" onClick={onClose}>
            {closeLabel}
          </S.CloseButton>
        )}
      </S.Card>
    </S.Backdrop>
  );
}
