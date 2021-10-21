import React from "react";
import styled from "@emotion/styled";
import ApplyItem from "./ApplyItem";
import { useHelperList } from "@api/errands";
import CustomScreenHelmet from "@components/CustomScreenHelmet";

export default function ApplierList() {
  const { status, data: helperList } = useHelperList();

  return (
    <>
      <CustomScreenHelmet title="지원자 목록" />
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
