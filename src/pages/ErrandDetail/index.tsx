import styled from "@emotion/styled";
import usePush from "@hooks/usePush";
import { StickyFooter, StickyPageWrpper } from "@styles/shared";
import {
  confirmIsAppliable,
  useCompleteErrand,
  useDeleteErrand,
  useErrandDetail,
} from "@api/errands";
import CustomScreenHelmet from "@components/CustomScreenHelmet";
import { Meatballs } from "@assets/icon";
import { convertToKRW } from "@utils/convert";
import Modal, { ModalInfoType } from "@components/Modal";
import useModal from "@hooks/useModal";
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
import { ErrandDetailResponseBody } from "@type/response";
import { useCallback } from "react";
import { useCancelAPply } from "@api/help";
import Slider from "react-slick";

export default function ErrandDetail({ errandId }: WithParamsProps) {
  const { isOpen, openModal, closeModal, innerMode } = useModal();
  const { status, data } = useErrandDetail(errandId);
  const [showTooltip, closeTooltip] = useTooltip("detail");
  const {
    color,
    statusText,
    buttonText,
    buttonDisabled,
    modalInfoFlag = "noModal",
    buttonCallback,
  } = getRefinedFromData(data);
  const { push, replace } = useNavigator();

  const mutationDeleteErrand = useDeleteErrand({
    onSuccess: () => {
      closeModal();
      replace("/");
    },
    onError: () => {
      closeModal();
    },
  });
  const mutationCancelApply = useCancelAPply({
    onSuccess: () => {
      closeModal();
    },
    onError: () => {
      closeModal();
    },
  });
  const mutationCompleteErrand = useCompleteErrand({
    onSuccess: () => {
      closeModal();
    },
    onError: () => {
      closeModal();
    },
  });

  const moveToApplyForm = usePush(`/apply-form?errandId=${errandId}`);
  const moveToResume = useCallback(() => {
    push(`/helps/${data?.helpId}`);
  }, [data, push]);
  const moveToAppliers = () => {
    push(`/errands/${errandId}/appliers`);
  };

  const requestDeleteMyErrand = () => {
    if (!errandId) return;
    mutationDeleteErrand.mutate(errandId);
  };
  const requestCancelApply = () => {
    if (!data) return;
    mutationCancelApply.mutate(String(data?.helpId));
  };
  const requestCompleteErrand = () => {
    if (!errandId) return;
    mutationCompleteErrand.mutate(errandId);
  };

  const applyToErrand = async () => {
    const res = await confirmIsAppliable(errandId);
    if (res.canApply) {
      moveToApplyForm();
    } else {
      console.log("지원 불가");
    }
  };

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
            <Slider
              {...{
                dots: true,
                infinite: true,
                speed: 500,
                dotsClass: "errand-detail__dots",
              }}
            >
              {data?.errand.images?.map((image) => (
                <div className="errand-detail__image">
                  <img src={image.url} alt="dummy" />
                </div>
              ))}
            </Slider>
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
    &__dots {
      position: absolute;
      bottom: 2.4rem;
      display: block;
      width: 100%;
      padding: 0;
      margin: 0;
      list-style: none;
      text-align: center;
      z-index: 99;

      & > li {
        position: relative;
        display: inline-block;
        width: 10px;
        height: 20px;
        margin: 0 5px;
        padding: 0;
        cursor: pointer;
        & > button {
          font-size: 0;
          line-height: 0;
          display: block;
          width: 20px;
          height: 20px;
          padding: 5px;
          cursor: pointer;
          color: transparent;
          border: 0;
          outline: none;
          background: transparent;

          &:hover,
          &:focus {
            outline: none;
          }
          &:hover:before,
          &:focus:before {
            opacity: 1;
          }
          &:before {
            font-family: "slick";
            font-size: 6px;
            line-height: 20px;

            position: absolute;
            top: 0;
            left: 0;

            width: 20px;
            height: 20px;

            content: "•";
            text-align: center;

            opacity: 0.5;
            color: white;

            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
        }
        &.slick-active button:before {
          opacity: 1;
          color: white;
        }
      }
    }

    &__image {
      width: 100%;
      height: 30rem;
      overflow: hidden;

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
