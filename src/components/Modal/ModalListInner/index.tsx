import styled from "@emotion/styled";
import { Confirm, Content } from "..";

type ModalListInnerProps = {
  list: Content[];
  closeModal: () => void;
  openConfirmModal: (content: Confirm) => void;
};

export default function ModalListInner({
  list,
  closeModal,
  openConfirmModal,
}: ModalListInnerProps) {
  return (
    <ModalContentListInnerWrapper>
      <div className="modal-inner__list">
        {list.map((content, index) => (
          <div
            className="modal-inner__item top-border"
            onClick={() => {
              if (content.confirm) {
                openConfirmModal(content.confirm);
              }
            }}
            key={index}
          >
            {content.text}
          </div>
        ))}
      </div>
      <div className="modal-inner__item close" onClick={closeModal}>
        닫기
      </div>
    </ModalContentListInnerWrapper>
  );
}
const ModalContentListInnerWrapper = styled.div`
  padding-bottom: 3.2rem;
  .top-border + .top-border {
    border-top: 0.1rem solid ${({ theme }) => theme.color.grey6};
  }
  .modal-inner {
    &__list {
      border-radius: 0.8rem;
      background: white;
    }
    &__item {
      ${({ theme }) => theme.font("large", "medium")}
      text-align: center;
      background: white;
      border-radius: 0.8rem;
      padding: 1.3rem 0;

      &.close {
        ${({ theme }) => theme.font("large", "regular")}
        margin-top: 1.1rem;
      }
    }
    &__item + &__item {
      margin-top: 5px;
    }
  }
`;
