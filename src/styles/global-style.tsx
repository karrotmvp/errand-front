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
          color: #41474c;
          line-height: ${LINE_HEIGHT};
        }
        .flex {
          display: flex;
        }

        @font-face {
          font-family: "Cafe24Ssurround";
          src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2105_2@1.0/Cafe24Ssurround.woff")
            format("woff");
          font-weight: normal;
          font-style: normal;
        }
      `}
    />
  );
};
