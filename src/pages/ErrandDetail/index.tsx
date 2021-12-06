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
import { checkSubScribe, getComparedTime } from "@utils/utils";
import {
  getRefinedFromData,
  modalInfoFlagType,
  specifyStatus,
} from "@utils/getRefinedFromData";
import { useNavigator } from "@karrotframe/navigator";
import { WithParamsProps } from "@hoc/withParams";
import { ErrandDetailResponseBody } from "@type/response";
import { useCallback, useEffect } from "react";
import { useCancelAPply } from "@api/help";
import Slider from "react-slick";
import CustomMixPanel from "@utils/mixpanel";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "@components/Toast/Index";
import LoaderScreen from "@components/LoaderScreen";
import ImageViewer from "@components/ImageViewer";
import useImageViewer from "@hooks/useImageViewer";

export default function ErrandDetail({ errandId }: WithParamsProps) {
  const { isOpenModal, openModal, closeModal, innerMode } = useModal();
  const {
    isOpenImageViewer,
    openImageViewer,
    closeImageViewer,
    initialSlideIndex,
  } = useImageViewer();

  const { status, data } = useErrandDetail(errandId);
  const {
    color,
    statusText,
    buttonText,
    buttonDisabled,
    modalInfoFlag = "noModal",
    buttonCallback,
  } = getRefinedFromData(data);
  const { push, replace, pop } = useNavigator();

  const mutationDeleteErrand = useDeleteErrand({
    onSuccess: () => {
      closeModal();
      if (localStorage.getItem("depth") === "0") {
        replace("/");
      } else {
        pop();
      }
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
      toast("지원이 불가능해요");
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
          clickTarget: "지원자 선택하기",
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
          clickTarget: "지원자 정보 보기",
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
            style={{ width: "100%" }}
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

  useEffect(() => {
    const countOfVisitToDetail = Number(
      localStorage.getItem("countOfVisitToDetail")
    );
    if (countOfVisitToDetail === 1) {
      checkSubScribe();
    }
    localStorage.setItem(
      "countOfVisitToDetail",
      String(countOfVisitToDetail + 1)
    );
  }, []);

  return (
    <StickyPageWrpper>
      <CustomScreenHelmet
        title="상세페이지"
        appendRight={
          modalInfo ? (
            <div
              style={{
                padding: "1rem 1.6rem 1rem 1rem",
              }}
            >
              <Meatballs
                onClick={() => {
                  openModal("list");
                }}
              />
            </div>
          ) : (
            ""
          )
        }
      />

      {status !== "loading" && data ? (
        <>
          <ErrandDetailWrapper>
            <div style={{ overflow: "hidden" }}>
              <Slider
                {...{
                  dots: true,
                  infinite: true,
                  speed: 500,
                  dotsClass: "slider__dots",
                }}
              >
                {data?.errand.images?.map((image, index) => (
                  <ImageItem
                    key={image.id}
                    imgUrl={image.url}
                    onClick={() => openImageViewer(index)}
                  />
                ))}
              </Slider>
            </div>
            <div className="errand-detail__contents">
              <div className="errand-detail__contents__profile">
                <div>
                  <img
                    src={data?.errand.customer.profileImageUrl}
                    alt="profile"
                  />
                </div>
                <span>{data?.errand.customer.nickname}</span>
              </div>
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
                  <div>전화번호</div>
                  {renderPrivateData(data, "customerPhoneNumber")}
                </div>
              </div>
              <p>{data?.errand.detail}</p>
            </div>
          </ErrandDetailWrapper>
          {isOpenModal && modalInfo && innerMode && (
            <Modal {...{ closeModal, modalInfo, innerMode }} />
          )}
          {isOpenImageViewer && (
            <ImageViewer
              items={data?.errand.images}
              closeImageViewer={closeImageViewer}
              initialSlideIndex={initialSlideIndex}
            />
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
        </>
      ) : (
        <LoaderScreen />
      )}
    </StickyPageWrpper>
  );
}

const ErrandDetailWrapper = styled.div`
  .errand-detail {
    &__image {
      width: 100%;
      padding-bottom: 90%;
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
      padding-bottom: 2.2rem;
      ${({ theme }) => theme.container}
      z-index: 10;
      h2 {
        ${({ theme }) => theme.font("large", "bold")}
      }
      &__profile {
        display: flex;
        align-items: center;
        ${({ theme }) => theme.font("large", "regular")}
        margin: 1rem 0;

        & > div {
          width: 3rem;
          height: 3rem;
          border-radius: 3rem;
          overflow: hidden;
          margin-right: 0.8rem;

          & > img {
            width: 100%;
          }
        }
      }
      &__title {
        ${({ theme }) => theme.font("xsmall", "regular")}
        color: ${({ theme }) => theme.color.grey4};
        margin-top: 0.5rem;

        display: flex;
        justify-content: space-between;

        & > div > span + span::before {
          content: " • ";
          margin: 0 0.5rem;
        }
      }

      &__info {
        ${({ theme }) => theme.font("large", "regular")}
        margin-top: 1rem;

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
          margin-top: 1rem;
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

type privateDataType = "customerPhoneNumber";

const renderPrivateData = (
  data: ErrandDetailResponseBody,
  target: privateDataType
) => {
  if (data.errand.customerPhoneNumber && target === "customerPhoneNumber") {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <div>{data.errand.customerPhoneNumber}</div>
        <CopyToClipboard
          text={data.errand.customerPhoneNumber ?? ""}
          onCopy={() => {
            toast("전화번호가 복사되었어요.");
          }}
        >
          <Copy style={{ marginLeft: "0.5rem" }} />
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

const ImageItem = styled.div<{ imgUrl: string }>`
  width: 100%;
  padding-bottom: 90%;
  background: ${({ imgUrl }) => `url(${imgUrl})`};
  background-size: cover;
`;
