import React from "react";
import styled from "@emotion/styled";
import { ScreenHelmet } from "@karrotframe/navigator";
import usePush from "@hooks/usePush";

type ErrandDetailProps = {};

export default function ErrandDetail({}: ErrandDetailProps) {
  const moveToApplyForm = usePush("/apply-form");
  return (
    <ErrandDetailWrapper>
      <ScreenHelmet title="상세페이지" />
      <button onClick={moveToApplyForm}>지원하기</button>
    </ErrandDetailWrapper>
  );
}

const ErrandDetailWrapper = styled.div``;
