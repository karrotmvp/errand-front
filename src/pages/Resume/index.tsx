import React from "react";
import styled from "@emotion/styled";
import Profile from "@components/Profile";
import { StickyFooter, StickyPageWrpper } from "@styles/shared";
import { useHelperDetail } from "@api/errands";
import CustomScreenHelmet from "@components/CustomScreenHelmet";
import Modal, { ModalInfoType } from "@components/Modal";
import useModal from "@hooks/useModal";
import Button from "@components/Button";
import { WithQueryParamsProps } from "@hoc/withQueryParams";

export default function Resume({ helpId }: WithQueryParamsProps) {
  const { status, data: resume } = useHelperDetail(helpId);
  const { isOpen, openModal, closeModal, innerMode } = useModal();

  const selectApplier = () => {};

  const modalInfo: ModalInfoType = {
    confirm: {
      text: "이 분에게 요청하면 입력하신 주소와 연락처가 전달돼요. 이 분에게 요청할까요?",
      no: <button onClick={closeModal}>아니오</button>,
      yes: <button onClick={selectApplier}>삭제하기</button>,
    },
  };

  // const handleClickRequest = async () => {
  //   if (resume?.helper?.id) {
  //     const res = await selectHelper(1, resume?.helper.id);
  //     console.log(res);
  //     closeModal();
  //   }
  // };

  return (
    <StickyPageWrpper>
      <CustomScreenHelmet title="지원자 정보" />
      <ResumeWrapper>
        {status !== "loading" && resume && <Profile {...resume.helper} />}
        <div className="resume__phone">
          <div>전화번호</div>
          <div>매칭 후 공개돼요.</div>
        </div>
        <div className="resume__appeal">{resume?.appeal}</div>
      </ResumeWrapper>
      {isOpen && innerMode && (
        <Modal {...{ closeModal, modalInfo, innerMode }} />
      )}
      <StickyFooter>
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
