import { login } from "@api/etc";
import envs from "@config/dotenv";
import mini from "@lib/mini";
import { getValueFromSearch } from "@utils/utils";
import { useCallback, useEffect, useState } from "react";

export default function withMini(Component: React.ElementType) {
  return (props: any) => {
    const [code, setCode] = useState<string>("");
    const [isLogin, setIsLogin] = useState<boolean>(false);

    const getCodeHandler = useCallback(() => {
      const codeParams = getValueFromSearch("code");
      const preload = getValueFromSearch("preload");

      if (codeParams) {
        setCode(codeParams);
      } else if (preload !== "true") {
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
    }, []);

    const checkAuth = useCallback(async (code: string) => {
      const regionId = getValueFromSearch("region_id");

      if (regionId) {
        await login(code, regionId);
        setIsLogin(true);
      }
    }, []);

    useEffect(() => {
      if (!code) {
        getCodeHandler();
      } else {
        checkAuth(code);
      }
    }, [code, checkAuth, getCodeHandler]);

    if (!code && !isLogin) {
      return <div>something wrong</div>;
    }

    return <Component {...props} />;
  };
}
