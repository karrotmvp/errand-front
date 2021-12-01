import { atom, DefaultValue } from "recoil";

const localStorageEffect =
  (key: string) =>
  ({ setSelf, onSet }: { setSelf: any; onSet: any }) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue !== null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue: any) => {
      if (newValue instanceof DefaultValue) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify(newValue));
      }
    });
  };

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
  effects_UNSTABLE: [localStorageEffect("tooltip")],
});
