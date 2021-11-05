import styled from "@emotion/styled";
import { Confirm } from "..";

type ModalConfirmInnerProps = {
  confirmContent: Confirm;
  closeModal: () => void;
};

export default function ModalConfirmInner({
  confirmContent,
  closeModal,
}: ModalConfirmInnerProps) {
  return (
    <ModalConfirmInnerWrapper>
      <div className="modal-confirm__text">{confirmContent.text}</div>
      <div className="modal-confirm__buttons">
        {confirmContent.no}
        {confirmContent.yes}
      </div>
    </ModalConfirmInnerWrapper>
  );
}

const ModalConfirmInnerWrapper = styled.div`
  background: white;
  border-radius: 0.8rem;

  ${({ theme }) => theme.font("large", "regular")} .modal-confirm {
    &__text {
      display: flex;
      justify-content: center;
      align-items: center;
      white-space: pre-wrap;
      text-align: center;

      padding: 2.1rem 1.7rem;
      border-bottom: 0.1rem solid ${({ theme }) => theme.color.grey6};
    }

    &__buttons {
      padding: 0 1.7rem;
      display: flex;
      justify-content: center;
      align-items: center;

      & > * {
        width: 100%;
        text-align: center;
      }

      & > * + * {
        padding: 2.1rem 0;
        border-left: 0.1rem solid ${({ theme }) => theme.color.grey6};
      }
    }
  }
`;
