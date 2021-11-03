import React from "react";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

type LoaderProps = {
  children: React.ReactNode;
};

export default function Loader({ children }: LoaderProps) {
  return (
    <LoaderWrapper>
      <Temp />
    </LoaderWrapper>
  );
}

const rotate = keyframes`
  0% {
    transform: rotate(0deg)
  }
  100% {
    transform: rotate(360deg)
  }
`;

const LoaderWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 7rem;
  height: 7rem;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: transparent;
    border: 0.5rem solid transparent;
    border-top: 0.5rem solid ${({ theme }) => theme.color.primary};
    border-radius: 7rem;
    animation: ${rotate} 1.5s infinite linear;
  }
`;

const Temp = styled.div`
  width: 80%;
  height: 80%;
  background: ${({ theme }) => theme.color.primary};
  border-radius: 7rem;
`;
