import { css, Theme } from "@emotion/react";

const LINE_HEIGHT = "1.7em";

export const theme: Theme = {
  color: {
    primary: "#FF7E36",
    secondary: "#029D82",
    fail: "FF0000",
    grey1: "f3f3f3",
    grey2: "#DCDCDC",
    grey3: "b1b1b1",
    grey4: "#7B7B7B",
    default: "#333333",
  },
  font: {
    size: {
      small: css`
        font-size: 1.3rem;
        line-height: ${LINE_HEIGHT};
      `,
      medium: css`
        font-size: 1.5rem;
        line-height: ${LINE_HEIGHT};
      `,
      large: css`
        font-size: 2rem;
        line-height: ${LINE_HEIGHT};
      `,
      xlarge: css`
        font-size: 2.5rem;
        line-height: ${LINE_HEIGHT};
      `,
    },
    weight: {
      small: 300,
      medium: 500,
      large: 700,
      xlarge: 900,
    },
  },
  container: css`
    padding: 0 20px;
  `,
};
