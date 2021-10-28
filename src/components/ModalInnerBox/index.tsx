import React from "react";
import styled from "@emotion/styled";

interface ModalInnerBoxProps {
  text: string;
  leftText?: React.ReactNode;
  rightText?: React.ReactNode;
  leftCallback?: any;
  rightCallback?: any;
}

export default function ModalInnerBox({
  text,
  leftText,
  rightText,
  leftCallback,
  rightCallback,
}: ModalInnerBoxProps) {
  return (
    <ModalInnerBoxWrapper>
      <p className="modal-inner__text">{text}</p>
      <div className="modal-inner__footer">
        <div onClick={leftCallback}>{leftText}</div>
        <div onClick={rightCallback}>{rightText}</div>
      </div>
    </ModalInnerBoxWrapper>
  );
}

const ModalInnerBoxWrapper = styled.div`
  background: white;
  margin: 0 2.7rem;
  border-radius: 1rem;

  .modal-inner {
    &__text {
      ${({ theme }) => theme.font("medium", "regular")}
      text-align: center;
      padding: 2.1rem 1.8rem;
      white-space: pre-wrap;
    }
    &__footer {
      border-top: 1px solid ${({ theme }) => theme.color.grey6};
      display: flex;

      & > * {
        flex: 1;
        text-align: center;
        ${({ theme }) => theme.font("medium", "regular")}
        padding: 1.3rem 0;
      }

      & > * + * {
        border-left: 1px solid ${({ theme }) => theme.color.grey6};
      }
    }
  }
`;
