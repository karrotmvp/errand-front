import React from "react";
import styled from "@emotion/styled";
import { ScreenHelmet } from "@karrotframe/navigator";

type AlarmProps = {};

export default function Alarm({}: AlarmProps) {
  return (
    <AlarmWrapper>
      <ScreenHelmet title="알람설정" />
    </AlarmWrapper>
  );
}

const AlarmWrapper = styled.div``;
