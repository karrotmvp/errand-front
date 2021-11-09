import React from "react";
import styled from "@emotion/styled";
import { ResumePreview } from "@type/response";
import Profile from "@components/Profile";
import usePush from "@hooks/usePush";
import { Right } from "@assets/icon";

type ApplyItemProps = {
  resumePreview: ResumePreview;
};

export default function ApplyItem({ resumePreview }: ApplyItemProps) {
  const {
    helpId,
    helper: { id, nickname, regionName, mannerTemp, profileImgUrl },
    appeal,
  } = resumePreview;
  const moveToResume = usePush(`/helps/${helpId}`);

  return (
    <ApplyItemWrapper onClick={moveToResume}>
      <div className="apply-item__profile">
        <Profile {...{ id, nickname, regionName, mannerTemp, profileImgUrl }} />
        <Right />
      </div>
      <div className="apply-item__appeal">
        <div>{appeal}</div>
      </div>
    </ApplyItemWrapper>
  );
}

const ApplyItemWrapper = styled.div`
  padding: 2.5rem;
  ${({ theme }) => theme.container}

  .apply-item {
    &__profile {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    &__appeal {
      ${({ theme }) => theme.font("medium", "regular")}
      margin-top: 2.3rem;
      border-radius: 0.8rem;
      background: ${({ theme }) => theme.color.grey8};
      padding: 2rem 3.2rem;

      & > div {
        height: 3.7em;
        line-height: 1.7;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        word-wrap: break-word;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
  }

  & + & {
    margin-top: 0.1rem solid black;
  }
`;
