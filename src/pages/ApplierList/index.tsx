import React from "react";
import styled from "@emotion/styled";
import { ScreenHelmet } from "@karrotframe/navigator";
import ApplyItem from "./ApplyItem";
import { useHelperList } from "@api/errands";

export default function ApplierList() {
  const { status, data: helperList } = useHelperList();

  return (
    <>
      <ScreenHelmet title="지원자 목록" />
      <ApplyListWrapper>
        {status !== "loading" ? (
          helperList?.map((helper) => (
            <ApplyItem helper={helper} key={helper.id} />
          ))
        ) : (
          <div>로딩 중</div>
        )}
      </ApplyListWrapper>
    </>
  );
}

const ApplyListWrapper = styled.div``;
