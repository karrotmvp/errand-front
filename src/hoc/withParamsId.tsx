import React from "react";
import { useParams } from "@karrotframe/navigator";

export type WithParamsIdProps = {
  id: string;
};

export function withParamsId(Component: React.ElementType) {
  return (props: any) => {
    const params = useParams<{ id: string }>();

    if (!params.id) return <p>params id가 없습니다.</p>;
    return <Component {...props} id={params.id} />;
  };
}
 