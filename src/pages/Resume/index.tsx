import React from "react";
import styled from "@emotion/styled";
import Profile from "@components/Profile";
import { SectionWrapper, StickyFooter, StickyPageWrpper } from "@styles/shared";
import { useHelperDetail } from "@api/errands";
import CustomScreenHelmet from "@components/CustomScreenHelmet";

export default function Resume() {
  const { status, data: helperDetail } = useHelperDetail(1, 1);

  const handleClick = () => {};
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
      <StickyFooter>
        <button onClick={handleClick}>이 분에게 요청하기</button>
      </StickyFooter>
    </StickyPageWrpper>
  );
}

const ResumeWrapper = styled.div`
  height: 100%;
  padding: 3rem 0;
  ${({ theme }) => theme.container}
`;
