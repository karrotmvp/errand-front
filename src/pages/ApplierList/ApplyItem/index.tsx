import React from "react";
import styled from "@emotion/styled";
import { User } from "@type/response";

type ApplyItemProps = {
  helper: User;
};

export default function ApplyItem({ helper }: ApplyItemProps) {
  const { nickname, regionName, mannerPoint, profileImgUrl } = helper;

  return (
    <ApplyItemWrapper>
      <div className="apply-item__thumbnail">
        <img src={profileImgUrl ?? ""} alt="profile" />
      </div>
      <div>
        <div></div>
        <div></div>
      </div>
    </ApplyItemWrapper>
  );
}

const ApplyItemWrapper = styled.div``;
