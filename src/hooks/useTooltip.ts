import { tooltipsAtom, TooltipType } from "@store/user";
import { useRecoilState } from "recoil";

export const useTooltip = (target: TooltipType): [boolean, () => void] => {
  const [isShowTooltip, setIsShowTooltip] = useRecoilState(tooltipsAtom);
  const closeTooltip = () => {
    setIsShowTooltip((current) => {
      return { ...current, [target]: false };
    });
  };
  return [isShowTooltip[target], closeTooltip];
};
