import { login } from "@api/etc";
import envs from "@config/dotenv";
import mini from "@lib/mini";
import { codeAtom } from "@store/user";
import { getValueFromSearch } from "@utils/utils";
import { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";

export default function withMini(Component: React.ElementType) {
  return (props: any) => {
    const [code, setCode] = useRecoilState(codeAtom);
    const [isLogin, setIsLogin] = useState<boolean>(false);

    const getCodeHandler = useCallback(() => {
      const codeParams = getValueFromSearch("code");
      const preload = getValueFromSearch("preload");
      if (codeParams) {
        setCode(codeParams);
      } else if (preload !== "true" && !code && !isLogin) {
        mini.startPreset({
          preset: envs.MINI_PRESET_URL || "",
          params: { appId: envs.APP_ID || "" },
          onSuccess(result: { code: string }) {
            if (result && result.code) {
              setCode(result.code);
            }
          },
        });
      }
    }, [setCode, code, isLogin]);

    const checkAuth = useCallback(async () => {
      const regionId = getValueFromSearch("region_id");
      if (code && regionId) {
        await login(code, regionId);
        setIsLogin(true);
      }
    }, [code]);

    useEffect(() => {
      if (!code) {
        getCodeHandler();
      }
      if (code && !isLogin) {
        checkAuth();
      }
    }, [code, isLogin, checkAuth, getCodeHandler]);

    if (!code || !isLogin) {
      return <div>something wrong</div>;
    }

    return <Component {...props} />;
  };
}
