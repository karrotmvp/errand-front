import { css, Theme } from "@emotion/react";
import { FontSize, FontWeight } from "./emotion";

const FONT_SIZE = {
  small: "1.3rem",
  medium: "1.6rem",
  large: "2rem",
  xlarge: "2.5rem",
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
    primary2: "#FF6F1F",
    secondary: "#029D82",
    secondary2: "#007460",
    fail: "#FF0000",
    grey1: "#000000",
    grey2: "#333333",
    grey3: "#7B7B7B",
    grey4: "#A9A9A9",
    grey5: "#CACACA",
    grey6: "#DCDCDC",
    grey7: "#EDEDED",
    grey8: "#F3F3F3",
    greyPop: "#575757",
  },
  font,
  container: css`
    padding-left: 2rem;
    padding-right: 2rem;
  `,
};
