import { Close } from "@assets/icon";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

type ToolTipProps = {
  text: string;
  tail?: "up" | "down";
  closeTooltip: () => void;
};

export default function ToolTip({
  text,
  tail = "up",
  closeTooltip,
}: ToolTipProps) {
  return (
    <ToolTipWrapper tail={tail}>
      <div className="tooltip__inner">
        <div className="tooltip__box">
          <p>{text}</p>
          <div className="tooltip__close">
            <Close onClick={closeTooltip} fill="white" stroke="white" />
          </div>
        </div>
      </div>
    </ToolTipWrapper>
  );
}

const ToolTipWrapper = styled.div<{ tail: string }>`
  position: relative;
  z-index: 99;
  .tooltip__inner {
    position: absolute;
    bottom: ${({ tail }) => (tail === "up" ? "-8rem" : "2.5rem")};
    .tooltip__box {
      background: ${({ theme }) => theme.color.primary};
      color: white;
      width: 30.6rem;
      padding: 1.2rem 1.4rem;
      border-radius: 0.8rem;

      display: flex;
      justify-content: space-between;

      p {
        font-size: 1.4rem;
        font-weight: 500;
      }

      .tooltip__close {
        margin-left: 2.8rem;
      }

      &::after {
        content: "";
        position: absolute;
        left: 10%;
        width: 0;
        height: 0;
        border: 20px solid transparent;
        margin-left: -20px;
        ${({ theme, tail }) =>
          tail === "up"
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
              `}
      }
    }
  }
`;
