import { useParams } from "@karrotframe/navigator";
import ApplierList from "@pages/ApplierList";
import Resume from "@pages/Resume";
import React from "react";

export type WithHelpIdProps = {
  helpId: string;
  errandId: string;
};

export function withHelpId() {
  return (props: any) => {
    const { helpId, errandId } = useParams<WithHelpIdProps>();

    if (helpId) return <Resume {...props} helpId={helpId} />;
    if (errandId) return <ApplierList {...props} errandId={errandId} />;

    return <div>뭔가 잘못됐다.</div>;
  };
}
