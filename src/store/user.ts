import { atom } from "recoil";

export const codeAtom = atom<string | undefined>({
  key: "codeAtom",
  default: undefined,
});

export const isLoginAtom = atom<boolean>({
  key: "isLogin",
  default: false,
});
