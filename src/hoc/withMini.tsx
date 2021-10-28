import { login } from "@api/etc";
import envs from "@config/dotenv";
import mini from "@lib/mini";
import { getValueFromSearch } from "@utils/utils";
import { useCallback, useEffect, useState } from "react";

export default function withMini(Component: React.ElementType) {
  return (props: any) => {
    const [code, setCode] = useState<string>("");

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
      const result = await login(code);
      console.log(result);
    }, []);

    useEffect(() => {
      console.log("useEffect");
      if (!code) {
        console.log("코드가 없수");
        getCodeHandler();
      } else {
        console.log("코드가 있수");
        checkAuth(code);
      }
    }, [code, checkAuth, getCodeHandler]);

    if (!code) {
      return <div>인증 중</div>;
    }
    return <Component {...props} />;
  };
}
