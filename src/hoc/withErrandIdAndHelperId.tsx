import React from "react";
import { useParams } from "@karrotframe/navigator";

export type withErrandIdAndHelperIdProps = {
  errandId: string;
  helperId: string;
};

export function withErrandIdAndHelperId(Component: React.ElementType) {
  return (props: any) => {
    const params = useParams<withErrandIdAndHelperIdProps>();

    // if (!params.errandId || !params.helperId)
    //   return <p>params id가 없습니다.</p>;
    return <Component {...props} />;
  };
}
