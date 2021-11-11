import { css, Theme } from "@emotion/react";
import { FontSize, FontWeight } from "./emotion";

const FONT_SIZE = {
  xsmall: "1.2rem",
  small: "1.3rem",
  medium: "1.4rem",
  large: "1.6rem",
  xlarge: "1.8rem",
};

const FONT_WEIGHT = {
  regular: 400,
  medium: 500,
  bold: 700,
  black: 900,
};

const font = (size: FontSize, weight: FontWeight = "medium") => {
  return css`
    font-size: ${FONT_SIZE[size]};
    font-weight: ${FONT_WEIGHT[weight]};
  `;
};

export const theme: Theme = {
  color: {
    primary: "#FF7E36",
    secondary: "#029D82",
    fail: "#FF0000",
    grey1: "#000000",
    grey2: "#333333",
    grey3: "#7B7B7B",
    grey4: "#A9A9A9",
    grey5: "#CACACA",
    grey6: "#DCDCDC",
    grey7: "#EDEDED",
    grey8: "#F3F3F3",
    grey9: "#EEF0F2",
    grey10: "#F7F8F9",
  },
  font,
  container: css`
    padding-left: 2rem;
    padding-right: 2rem;
  `,
};
