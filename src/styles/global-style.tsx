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
          -webkit-tap-highlight-color: transparent;
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
          appearance: none;
        }
        input {
          -webkit-appearance: none;
        }
        textarea {
          -webkit-appearance: none;
        }

        .flex {
          display: flex;
        }
        .slider__dots {
          position: absolute;
          bottom: 2.4rem;
          display: block;
          width: 100%;
          padding: 0;
          margin: 0;
          list-style: none;
          text-align: center;
          z-index: 99;

          & > li {
            position: relative;
            display: inline-block;
            width: 10px;
            height: 2rem;
            margin: 0 5px;
            padding: 0;
            cursor: pointer;
            & > button {
              font-size: 0;
              line-height: 0;
              display: block;
              width: 2rem;
              height: 2rem;
              padding: 5px;
              cursor: pointer;
              color: transparent;
              border: 0;
              outline: none;
              background: transparent;

              &:hover,
              &:focus {
                outline: none;
              }
              &:hover:before,
              &:focus:before {
                opacity: 1;
              }
              &:before {
                font-family: "slick";
                font-size: 0.6rem;
                line-height: 2rem;

                position: absolute;
                top: 0;
                left: 0;
                width: 2rem;
                height: 2rem;

                content: "•";
                text-align: center;

                opacity: 0.5;
                color: white;

                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
              }
            }
            &.slick-active button:before {
              opacity: 1;
              color: white;
            }
          }
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
