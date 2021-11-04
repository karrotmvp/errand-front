import { useState } from "react";

export const useTooltip = (): [boolean, () => void] => {
  const [showTooltip, setShowTooltip] = useState<boolean>(true);
  const closeTooltip = () => {
    setShowTooltip(false);
  };
  return [showTooltip, closeTooltip];
};
