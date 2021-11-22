import { useMemo } from "react";
import { createPortal } from "react-dom";

type PortalProps = {
  children: React.ReactNode;
  target: string;
};

export default function Portal({ children, target }: PortalProps) {
  const rootElement = useMemo(() => document.getElementById(target), [target]);

  if (!rootElement) {
    throw new Error("없음");
  }

  return createPortal(children, rootElement);
}
