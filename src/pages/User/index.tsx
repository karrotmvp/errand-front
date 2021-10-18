import React from "react";
import styled from "@emotion/styled";
import { useParams } from "@karrotframe/navigator";

type UserProps = {};

export default function User({}: UserProps) {
  const params = useParams<{ userId: string }>();

  return <UserWrapper>테스트 유저 상세정보 {params.userId}</UserWrapper>;
}

const UserWrapper = styled.div``;
