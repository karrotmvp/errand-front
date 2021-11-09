import styled from "@emotion/styled";
import usePush from "@hooks/usePush";
import { StickyFooter, StickyPageWrpper } from "@styles/shared";
import {
  confirmIsAppliable,
  deleteMyErrand,
  finishErrand,
  useErrandDetail,
} from "@api/errands";
import CustomScreenHelmet from "@components/CustomScreenHelmet";
import { Meatballs } from "@assets/icon";
import { convertToKRW } from "@utils/convert";
import Modal, { ModalInfoType } from "@components/Modal";
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
  specifyStatus,
} from "@utils/getRefinedFromData";
import { useNavigator } from "@karrotframe/navigator";
import { WithParamsProps } from "@hoc/withParams";
import { cancelApply } from "@api/help";
import { ErrandDetailResponseBody } from "@type/response";
import { useCallback } from "react";

export default function ErrandDetail({ errandId }: WithParamsProps) {
  const { isOpen, openModal, closeModal, innerMode } = useModal();
  const { status, data, refetch } = useErrandDetail(errandId);
  const [showTooltip, closeTooltip] = useTooltip();
  const {
    color,
    statusText,
    buttonText,
    buttonDisabled,
    modalInfoFlag = "noModal",
    buttonCallback,
  } = getRefinedFromData(data);
  const { push } = useNavigator();

  const moveToHome = usePush("/");
  const moveToApplyForm = usePush(`/apply-form?errandId=${errandId}`);
  const moveToResume = useCallback(() => {
    push(`/helps/${data?.helpId}`);
  }, [data, push]);
  const moveToAppliers = () => {
    push(`/errands/${errandId}/appliers`);
  };

  const requestDeleteMyErrand = async () => {
    const status = await deleteMyErrand(errandId);
    if (status !== "OK") {
      push("/404");
    }
    closeModal();
    moveToHome();
  };
  const applyToErrand = async () => {
    const res = await confirmIsAppliable(errandId);
    if (res.canApply) {
      moveToApplyForm();
    } else {
      console.log("지원 불가");
    }
  };
  const requestCancelApply = useCallback(async () => {
    if (!data) return;
    const status = await cancelApply(String(data?.helpId));

    status === "OK" ? moveToHome() : push("/404");
    closeModal();
  }, [data, closeModal, moveToHome, push]);
  const requestCompleteErrand = useCallback(async () => {
    if (!errandId) return;
    const status = await finishErrand(errandId);
    status === "OK" ? refetch() : push("/404");
    closeModal();
  }, [errandId, push, refetch, closeModal]);

  const handleClickButton = () => {
    if (buttonDisabled) {
      return;
    }
    switch (buttonCallback) {
      case "moveToAppliers":
        moveToAppliers();
        break;
      case "moveToApplyForm":
        applyToErrand();
        break;
      case "moveToResume":
        moveToResume();
        break;
      case "openConfirmModal":
        openModal("confirm");
        break;
      default:
        break;
    }
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
        text: "삭제",
        confirm: {
          text: "삭제하시겠습니까?",
          no: <button onClick={closeModal}>아니오</button>,
          yes: <button onClick={requestDeleteMyErrand}>삭제하기</button>,
        },
      },
    ],
  };

  // 내가 지원한 글, 모집중일 때
  const modalInfoOfIsApplier: ModalInfoType = {
    list: [
      {
        text: "지원취소",
        confirm: {
          text: "지원을 취소하시겠습니까?",
          no: <button onClick={closeModal}>뒤로가기</button>,
          yes: <button onClick={requestCancelApply}>취소하기</button>,
        },
      },
      {
        text: (
          <button
            onClick={() => {
              closeModal();
              moveToResume();
            }}
          >
            지원내역 보기
          </button>
        ),
      },
    ],
  };

  // 헬퍼 / 모집 끝난 지원자
  const modalInfoOfResume: ModalInfoType = {
    list: [
      {
        text: (
          <button
            onClick={() => {
              closeModal();
              moveToResume();
            }}
          >
            지원내역 보기
          </button>
        ),
      },
    ],
  };

  // 헬퍼 상태에서 완료 버튼 모달 정보
  const modalInfoOfHelper: ModalInfoType = {
    list: [
      {
        text: (
          <button
            onClick={() => {
              closeModal();
              moveToResume();
            }}
          >
            지원내역 보기
          </button>
        ),
      },
    ],
    confirm: {
      text: "심부름을 완료했나요?",
      no: <button onClick={closeModal}>아니요</button>,
      yes: <button onClick={requestCompleteErrand}>완료했어요</button>,
    },
  };

  const modalInfo = getModalInfo(modalInfoFlag);

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
                {renderStatus(color, statusText)}
              </div>
              <div className="errand-detail__contents__info">
                <div>
                  <div>심부름 금액</div>
                  <div>{convertToKRW(data?.errand.reward ?? 0)}</div>
                </div>
                <div>
                  <div>요청장소</div>
                  {renderPrivateData(data, "detailAddress")}
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
                  {renderPrivateData(data, "customerPhoneNumber")}
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
type privateDataType = "detailAddress" | "customerPhoneNumber";
const renderPrivateData = (
  data: ErrandDetailResponseBody,
  target: privateDataType
) => {
  if (data.errand.detailAddress && target === "detailAddress") {
    return <div>{data.errand.detailAddress}</div>;
  }
  if (data.errand.customerPhoneNumber && target === "customerPhoneNumber") {
    return <div>{data.errand.customerPhoneNumber}</div>;
  }

  if (
    specifyStatus(data) !== "isMyErrand" &&
    data.errand.status === "COMPLETE"
  ) {
    return <div>심부름이 완료되었어요</div>;
  }

  return <div>매칭 시 공개돼요</div>;
};

const renderStatus = (color: string, detailStatus: string) => {
  return <div className={`errand-detail__status ${color}`}>{detailStatus}</div>;
};
