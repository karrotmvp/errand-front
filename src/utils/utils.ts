import { INavigatorTheme } from "@karrotframe/navigator";

export const checkMobileType = (): INavigatorTheme => {
  const UA = navigator.userAgent.toLowerCase(); // userAgent 값 얻기
  if (UA.indexOf("android") > -1) return "Android";
  if (
    UA.indexOf("iphone") > -1 ||
    UA.indexOf("ipad") > -1 ||
    UA.indexOf("ipod") > -1
  )
    return "Cupertino";
  return "Android";
};
type TargetType = "code" | "preload" | "region_id";

export const getValueFromSearch = (target: TargetType) => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  return urlSearchParams.get(target);
};

export const setCode = () => {};
