import { css } from "@emotion/react";

const LINE_HEIGHT = "1.8em";

export const theme = {
  color: {
    primary: "#343434",
  },
  font: {
    size: {
      small: css`
        font-size: 1rem;
        line-height: ${LINE_HEIGHT};
      `,
      medium: css`
        font-size: 1rem;
        line-height: ${LINE_HEIGHT};
      `,
      large: css`
        font-size: 1rem;
        line-height: ${LINE_HEIGHT};
      `,
      xlarge: css`
        font-size: 1rem;
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
};
