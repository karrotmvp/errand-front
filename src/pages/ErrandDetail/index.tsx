import styled from "@emotion/styled";
import usePush from "@hooks/usePush";
import { StickyFooter, StickyPageWrpper } from "@styles/shared";
import { confirmIsAppliable, useErrandDetail } from "@api/errands";
import CustomScreenHelmet from "@components/CustomScreenHelmet";
import { Meatballs } from "@assets/icon";
import { convertToKRW } from "@utils/convert";
import Modal from "@components/Modal";
import { WithParamsIdProps } from "@hoc/withParamsId";
import useModal from "@hooks/useModal";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import Button from "@components/Button";

// function validateParams(props: { id?: string }): props is { id: string } {
//   return Boolean(props.id);
// }

export default function ErrandDetail({ id }: WithParamsIdProps) {
  const moveToApplyForm = usePush("/apply-form");
  const { isOpen, openModal, closeModal } = useModal();
  const { status, data } = useErrandDetail(id);
  confirmIsAppliable(id);

  const handleClickApply = async () => {
    const res = await confirmIsAppliable(id);
    if (res.canApply) {
      moveToApplyForm();
    } else {
      console.log("지원 불가 모달 띄우기");
    }
  };

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
            <Carousel showThumbs={false}>
              {data?.errand.imageUrls.map((image) => (
                <div className="errand-detail__image">
                  <img src={image.url} alt="dummy" />
                </div>
              ))}
            </Carousel>
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
                  <div>{convertToKRW(data?.errand.reward ?? 0)}</div>
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
        <Modal onClose={closeModal} childrenPosition="middle">
          <div
            style={{ background: "white", height: "5rem", fontSize: "20px" }}
          >
            <span onClick={closeModal}>아니오 </span>
            <span onClick={closeModal}> 네</span>
          </div>
        </Modal>
      )}
      <StickyFooter>
        <Button
          buttonType="contained"
          color="primary"
          fullWidth
          rounded
          onClick={handleClickApply}
        >
          일단 지원하기
        </Button>
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
        ${({ theme }) => theme.font("large", "regular")}
        margin-top: 3rem;

        & > div {
          display: flex;
          justify-content: space-between;

          & > div:nth-child(1) {
            color: ${({ theme }) => theme.color.grey4};
          }

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
        ${({ theme }) => theme.font("medium", "regular")}
        margin-top: 2.3rem;
        margin-bottom: 3.8rem;
      }
    }
  }
`;
