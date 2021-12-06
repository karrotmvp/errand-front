import React from "react";
import styled from "@emotion/styled";
import { Loader } from "@assets/icon";

export default function LoaderScreen() {
  return (
    <LoaderScreenWrapper>
      <Loader width={70} height={70} fill="#FF7E36" />
    </LoaderScreenWrapper>
  );
}

const LoaderScreenWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
