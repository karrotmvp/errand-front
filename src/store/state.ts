import { atom } from "recoil";

export const ToastState = atom({
  key: "isOpenToast",
  default: {
    isOpened: false,
    message: "",
  },
});
