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
import { Copy, Meatballs } from "@assets/icon";
import { convertToKRW } from "@utils/convert";
import Modal, { ModalInfoType } from "@components/Modal";
import useModal from "@hooks/useModal";
import Button from "@components/Button";
import { getComparedTime } from "@utils/utils";
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
import CustomMixPanel from "@utils/mixpanel";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "@components/Toast/Index";

export default function ErrandDetail({ errandId }: WithParamsProps) {
  const { isOpen, openModal, closeModal, innerMode } = useModal();
  const { status, data } = useErrandDetail(errandId);
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
      toast("심부름이 삭제되었어요");
    },
    onError: () => {
      closeModal();
    },
  });
  const mutationCancelApply = useCancelAPply({
    onSuccess: () => {
      closeModal();
      toast("지원이 취소되었어요");
    },
    onError: () => {
      closeModal();
    },
  });
  const mutationCompleteErrand = useCompleteErrand({
    onSuccess: () => {
      closeModal();
      toast("🎉 수고했어요 🎉");
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
        CustomMixPanel.track(CustomMixPanel.eventName.clickCTA, {
          page: "심부름 상세",
          clickTarget: "지원자 보기",
        });
        moveToAppliers();
        break;
      case "moveToApplyForm":
        CustomMixPanel.track(CustomMixPanel.eventName.clickCTA, {
          page: "심부름 상세",
          clickTarget: "지원하기",
        });
        applyToErrand();
        break;
      case "moveToResume":
        CustomMixPanel.track(CustomMixPanel.eventName.clickCTA, {
          page: "심부름 상세",
          clickTarget: "지원내역 보기",
        });
        moveToResume();
        break;
      case "openConfirmModal":
        CustomMixPanel.track(CustomMixPanel.eventName.clickCTA, {
          page: "심부름 상세",
          clickTarget: "심부름 완료",
        });
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
          no: (
            <button
              onClick={() => {
                CustomMixPanel.track(CustomMixPanel.eventName.clickNoConfirm, {
                  page: "심부름 상세",
                  confirm: "삭제하기",
                });
                closeModal();
              }}
            >
              아니오
            </button>
          ),
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
          no: (
            <button
              onClick={() => {
                CustomMixPanel.track(CustomMixPanel.eventName.clickNoConfirm, {
                  page: "심부름 상세",
                  confirm: "지원취소",
                });
                closeModal();
              }}
            >
              뒤로가기
            </button>
          ),
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
      no: (
        <button
          onClick={() => {
            CustomMixPanel.track(CustomMixPanel.eventName.clickNoConfirm, {
              page: "심부름 상세",
              confirm: "심부름 완료",
            });
            closeModal();
          }}
        >
          아니요
        </button>
      ),
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
            <div style={{ overflow: "hidden" }}>
              <Slider
                {...{
                  dots: true,
                  infinite: true,
                  speed: 500,
                  dotsClass: "errand-detail__dots",
                }}
              >
                {data?.errand.images?.map((image) => (
                  <div className="errand-detail__image" key={image.id}>
                    <img src={image.url} alt="" />
                  </div>
                ))}
              </Slider>
            </div>
            <div className="errand-detail__contents">
              <div className="errand-detail__contents__title">
                <div>
                  <span>{data?.errand.category.name}</span>
                  <span>{data?.errand.region.name}</span>
                  <span>
                    {getComparedTime(
                      new Date(),
                      new Date(data?.errand.createdAt)
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
                  <div>심부름 장소</div>
                  {renderPrivateData(data, "detailAddress")}
                </div>
                <div>
                  <div>전화번호</div>
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
          size="small"
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
        height: 2rem;
        margin: 0 5px;
        padding: 0;
        cursor: pointer;
        & > button {
          font-size: 0;
          line-height: 0;
          display: block;
          width: 2rem;
          height: 2rem;
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
            font-size: 0.6rem;
            line-height: 2rem;

            position: absolute;
            top: 0;
            left: 0;
            width: 2rem;
            height: 2rem;

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
      height: 0;
      padding-bottom: 90%;
      /* height: 30rem; */
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
        ${({ theme }) => theme.font("xsmall", "regular")}
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
        border-top: 0.1rem solid ${({ theme }) => theme.color.grey7};
        padding-top: 2rem;
        ${({ theme }) => theme.font("large", "regular")};
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
    return (
      <div
        style={{
          display: "flex",
        }}
      >
        <div>{data.errand.customerPhoneNumber}</div>
        <CopyToClipboard
          text={data.errand.customerPhoneNumber ?? ""}
          onCopy={() => {
            toast("전화번호가 복사되었어요.");
          }}
        >
          <span
            style={{
              marginLeft: "0.5rem",
            }}
          >
            <Copy />
          </span>
        </CopyToClipboard>
      </div>
    );
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
