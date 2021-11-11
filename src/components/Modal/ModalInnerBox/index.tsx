import React from "react";
import styled from "@emotion/styled";
import { innerModeType } from "..";

type ModalInnerBoxProps = {
  innerMode: innerModeType;
  children: React.ReactNode;
  closeModal: () => void;
};

export default function ModalInnerBox({
  innerMode,
  children,
  closeModal,
}: ModalInnerBoxProps) {
  return (
    <ModalInnerBoxWrapper innerMode={innerMode}>
      <div className="modal-inner">{children}</div>
    </ModalInnerBoxWrapper>
  );
}

const ModalInnerBoxWrapper = styled.div<{ innerMode: innerModeType }>`
  ${({ theme }) => theme.container}
  box-sizing: border-box;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  overflow: auto;
  outline: 0;

  display: flex;
  flex-direction: column;
  justify-content: ${({ innerMode }) => {
    switch (innerMode) {
      case "confirm":
        return "center";
      case "list":
        return "flex-end";
      default:
        return "";
    }
  }};
`;
