import { css, Global } from "@emotion/react";
import { reset } from "./reset";

export const GlobalStyle = () => {
  return (
    <Global
      styles={css`
        ${reset}

        body {
          font-size: 10px;
          font-family: Noto Sans KR, -apple-system, BlinkMacSystemFont,
            “Segoe UI”, Roboto, “Helvetica Neue”, Arial, “Noto Sans”, sans-serif,
            “Apple Color Emoji”, “Segoe UI Emoji”, “Segoe UI Symbol”,
            “Noto Color Emoji”;
        }
      `}
    />
  );
};
