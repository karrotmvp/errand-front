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

export const getcodeFromURL = (search: string) => {
  const urlSearchParams = new URLSearchParams(search);
  return urlSearchParams.get("code");
};

export const setCode = () => {};
