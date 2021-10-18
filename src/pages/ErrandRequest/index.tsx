import React from "react";
import styled from "@emotion/styled";
import { ScreenHelmet } from "@karrotframe/navigator";

type ErrandRequestProps = {};

export default function ErrandRequest({}: ErrandRequestProps) {
  return (
    <ErrandRequestWrapper>
      <ScreenHelmet title="요청하기" />
    </ErrandRequestWrapper>
  );
}

const ErrandRequestWrapper = styled.div``;
