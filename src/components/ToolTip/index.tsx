import { Close } from "@assets/icon";
import styled from "@emotion/styled";

interface ToolTipProps {
  text: string;
  tail?: "up" | "down";
  closeTooltip: () => void;
}

export default function ToolTip({
  text,
  tail = "up",
  closeTooltip,
}: ToolTipProps) {
  return (
    <ToolTipWrapper tail={tail}>
      <div className="tooltip__inner">
        <div className="tooltip__box" onClick={closeTooltip}>
          <p>{text}</p>
          <div className="tooltip__close">
            <Close onClick={closeTooltip} />
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
    bottom: -8rem;
    .tooltip__box {
      background: ${({ theme }) => theme.color.primary};
      color: white;
      padding: 1.2rem 1.4rem;
      width: 30rem;
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
        top: 0;
        left: 10%;
        width: 0;
        height: 0;
        border: 1rem solid transparent;
        border-bottom-color: ${({ theme }) => theme.color.primary};
        border-top: 0;
        margin-left: -1rem;
        margin-top: -1rem;
      }
    }
  }
`;
