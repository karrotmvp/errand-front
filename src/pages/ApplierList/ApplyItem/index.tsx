import React from "react";
import styled from "@emotion/styled";
import { User } from "@type/response";
import Profile from "@components/Profile";
import usePush from "@hooks/usePush";
import { Right } from "@assets/icon";

type ApplyItemProps = {
  helper: User;
};

export default function ApplyItem({ helper }: ApplyItemProps) {
  const { id, nickname, regionName, mannerPoint, profileImgUrl } = helper;
  const moveToUserDetail = usePush(`/appliers/${id}`);
  const appeal =
    "저 강아지를 진짜 좋아해요 ㅎㅎ 지금 집에서 한마리 키우고 있는데 같이 산책하면 좋을 것";
  return (
    <ApplyItemWrapper onClick={moveToUserDetail}>
      <div className="apply-item__profile">
        <Profile {...{ nickname, regionName, mannerPoint, profileImgUrl }} />
        <Right />
      </div>
      <div className="apply-item__appeal">{appeal}</div>
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
    }
  }

  & + & {
    margin-top: 0.1rem solid black;
  }
`;
