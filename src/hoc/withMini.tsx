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
        console.log("로그인 전 : ", code, regionId);
        const result = await login(code, regionId);
        console.log("로그인 후 : ", result);
        setIsLogin(true);

        // if (result?.status === "OK") {
        //   setIsLogin(true);
        // }
      }
    }, []);

    const testLogin = () => {
      mini.startPreset({
        preset: envs.MINI_PRESET_URL || "",
        params: { appId: envs.APP_ID || "" },
        onSuccess(result: { code: string }) {
          if (result && result.code) {
            checkAuth(result.code);
          }
        },
      });
    };

    useEffect(() => {
      // if (!code) {
      //   getCodeHandler();
      // } else {
      //   checkAuth(code);
      // }
    }, [code, checkAuth, getCodeHandler]);

    if (!isLogin) {
      return (
        <div
          style={{ width: "100px", height: "100px", fontSize: "50px" }}
          onClick={testLogin}
        >
          버튼
        </div>
      );
    }
    return <Component {...props} />;
  };
}
