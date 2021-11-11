import "@emotion/react";
import { css } from "@emotion/react";

export type FontSize = "xsmall" | "small" | "medium" | "large" | "xlarge";

export type FontWeight = "regular" | "medium" | "bold" | "black";

declare module "@emotion/react" {
  export interface Theme {
    color: {
      primary: string;
      secondary: string;
      fail: string;
      grey1: string;
      grey2: string;
      grey3: string;
      grey4: string;
      grey5: string;
      grey6: string;
      grey7: string;
      grey8: string;
      grey9: string;
      grey10: string;
    };
    font: (size: FontSize, weight?: FontWeight) => css;
    container: css;
  }
}
