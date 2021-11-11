import React from "react";
import styled from "@emotion/styled";
import Profile from "@components/Profile";
import { StickyFooter, StickyPageWrpper } from "@styles/shared";
import { useResume } from "@api/help";
import CustomScreenHelmet from "@components/CustomScreenHelmet";
import Modal, { ModalInfoType } from "@components/Modal";
import useModal from "@hooks/useModal";
import Button from "@components/Button";
import ToolTip from "@components/ToolTip";
import { useTooltip } from "@hooks/useTooltip";
import { WithParamsProps } from "@hoc/withParams";
import { useNavigator } from "@karrotframe/navigator";
import { useSelectHelper } from "@api/errands";

export default function Resume({ helpId }: WithParamsProps) {
  const { status, data: resume } = useResume(helpId);
  const { isOpen, openModal, closeModal, innerMode } = useModal();
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
      text: "이 분에게 요청하면 입력하신 주소와 연락처가 전달돼요. 이 분에게 요청할까요?",
      no: <button onClick={closeModal}>아니요</button>,
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
                    text="전화번호가 공개되었어요."
                    closeTooltip={closeTooltip}
                  />
                )}
              </div>
              <div>{renderPhoneNumber(resume.phoneNumber)}</div>
            </div>
            <div className="resume__appeal">{resume?.appeal}</div>
          </>
        )}
      </ResumeWrapper>
      {isOpen && innerMode && (
        <Modal {...{ closeModal, modalInfo, innerMode }} />
      )}
      <StickyFooter>
        {resumeStatus === "customer-apply" && (
          <Button
            buttonType="contained"
            color="primary"
            fullWidth
            rounded
            onClick={() => {
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
    return "매칭 시 공개돼요";
  }

  return phoneNumber;
};
