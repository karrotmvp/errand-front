import { login } from "@api/etc";
import envs from "@config/dotenv";
import mini from "@lib/mini";
import { isLoginAtom } from "../store/user";
import { getValueFromSearch } from "@utils/utils";
import { useCallback, useEffect } from "react";
import { useRecoilState } from "recoil";

export default function withMini(Component: React.ElementType) {
  return (props: any) => {
    const [isLogin, setIsLogin] = useRecoilState(isLoginAtom);

    const isAgreedUser = useCallback(() => {
      const codeParams = getValueFromSearch("code");
      return Boolean(codeParams);
    }, []);

    const askAgreement = useCallback(() => {
      const codeParams = getValueFromSearch("code");
      const regionId = getValueFromSearch("region_id");
      const preload = getValueFromSearch("preload");
      if (preload !== "true" && !codeParams && regionId) {
        mini.startPreset({
          preset: envs.MINI_PRESET_URL || "",
          params: { appId: envs.APP_ID || "" },
          async onSuccess(result: { code: string }) {
            console.log("실행된당");
            if (result && result.code) {
              const res = await login(result.code, regionId);
              setIsLogin(res === "OK");
            }
          },
        });
      } else {
        console.log(
          `preload : ${preload}, codeParams : ${codeParams}, regionId : ${regionId} 중 하나가 비정상!`
        );
      }
    }, [setIsLogin]);

    useEffect(() => {
      if (isLogin) {
        return;
      }

      if (isAgreedUser()) {
        setIsLogin(true);
        return;
      }

      askAgreement();
    }, [isLogin, isAgreedUser, askAgreement, setIsLogin]);

    if (!isLogin) {
      return <div>로그인 중</div>;
    }

    return <Component {...props} />;
  };
}

// const [code, setCode] = useRecoilState(codeAtom);
// const [isLogin, setIsLogin] = useState<boolean>(false);

// const getCodeHandler = useCallback(() => {
//   const codeParams = getValueFromSearch("code");
//   const preload = getValueFromSearch("preload");
//   if (codeParams) {
//     setCode(codeParams);
//   } else if (preload !== "true" && !code && !isLogin) {
//     mini.startPreset({
//       preset: envs.MINI_PRESET_URL || "",
//       params: { appId: envs.APP_ID || "" },
//       onSuccess(result: { code: string }) {
//         if (result && result.code) {
//           setCode(result.code);
//         }
//       },
//     });
//   }
// }, [setCode, code, isLogin]);

// const checkAuth = useCallback(async () => {
//   const regionId = getValueFromSearch("region_id");
//   if (code && regionId) {
//     const token = await getTokenBylogin(code, regionId);
//     setIsLogin(true);
//   }
// }, [code]);

// useEffect(() => {
//   if (!code) {
//     getCodeHandler();
//   }
//   if (code && !isLogin) {
//     checkAuth();
//   }
// }, [code, isLogin, checkAuth, getCodeHandler]);

// if (!code || !isLogin) {
//   return <div>something wrong</div>;
// }
