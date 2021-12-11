import React from "react";
import styled from "@emotion/styled";
import Profile from "@components/Profile";
import { StickyFooter, StickyPageWrpper } from "@styles/shared";
import { useResume } from "@api/help";
import CustomScreenHelmet from "@components/CustomScreenHelmet";
import Modal, { ModalInfoType } from "@components/Modal";
import useModal from "@hooks/useModal";
import Button from "@components/Button";
import { WithParamsProps } from "@hoc/withParams";
import { useNavigator } from "@karrotframe/navigator";
import { useSelectHelper } from "@api/errands";
import CustomMixPanel from "@utils/mixpanel";
import ToolTip from "@components/ToolTip";
import { useTooltip } from "@hooks/useTooltip";
import CopyToClipboard from "react-copy-to-clipboard";
import { Copy } from "@assets/icon";
import { toast } from "@components/Toast/Index";

export default function Resume({ helpId }: WithParamsProps) {
  const { status, data: resume } = useResume(helpId);
  const { isOpenModal, openModal, closeModal, innerMode } = useModal();
  const [showTooltip, closeTooltip] = useTooltip("resume");
  const { pop } = useNavigator();
  const resumeStatus: ResumeStatus = specifyStatus(
    status,
    resume?.isMatched,
    resume?.isCustomer
  );
  const mutationSelectHelper = useSelectHelper({
    onSuccess: () => {
      pop().send(true);
      closeModal();
    },
    onError: () => {
      closeModal();
    },
  });
  const requestSelectHelper = () => {
    if (!resume) return;
    mutationSelectHelper.mutate({
      errandId: String(resume.errandId),
      helperId: resume.helper.id,
    });
  };

  const modalInfo: ModalInfoType = {
    confirm: {
      text: "이 분에게 요청하면 입력하신 연락처가 전달돼요. 이 분에게 요청할까요?",
      no: (
        <button
          onClick={() => {
            CustomMixPanel.track(CustomMixPanel.eventName.clickNoConfirm, {
              page: "지원내역",
              confirm: "헬퍼지정",
            });
            closeModal();
          }}
        >
          아니요
        </button>
      ),
      yes: <button onClick={requestSelectHelper}>네</button>,
    },
  };

  return (
    <StickyPageWrpper>
      <CustomScreenHelmet title="지원자 정보" />
      <ResumeWrapper>
        {status !== "loading" && resume && (
          <>
            <Profile {...resume.helper} />
            <div className="resume__phone">
              <div>
                전화번호
                {showTooltip && resumeStatus === "customer-match" && (
                  <ToolTip
                    text="공개된 번호로 지원자와 문자를 시작해 주세요!"
                    closeTooltip={closeTooltip}
                  />
                )}
              </div>
              {renderPhoneNumber(resume.phoneNumber)}
            </div>
            <div className="resume__appeal">
              <p>{resume?.appeal}</p>
            </div>
          </>
        )}
      </ResumeWrapper>
      {isOpenModal && innerMode && (
        <Modal {...{ closeModal, modalInfo, innerMode }} />
      )}
      <StickyFooter>
        {resumeStatus === "customer-apply" && (
          <Button
            buttonType="contained"
            size="small"
            color="primary"
            fullWidth
            rounded
            onClick={() => {
              CustomMixPanel.track(CustomMixPanel.eventName.clickCTA, {
                clickTarget: "이 분에게 요청하기",
                page: "지원내역",
              });
              openModal("confirm");
            }}
          >
            이 분에게 요청하기
          </Button>
        )}
      </StickyFooter>
    </StickyPageWrpper>
  );
}

const ResumeWrapper = styled.div`
  height: 100%;
  padding: 3rem 0;
  ${({ theme }) => theme.container}
  .resume {
    &__phone {
      ${({ theme }) => theme.font("large", "regular")}

      margin-top: 2.7rem;
      display: flex;
      justify-content: space-between;

      & > div:nth-of-type(1) {
        color: ${({ theme }) => theme.color.grey4};
      }
    }
    &__appeal {
      border-top: 0.1rem solid ${({ theme }) => theme.color.grey7};
      padding-top: 2rem;

      ${({ theme }) => theme.font("large", "regular")}
      margin-top: 1.3rem;
    }
  }
`;

type ResumeStatus =
  | "loading"
  | "customer-match"
  | "customer-apply"
  | "applier-match"
  | "applier-apply"
  | "none";

const specifyStatus = (
  status: string,
  isMatched?: boolean,
  isCustomer?: boolean
): ResumeStatus => {
  if (status !== "success") {
    return "loading";
  }
  if (isMatched && isCustomer) {
    return "customer-match";
  }
  if (!isMatched && isCustomer) {
    return "customer-apply";
  }
  if (isMatched && !isCustomer) {
    return "applier-match";
  }
  if (!isMatched && !isCustomer) {
    return "applier-apply";
  }
  return "none";
};

const renderPhoneNumber = (phoneNumber?: string) => {
  if (!phoneNumber) {
    return <div>매칭 시 공개돼요</div>;
  }

  return (
    <div
      style={{
        alignItems: "center",
        display: "flex",
      }}
    >
      <div>{phoneNumber}</div>
      <CopyToClipboard
        text={phoneNumber}
        onCopy={() => {
          toast("전화번호가 복사되었어요");
        }}
      >
        <Copy style={{ marginLeft: "0.5rem" }} />
      </CopyToClipboard>
    </div>
  );
};
