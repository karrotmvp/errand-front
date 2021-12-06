import { Close } from "@assets/icon";
// import { css } from "@emotion/css";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

type ToolTipProps = {
  text: string;
  verticalTail?: "up" | "down";
  horizontalTail?: "left" | "right";
  closeTooltip: () => void;
};

export default function ToolTip({
  text,
  verticalTail = "up",
  horizontalTail = "left",
  closeTooltip,
}: ToolTipProps) {
  return (
    <ToolTipWrapper verticalTail={verticalTail} horizontalTail={horizontalTail}>
      <div className="tooltip__inner">
        <div className="tooltip__box">
          <div className="text">{text}</div>
          <div className="tooltip__close">
            <Close onClick={closeTooltip} fill="white" stroke="white" />
          </div>
        </div>
      </div>
    </ToolTipWrapper>
  );
}

const ToolTipWrapper = styled.div<{
  verticalTail: string;
  horizontalTail: string;
}>`
  padding-left: 1rem;
  position: relative;
  z-index: 9;

  .tooltip__inner {
    position: absolute;
    bottom: ${({ verticalTail }) =>
      verticalTail === "up" ? "-7.5rem" : "2.5rem"};

    ${({ horizontalTail }) =>
      horizontalTail === "right"
        ? css`
            right: 0;
          `
        : ""}
    .tooltip__box {
      background: ${({ theme }) => theme.color.primary};
      color: white;
      padding: 1rem 1.4rem;
      border-radius: 0.8rem;

      display: flex;
      justify-content: space-between;
      align-items: center;

      .text {
        width: max-content;
        max-width: 20rem;
        font-size: 1.4rem;
        font-weight: 500;
      }

      .tooltip__close {
        & > svg {
          margin-left: 1.4rem;
        }
      }

      &::after {
        content: "";
        position: absolute;
        ${({ horizontalTail }) =>
          horizontalTail === "left"
            ? css`
                left: 5%;
              `
            : css`
                right: 5%;
              `}
        width: 0;
        height: 0;
        border: 20px solid transparent;

        ${({ theme, verticalTail }) =>
          verticalTail === "up"
            ? css`
                top: 0;
                border-bottom-color: ${theme.color.primary};
                border-top: 0;
                margin-top: -1rem;
              `
            : css`
                bottom: 0;
                border-top-color: ${theme.color.primary};
                border-bottom: 0;
                margin-bottom: -1rem;
              `};
      }
    }
  }
`;
