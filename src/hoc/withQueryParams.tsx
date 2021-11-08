import React from "react";
import { useQueryParams } from "@karrotframe/navigator";

export type WithQueryParamsProps = {
  errandId: string;
  helpId: string;
};

export type Params = "errandId" | "helpId";

export function withQueryParams(
  Component: React.ElementType,
  ...rest: Params[]
) {
  return (props: any) => {
    const params = useQueryParams<WithQueryParamsProps>();

    for (let target of rest) {
      if (!params[target] && target)
        return <p>{target}이 query params에 없습니다</p>;
    }

    return <Component {...props} {...{ ...params }} />;
  };
}
