import React from "react";
import styled from "@emotion/styled";
import { User } from "@type/response";
import Profile from "@components/Profile";
import usePush from "@hooks/usePush";

type ApplyItemProps = {
  helper: User;
};

export default function ApplyItem({ helper }: ApplyItemProps) {
  const { id, nickname, regionName, mannerPoint, profileImgUrl } = helper;
  const moveTo = usePush(`users/${id}`);

  return (
    <ApplyItemWrapper onClick={moveTo}>
      <Profile {...{ nickname, regionName, mannerPoint, profileImgUrl }} />
      {">"}
    </ApplyItemWrapper>
  );
}

const ApplyItemWrapper = styled.div`
  padding: 2.5rem;
  ${({ theme }) => theme.container}
  display: flex;
  align-items: center;
  justify-content: space-between;
  & + & {
    margin-top: 0.1rem solid black;
  }
`;
