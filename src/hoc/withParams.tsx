import React from "react";
import { useParams } from "@karrotframe/navigator";

export type WithParamsProps = {
  errandId: string;
  helpId: string;
};

export type Params = "errandId" | "helpId";

export function withParams(Component: React.ElementType, ...rest: Params[]) {
  return (props: any) => {
    const params = useParams<WithParamsProps>();

    for (let target of rest) {
      if (!params[target] && target) return <p>{target}이 params에 없습니다</p>;
    }

    return <Component {...props} {...{ ...params }} />;
  };
}
