import React from "react";
import styled from "@emotion/styled";
import { ScreenHelmet } from "@karrotframe/navigator";

// type ResumeProps = {};

export default function Resume() {
  return (
    <ResumeWrapper>
      <ScreenHelmet title="지원자 정보" />
    </ResumeWrapper>
  );
}

const ResumeWrapper = styled.div``;
