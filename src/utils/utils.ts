import { toast } from "@components/Toast/Index";
import envs from "@config/dotenv";
import { INavigatorTheme } from "@karrotframe/navigator";
import mini from "@lib/mini";
import dayjs from "dayjs";

export const checkMobileType = (): INavigatorTheme => {
  const UA = navigator.userAgent.toLowerCase();
  if (UA.indexOf("android") > -1) return "Android";
  if (
    UA.indexOf("iphone") > -1 ||
    UA.indexOf("ipad") > -1 ||
    UA.indexOf("ipod") > -1
  )
    return "Cupertino";
  return "Android";
};
type TargetType = "code" | "preload" | "region_id" | "installed";

export const getValueFromSearch = (target: TargetType) => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  let result = urlSearchParams.get(target);

  if (!result) {
    const urlHashParams = new URLSearchParams(window.location.hash);
    result = urlHashParams.get(target);
  }
  return result;
};

export const getComparedTime = (timeA: Date, timeB: Date) => {
  const dateA = dayjs(timeA);
  const dateB = dayjs(timeB);
  const secondDiff = dateA.diff(dateB, "second");
  if (secondDiff < 60) {
    return "방금 전";
  }

  const minuteDiff = dateA.diff(dateB, "minute");

  if (minuteDiff < 60) {
    return minuteDiff + "분 전";
  }

  const hourDiff = dateA.diff(dateB, "hour");

  if (hourDiff < 24) {
    return hourDiff + "시간 전";
  }

  const dayDiff = dateA.diff(dateB, "day");
  if (dayDiff < 7) {
    return dayDiff + "일 전";
  }

  const weekDiff = dateA.diff(dateB, "week");
  if (weekDiff < 4) {
    return weekDiff + "주 전";
  }

  const monthDiff = dateA.diff(dateB, "month");
  if (monthDiff < 12) {
    return monthDiff + "개월 전";
  }

  const yearDiff = dateA.diff(dateB, "year");
  if (yearDiff < 12) {
    return yearDiff + "년 전";
  }
};

export const getRegion = () => {
  return localStorage.getItem("region");
};

export const checkSubScribe = () => {
  const isInstalled = getValueFromSearch("installed");
  if (isInstalled === "true") {
    return;
  }
  const isRejected = localStorage.getItem("isrejectInstalled");
  if (isRejected === "true") {
    return;
  }
  mini.startPreset({
    preset: envs.MINI_SUBSCRIBE_PRESET_URL || "",
    params: { appId: envs.APP_ID || "" },
    onSuccess(result) {
      if (result.ok) {
        toast("구독해주셔서 감사합니다!");
        localStorage.setItem("isrejectInstalled", "true");
      }
    },
    onClose() {
      localStorage.setItem("isrejectInstalled", "true");
    },
  });
};
