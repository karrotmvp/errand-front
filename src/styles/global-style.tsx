import { css, Global } from "@emotion/react";
import { reset } from "./reset";

const LINE_HEIGHT = 1.6;

export const GlobalStyle = () => {
  return (
    <Global
      styles={css`
        ${reset}

        #root,
        html,
        body {
          height: 100%;
          width: 100%;
        }

        html,
        body {
          font-size: 10px;
          font-family: Noto Sans KR, -apple-system, BlinkMacSystemFont,
            “Segoe UI”, Roboto, “Helvetica Neue”, Arial, “Noto Sans”, sans-serif,
            “Apple Color Emoji”, “Segoe UI Emoji”, “Segoe UI Symbol”,
            “Noto Color Emoji”;
          color: #333333;
          line-height: ${LINE_HEIGHT};
        }
        .flex {
          display: flex;
        }
      `}
    />
  );
};
