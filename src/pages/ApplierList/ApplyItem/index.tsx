import React from "react";
import styled from "@emotion/styled";
import { ResumePreview } from "@type/response";
import Profile from "@components/Profile";
import { Right } from "@assets/icon";
import { useNavigator } from "@karrotframe/navigator";
import CustomMixPanel from "@utils/mixpanel";

type ApplyItemProps = {
  resumePreview: ResumePreview;
};

export default function ApplyItem({ resumePreview }: ApplyItemProps) {
  const {
    helpId,
    helper: { id, nickname, regionName, mannerTemp, profileImageUrl },
    appeal,
  } = resumePreview;
  const { push, replace } = useNavigator();
  const moveToResume = async () => {
    const isSelectHelper = await push(`/helps/${helpId}`);
    if (isSelectHelper) {
      replace(`/helps/${helpId}`);
    }
  };
  return (
    <ApplyItemWrapper
      onClick={() => {
        CustomMixPanel.track(CustomMixPanel.eventName.clickETC, {
          page: "지원자 목록",
          clickTarget: "지원자 아이템",
        });
        moveToResume();
      }}
    >
      <div className="apply-item__profile">
        <Profile
          {...{ id, nickname, regionName, mannerTemp, profileImageUrl }}
        />
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
      ${({ theme }) => theme.font("large", "regular")}
      margin-top: 2.3rem;
      border-radius: 0.8rem;
      background: ${({ theme }) => theme.color.grey10};
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

  &:not(:first-child) {
    margin-top: 0.1rem solid black;
  }
`;
