import React from "react";
import styled from "@emotion/styled";
import Profile from "@components/Profile";
import { SectionWrapper, StickyFooter, StickyPageWrpper } from "@styles/shared";
import { selectHelper, useHelperDetail } from "@api/errands";
import CustomScreenHelmet from "@components/CustomScreenHelmet";
import Modal from "@components/Modal";
import ModalInnerBox from "@components/ModalInnerBox";
import useModal from "@hooks/useModal";

type ResumeProps = {
  errandId: number;
  helperId: number;
};

export default function Resume({ errandId, helperId }: ResumeProps) {
  const { status, data: helperDetail } = useHelperDetail(errandId, helperId);
  const { isOpen, openModal, closeModal } = useModal();

  const handleClickRequest = async () => {
    if (helperDetail?.helper?.id) {
      const res = await selectHelper(1, helperDetail?.helper.id);
      closeModal();
    }
  };
  return (
    <StickyPageWrpper>
      <CustomScreenHelmet title="지원자 정보" />
      <ResumeWrapper>
        <SectionWrapper>
          <div className="section__title">
            <h3>프로필</h3>
          </div>
          <div className="section__content">
            {status !== "loading" && helperDetail && (
              <Profile {...helperDetail.helper} />
            )}
          </div>
        </SectionWrapper>
        <SectionWrapper>
          <div className="section__title">
            <h3>전화번호</h3>
          </div>
          <div className="section__subscribe">
            매칭되었을 때에만 전화번호가 공개돼요.
          </div>
          <div className="section__content">
            <input type="text" disabled value="01012345678" />
          </div>
        </SectionWrapper>
        <SectionWrapper>
          <div className="section__title">
            <h3>하고싶은 말</h3>
          </div>
          <div className="section__content">
            {status !== "loading" && <p>{helperDetail?.appeal}</p>}
          </div>
        </SectionWrapper>
      </ResumeWrapper>
      {isOpen && (
        <Modal onClose={closeModal}>
          <ModalInnerBox
            text="이 분에게 요청하면 입력하신 주소와 연락처가 전달돼요. 이 분에게 요청할까요?"
            leftText="아니오"
            rightText="네"
            leftCallback={closeModal}
            rightCallback={handleClickRequest}
          />
        </Modal>
      )}
      <StickyFooter>
        <button onClick={openModal}>이 분에게 요청하기</button>
      </StickyFooter>
    </StickyPageWrpper>
  );
}

const ResumeWrapper = styled.div`
  height: 100%;
  padding: 3rem 0;
  ${({ theme }) => theme.container}
`;
