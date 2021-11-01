import React from "react";
import styled from "@emotion/styled";
import { BoxWrapper } from "../ImageBox";
import { Plus } from "@assets/icon";

interface ImageAppenderProps {
  children: React.ReactNode;
}

export default function ImageAppender({ children }: ImageAppenderProps) {
  return (
    <ImageAppenderWrapper>
      <label htmlFor="input__file">
        <Plus />
      </label>
      {children}
    </ImageAppenderWrapper>
  );
}

const ImageAppenderWrapper = styled(BoxWrapper)`
  border: 0.1rem solid ${({ theme }) => theme.color.grey6};
  height: 7rem;
  & > svg {
    stroke: ${({ theme }) => theme.color.grey6};
  }
`;
