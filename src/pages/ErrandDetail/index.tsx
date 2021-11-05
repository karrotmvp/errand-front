import styled from "@emotion/styled";
import usePush from "@hooks/usePush";
import { StickyFooter, StickyPageWrpper } from "@styles/shared";
import {
  confirmIsAppliable,
  deleteMyErrand,
  useErrandDetail,
} from "@api/errands";
import CustomScreenHelmet from "@components/CustomScreenHelmet";
import { Meatballs } from "@assets/icon";
import { convertToKRW } from "@utils/convert";
import Modal, { ModalInfoType } from "@components/Modal";
import { WithParamsIdProps } from "@hoc/withParamsId";
import useModal from "@hooks/useModal";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Button from "@components/Button";
import { getComparedTime } from "@utils/utils";
import ToolTip from "@components/ToolTip";
import { useTooltip } from "@hooks/useTooltip";
import {
  getRefinedFromData,
  modalInfoFlagType,
} from "@utils/getRefinedFromData";
import { useNavigator } from "@karrotframe/navigator";

export default function ErrandDetail({ id }: WithParamsIdProps) {
  const { isOpen, openModal, closeModal, innerMode } = useModal();
  const { status, data } = useErrandDetail(Number(id));
  const [showTooltip, closeTooltip] = useTooltip();
  const {
    color,
    detailStatus,
    buttonText,
    buttonDisabled,
    modalInfoFlag = "noModal",
  } = getRefinedFromData(data);

  const { push } = useNavigator();
  const moveToApplyForm = usePush("/apply-form");
  const moveToHome = usePush("/");

  const deleteErrand = async () => {
    const res = await deleteMyErrand(id);
    res && moveToHome();
  };

  const applyToErrand = async () => {
    const res = await confirmIsAppliable(id);
    if (res.canApply) {
      moveToApplyForm();
    } else {
      console.log("지원 불가 모달 띄우기");
    }
  };

  const cancelApply = () => {};

  const moveToApplierList = () => {};
  const moveToResume = (id: number) => {
    push(`/appliers/:${id}`);
  };

  const handleClickButton = (path?: string) => {
    //TODO
    openModal("confirm");
    path && push(path);
  };

  const getModalInfo = (flag: modalInfoFlagType) => {
    switch (flag) {
      case "isMyErrand":
        return modalInfoOfIsMyErrand;
      case "isApplier":
        return modalInfoOfIsApplier;
      case "resume":
        return modalInfoOfResume;
      case "isHelper":
        return modalInfoOfHelper;
      default:
        return null;
    }
  };

  const modalInfoOfIsMyErrand: ModalInfoType = {
    list: [
      {
        text: (
          <button
            onClick={() => {
              openModal("confirm");
            }}
          >
            삭제
          </button>
        ),
        confirm: {
          text: "삭제하시겠습니까?",
          no: <button onClick={closeModal}>아니오</button>,
          yes: <button onClick={deleteErrand}>삭제하기</button>,
        },
      },
    ],
  };

  // 내가 지원한 글, 모집중일 때
  const modalInfoOfIsApplier: ModalInfoType = {
    list: [
      {
        text: <button onClick={() => {}}>지원취소</button>,
        confirm: {
          text: "지원을 취소하시겠습니까?",
          no: <button onClick={() => {}}>뒤로가기</button>,
          yes: <button onClick={() => {}}>취소하기</button>,
        },
      },
      {
        text: <button onClick={() => {}}>지원목록 보기</button>,
      },
    ],
  };

  // 헬퍼 / 모집 끝난 지원자
  const modalInfoOfResume: ModalInfoType = {
    list: [
      {
        text: <button onClick={() => {}}>지원목록 보기</button>,
      },
    ],
  };

  // 헬퍼 상태에서 완료 버튼 모달 정보
  const modalInfoOfHelper: ModalInfoType = {
    list: [
      {
        text: <button onClick={() => {}}>지원목록 보기</button>,
      },
    ],
    confirm: {
      text: "심부름 완료?",
      no: <button onClick={closeModal}>뒤로가기</button>,
      yes: <button onClick={cancelApply}>완료함</button>,
    },
  };

  const modalInfo = getModalInfo(modalInfoFlag);

  console.log(isOpen, modalInfo, innerMode);

  return (
    <StickyPageWrpper>
      <CustomScreenHelmet
        title="상세페이지"
        appendRight={
          modalInfo ? (
            <Meatballs
              onClick={() => {
                openModal("list");
              }}
            />
          ) : (
            ""
          )
        }
      />
      <ErrandDetailWrapper>
        {status !== "loading" && data ? (
          <>
            <Carousel showThumbs={false}>
              {data?.errand.images?.map((image) => (
                <div className="errand-detail__image">
                  <img src={image.url} alt="dummy" />
                </div>
              ))}
            </Carousel>
            <div className="errand-detail__contents">
              <div className="errand-detail__contents__title">
                <div>
                  <span>{data?.errand.category.name}</span>
                  <span>{data?.errand.region.name}</span>
                  <span>
                    {getComparedTime(
                      new Date(),
                      new Date(...data?.errand.createdAt)
                    )}
                  </span>
                </div>
                {renderStatus(color, detailStatus)}
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
                  <div>
                    전화번호
                    {showTooltip && (
                      <ToolTip
                        text="요청장소와 전화번호는 매칭된 상대에게만 보여요."
                        closeTooltip={closeTooltip}
                      />
                    )}
                  </div>
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
      {isOpen && modalInfo && innerMode && (
        <Modal {...{ closeModal, modalInfo, innerMode }} />
      )}
      <StickyFooter>
        <Button
          buttonType="contained"
          color="primary"
          fullWidth
          rounded
          onClick={() => {
            handleClickButton();
          }}
          disabled={buttonDisabled}
        >
          {buttonText}
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
    &__status {
      &.PRIMARY {
        color: ${({ theme }) => theme.color.primary};
      }
      &.GREY {
        color: ${({ theme }) => theme.color.grey4};
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

          & > div:nth-of-type(1) {
            color: ${({ theme }) => theme.color.grey4};
          }

          & > div:nth-of-type(2) {
            max-width: 23.3rem;
            text-align: right;
          }
        }

        & > div + div {
          margin-top: 2.4rem;
        }
      }

      & > p {
        ${({ theme }) => theme.font("medium", "regular")}
        margin-top: 2.3rem;
        margin-bottom: 3.8rem;
      }
    }
  }
`;

const renderStatus = (color: string, detailStatus: string) => {
  return <div className={`errand-detail__status ${color}`}>{detailStatus}</div>;
};
