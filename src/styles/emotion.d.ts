import "@emotion/react";
import { css } from "@emotion/react";

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
    };
    font: {
      size: {
        small: css;
        medium: css;
        large: css;
        xlarge: css;
      };
      weight: {
        small: number;
        medium: number;
        large: number;
        xlarge: number;
      };
    };
  }
}
