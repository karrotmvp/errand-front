import styled from "@emotion/styled";
import { useParams } from "@karrotframe/navigator";
import usePush from "@hooks/usePush";
import { StickyFooter, StickyPageWrpper } from "@styles/shared";
import { useErrandDetail } from "@api/errands";
import CustomScreenHelmet from "@components/CustomScreenHelmet";
import { Meatballs } from "@assets/icon";
import { convertToKRW } from "@utils/convert";
import { useState } from "react";
import Modal from "@components/Modal";

// function validateParams(props: { id?: string }): props is { id: string } {
//   return Boolean(props.id);
// }

export default function ErrandDetail() {
  const moveToApplyForm = usePush("/apply-form");
  const params = useParams<{ id: string }>();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  if (!params.id) {
    throw new Error();
  }
  const { status, data } = useErrandDetail(params.id);

  return (
    <StickyPageWrpper>
      <CustomScreenHelmet
        customBackButton={<div>커스텀</div>}
        title="상세페이지"
        appendRight={<Meatballs onClick={openModal} />}
      />
      <ErrandDetailWrapper>
        {status !== "loading" ? (
          <>
            <div className="errand-detail__image">
              <img src={data?.errand.imageUrls[0].url} alt="dummy" />
            </div>
            <div className="errand-detail__contents">
              <h2>{data?.errand.title}</h2>
              <div className="errand-detail__contents__title">
                <div>
                  <span>{data?.errand.category.name}</span>
                  <span>{data?.errand.region.name}</span>
                  <span>11시간 전</span>
                </div>
                <span>지원 1</span>
              </div>
              <div className="errand-detail__contents__info">
                <div>
                  <div>심부름 금액</div>
                  {/* Elon 이런 경우 보통 어떻게 처리하나?  */}
                  {/* <div>{convertToKRW(data?.errand.reward)}</div> */}
                  <div>5000원</div>
                </div>
                <div>
                  <div>요청장소</div>
                  <div>{data?.errand.detailAddress}</div>
                </div>
                <div>
                  <div>전화번호</div>
                  <div>{data?.errand.customerPhoneNumber}</div>
                </div>
              </div>
              <p>{data?.errand.detail}</p>
            </div>
          </>
        ) : (
          <div>로딩 중</div>
        )}
      </ErrandDetailWrapper>
      {isOpen && (
        <Modal
          visible={isOpen}
          closable={true}
          maskClosable={true}
          onClose={closeModal}
        >
          <div>test</div>
        </Modal>
      )}
      <StickyFooter>
        <button onClick={moveToApplyForm}>일단 지원하기</button>
      </StickyFooter>
    </StickyPageWrpper>
  );
}

const ErrandDetailWrapper = styled.div`
  .errand-detail {
    &__image {
      width: 100%;
      & > img {
        width: 100%;
      }
    }
    &__contents {
      background: white;
      border-radius: 1.3rem;
      padding: 2.2rem 0;
      ${({ theme }) => theme.container}
      transform: translateY(-2rem);
      z-index: 10;
      h2 {
        ${({ theme }) => theme.font("large", "bold")}
      }

      &__title {
        ${({ theme }) => theme.font("small", "medium")}
        color: ${({ theme }) => theme.color.grey4};
        margin-top: 0.7rem;

        display: flex;
        justify-content: space-between;

        & > div > span + span::before {
          content: " • ";
          margin: 0 0.5rem;
        }
      }

      &__info {
        ${({ theme }) => theme.font("medium", "regular")}
        margin-top: 3rem;

        & > div {
          display: flex;
          justify-content: space-between;

          & > div:nth-child(2) {
            max-width: 23.3rem;
            text-align: right;
          }
        }

        & > div + div {
          margin-top: 2.4rem;
        }
      }

      p {
        ${({ theme }) => theme.font("medium")}
        margin-top: 2.3rem;
        margin-bottom: 3.8rem;
      }
    }
  }
`;
