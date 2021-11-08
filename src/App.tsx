import { ThemeProvider } from "@emotion/react";
import { css } from "@emotion/css";
import { Navigator, Screen } from "@karrotframe/navigator";
import { GlobalStyle } from "./styles/global-style";
import { theme } from "./styles/theme";
import { initMSW } from "./lib/msw";

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
import withMini from "@hoc/withMini";
import { withParams } from "@hoc/withParams";
import { withQueryParams } from "@hoc/withQueryParams";
import ErrorPage from "@pages/ErrorPage";

// initMSW();

function App() {
  const NavigatorStyle = css`
    --kf_navigator_navbar-height: 5.8rem;
  `;

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Navigator theme={checkMobileType()} className={NavigatorStyle}>
        <Screen path="/" component={withMini(Home)} />
        <Screen
          path="/errands/:errandId"
          component={withParams(withMini(ErrandDetail), "errandId")}
        />
        <Screen
          path="/errands/:errandId/appliers"
          component={withParams(withMini(ApplierList), "errandId")}
        />
        <Screen
          path="/helps/:helpId"
          component={withParams(Resume, "helpId")}
        />
        <Screen
          path="/apply-form"
          component={withQueryParams(ApplyForm, "errandId")}
        />
        <Screen path="/alarm" component={Alarm} />
        <Screen path="/errand-request" component={ErrandRequest} />
        <Screen path="/my" component={My} />
        <Screen path="/404" component={ErrorPage} />
      </Navigator>
    </ThemeProvider>
  );
}

export default App;
