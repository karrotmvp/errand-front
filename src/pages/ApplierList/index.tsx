import React from "react";
import styled from "@emotion/styled";
import ApplyItem from "./ApplyItem";
import { useHelperList } from "@api/errands";
import CustomScreenHelmet from "@components/CustomScreenHelmet";
import { WithParamsProps } from "@hoc/withParams";

export default function ApplierList({ errandId }: WithParamsProps) {
  const { status, data: helperList } = useHelperList(errandId);

  return (
    <>
      <CustomScreenHelmet title="지원자 목록" />
      <ApplyListWrapper>
        {status !== "loading" ? (
          helperList?.map((helper) => (
            <ApplyItem helper={helper} key={helper.helpId} />
          ))
        ) : (
          <div>로딩 중</div>
        )}
      </ApplyListWrapper>
    </>
  );
}

const ApplyListWrapper = styled.div``;
