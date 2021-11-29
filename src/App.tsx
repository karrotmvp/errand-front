import { ThemeProvider } from "@emotion/react";
import { css } from "@emotion/css";
import { Navigator, Screen } from "@karrotframe/navigator";
import { GlobalStyle } from "./styles/global-style";
import { theme } from "./styles/theme";
// import { initMSW } from "./lib/msw";

import {
  Alarm,
  ApplyForm,
  ErrandDetail,
  ErrandRequest,
  Home,
  My,
  Resume,
  ApplierList,
  FeedRequestForm,
  FeedErrandDetail,
} from "./pages";
import { checkMobileType, checkSubScribe } from "@utils/utils";
import withMini from "@hoc/withMini";
import { withParams } from "@hoc/withParams";
import { withQueryParams } from "@hoc/withQueryParams";
import ErrorPage from "@pages/ErrorPage";
import { useCallback } from "react";
// import Feed from "@pages/Feed";
import Toast from "@components/Toast/Index";

// initMSW();

function App() {
  const NavigatorStyle = css`
    --kf_navigator_navbar-height: 5.8rem;
  `;
  const onDepthChange = useCallback((depth: number) => {
    localStorage.setItem("depth", depth.toString());
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Navigator
        theme={checkMobileType()}
        className={NavigatorStyle}
        onClose={checkSubScribe}
        onDepthChange={onDepthChange}
      >
        <Screen path="/" component={withMini(Home)} />
        <Screen
          path="/errands/:errandId"
          component={withParams(withMini(ErrandDetail), "errandId")}
        />
        <Screen
          path="/errands/:errandId/appliers"
          component={withParams(ApplierList, "errandId")}
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
        <Screen
          path="/errand-request"
          component={withMini(withQueryParams(ErrandRequest, "categoryId"))}
        />
        <Screen path="/my" component={My} />
        <Screen path="/404" component={ErrorPage} />
        <Screen
          path="/feed/errand-request"
          component={withMini(withQueryParams(FeedRequestForm, "categoryId"))}
        />
        <Screen
          path="/feed/errands/:errandId"
          component={withParams(withMini(FeedErrandDetail), "errandId")}
        />
        '
      </Navigator>
      <Toast />
    </ThemeProvider>
  );
}

export default App;
