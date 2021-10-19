import { css, Theme } from "@emotion/react";
import { FontSize, FontWeight } from "./emotion";

const FONT_SIZE = {
  small: "1.3rem",
  medium: "1.5rem",
  large: "2rem",
  xlarge: "2.5rem",
};
const FONT_WEIGHT = {
  regular: 300,
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
    grey1: "#f3f3f3",
    grey2: "#DCDCDC",
    grey3: "#b1b1b1",
    grey4: "#7B7B7B",
    default: "#333333",
  },
  font,
  container: css`
    padding-left: 2rem;
    padding-right: 2rem;
  `,
};
