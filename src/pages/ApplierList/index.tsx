import React from "react";
import styled from "@emotion/styled";
import ApplyItem from "./ApplyItem";
import { useHelperList } from "@api/errands";
import CustomScreenHelmet from "@components/CustomScreenHelmet";
import { WithParamsProps } from "@hoc/withParams";

export default function ApplierList({ errandId }: WithParamsProps) {
  const { status, data: resumePreviews } = useHelperList(errandId);

  return (
    <>
      <CustomScreenHelmet title="지원자 목록" />
      <ApplyListWrapper>
        {status !== "loading" ? (
          resumePreviews?.map((resumePreview) => (
            <ApplyItem
              resumePreview={resumePreview}
              key={resumePreview.helpId}
            />
          ))
        ) : (
          <div>로딩 중</div>
        )}
      </ApplyListWrapper>
    </>
  );
}

const ApplyListWrapper = styled.div``;
