import { atom } from "recoil";

export const alertState = atom({
  key: "isOpen",
  default: {
    isOpened: false,
    message: "",
  },
});
