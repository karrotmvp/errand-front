import { css, Global } from "@emotion/react";
import { reset } from "./reset";

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
          line-height: 1.7em;
          color: #333333;

          a {
            text-decoration: none;
          }
          button,
          input,
          optgroup,
          select,
          textarea {
            color: inherit;
            font: inherit;
            margin: 0;
            background: #fff;
            border: none;
          }
          input[type="number"]::-webkit-outer-spin-button,
          input[type="number"]::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }
          input,
          button,
          select,
          textarea {
            &:focus {
              outline: none;
            }
          }
          textarea {
            border: none;
            resize: none;
          }
          input[type="file"] {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            border: 0;
          }
          input[type="checkbox"] {
            all: unset;
          }
        }
      `}
    />
  );
};
