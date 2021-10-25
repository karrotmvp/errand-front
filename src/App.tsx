import { ThemeProvider } from "@emotion/react";
import { css } from "@emotion/css";
import { Navigator, Screen } from "@karrotframe/navigator";
import { GlobalStyle } from "./styles/global-style";
import { theme } from "./styles/theme";
import { initMSW } from "./lib/msw";

import styled from "@emotion/styled";
import {
  Alarm,
  ApplyForm,
  ApplierList,
  ErrandDetail,
  ErrandRequest,
  Home,
  My,
  Resume,
} from "./pages";
import { checkMobileType } from "@utils/utils";
import { withParamsId } from "./hoc/withParamsId";

initMSW();

function App() {
  // useEffect(() => {
  //   mini.startPreset({
  //     preset: envs.PRESET_URL,
  //     params: {
  //       appId: envs.APP_ID,
  //     },
  //     onSuccess: function (result) {
  //       if (result && result.code) {
  //         console.log(result.code);
  //       }
  //     },
  //   });
  // }, []);

  const NavigatorStyle = css`
    --kf_navigator_navbar-height: 5.8rem;
  `;

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Test />
      <Navigator
        theme={checkMobileType()}
        className={NavigatorStyle}
        onClose={() => {
          console.log("close. bye~");
        }}
      >
        <Screen path="/" component={Home} />
        <Screen path="/errands/:id" component={withParamsId(ErrandDetail)} />
        <Screen path="/appliers" component={ApplierList} />
        <Screen path="/appliers/:id" component={Resume} />
        <Screen path="/apply-form" component={ApplyForm} />
        <Screen path="/alarm" component={Alarm} />
        <Screen path="/errand-request" component={ErrandRequest} />
        <Screen path="/my" component={My} />
      </Navigator>
    </ThemeProvider>
  );
}

const Test = styled.div`
  background: ${({ theme }) => theme.color.primary};
`;

export default App;
