import { reqeustLogin } from "@api/etc";
import envs from "@config/dotenv";
import mini from "@lib/mini";
import { isLoginAtom } from "../store/user";
import { getValueFromSearch } from "@utils/utils";
import { useCallback, useEffect } from "react";
import { useRecoilState } from "recoil";
import Sample from "@assets/images/sample.jpg";
import CustomScreenHelmet from "@components/CustomScreenHelmet";
import { AppenderWrapper, Title } from "@pages/Home";
import { Gear, Me } from "@assets/icon";

export default function withMini(Component: React.ElementType) {
  return (props: any) => {
    const [isLogin, setIsLogin] = useRecoilState(isLoginAtom);

    const login = useCallback(
      async (code: string, regionId: string) => {
        const res = await reqeustLogin(code, regionId);
        setIsLogin(res === "OK");
      },
      [setIsLogin]
    );

    const askAgreement = useCallback(() => {
      const codeParams = getValueFromSearch("code");
      const regionId = getValueFromSearch("region_id");
      const preload = getValueFromSearch("preload");

      if (preload !== "true" && !codeParams && regionId) {
        mini.startPreset({
          preset: envs.MINI_PRESET_URL || "",
          params: { appId: envs.APP_ID || "" },
          async onSuccess(result: { code: string }) {
            if (result && result.code) {
              login(result.code, regionId);
            }
          },
        });
      } else {
        console.log(
          `preload : ${preload}, codeParams : ${codeParams}, regionId : ${regionId} 중 하나가 비정상!`
        );
      }
    }, [login]);

    useEffect(() => {
      if (isLogin) {
        return;
      }

      const result = checkAgreedUser();
      if (result) {
        login(result.codeParams, result.regionId);
        return;
      }

      askAgreement();
    }, [isLogin, askAgreement, login]);

    if (!isLogin) {
      return (
        <div style={{ width: "100%", height: "100%" }}>
          <CustomScreenHelmet
            title={
              <Title>
                <h1>당근심부름</h1>
                <span>Beta</span>
              </Title>
            }
            appendRight={
              <AppenderWrapper>
                <div>
                  <Me />
                </div>
                <div>
                  <Gear />
                </div>
              </AppenderWrapper>
            }
          />
          <img style={{ width: "100%" }} src={Sample} alt="sample" />
        </div>
      );
    }

    return <Component {...props} />;
  };
}

const checkAgreedUser = () => {
  const codeParams = getValueFromSearch("code");
  const regionId = getValueFromSearch("region_id");
  if (codeParams && regionId) {
    return { codeParams, regionId };
  }
  return false;
};
