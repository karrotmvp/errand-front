import { atom } from "recoil";

export const codeAtom = atom<string | undefined>({
  key: "codeAtom",
  default: undefined,
});

export const isLoginAtom = atom<boolean>({
  key: "isLogin",
  default: false,
});

export type TooltipType = "home" | "detail" | "resume" | "apply";

export const tooltipsAtom = atom<{
  [key in TooltipType]: boolean;
}>({
  key: "tootips",
  default: {
    home: true,
    detail: true,
    apply: true,
    resume: true,
  },
});
