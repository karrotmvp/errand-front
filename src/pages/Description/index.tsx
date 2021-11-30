import React from "react";
import styled from "@emotion/styled";
import CustomScreenHelmet from "@components/CustomScreenHelmet";

type DescriptionProps = {};

export default function Description({}: DescriptionProps) {
  return (
    <DescriptionWrapper>
      <CustomScreenHelmet title="크리스틴화이팅" />
    </DescriptionWrapper>
  );
}

const DescriptionWrapper = styled.div``;
