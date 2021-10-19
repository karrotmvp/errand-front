import React from "react";
import styled from "@emotion/styled";
import { ScreenHelmet } from "@karrotframe/navigator";

type ApplyFormProps = {};

export default function ApplyForm({}: ApplyFormProps) {
  return (
    <ApplyFormWrapper>
      <ScreenHelmet title="지원하기" />
    </ApplyFormWrapper>
  );
}

const ApplyFormWrapper = styled.div``;
