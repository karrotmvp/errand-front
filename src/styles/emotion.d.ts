import "@emotion/react";
import { css } from "@emotion/react";

export type FontSize = "small" | "medium" | "large" | "xlarge";

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
    };
    font: (size: FontSize, weight?: FontWeight) => css;
    container: css;
  }
}
