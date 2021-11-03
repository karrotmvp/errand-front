import { ThemeProvider } from "@emotion/react";
import { css } from "@emotion/css";
import { Navigator, Screen } from "@karrotframe/navigator";
import { GlobalStyle } from "./styles/global-style";
import { theme } from "./styles/theme";
// import { initMSW } from "./lib/msw";

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
import withMini from "@hoc/withMini";
import { withErrandIdAndHelperId } from "@hoc/withErrandIdAndHelperId";

// initMSW();

function App() {
  const NavigatorStyle = css`
    --kf_navigator_navbar-height: 5.8rem;
  `;

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Navigator
        theme={checkMobileType()}
        className={NavigatorStyle}
        onClose={() => {
          console.log("close. bye~");
        }}
      >
        <Screen path="/" component={withMini(Home)} />
        <Screen
          path="/errands/:id"
          component={withParamsId(withMini(ErrandDetail))}
        />
        <Screen path="/appliers" component={withMini(ApplierList)} />
        <Screen
          path="/appliers/:id"
          component={withErrandIdAndHelperId(Resume)}
        />
        <Screen path="/apply-form" component={ApplyForm} />
        <Screen path="/alarm" component={Alarm} />
        <Screen path="/errand-request" component={ErrandRequest} />
        <Screen path="/my" component={My} />
      </Navigator>
    </ThemeProvider>
  );
}

export default App;
