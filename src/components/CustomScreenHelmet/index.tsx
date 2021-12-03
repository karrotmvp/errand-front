import { Back, Close } from "@assets/icon";
import useBack from "@hooks/useBack";
import { ScreenHelmet, useNavigator } from "@karrotframe/navigator";
import CustomMixPanel from "@utils/mixpanel";
import { checkMobileType } from "@utils/utils";
import { useLocation } from "react-router-dom";

const CustomScreenHelmet: typeof ScreenHelmet = ({ title, appendRight }) => {
  const theme = checkMobileType();

  return (
    <ScreenHelmet
      customBackButton={CustomBack()}
      customCloseButton={CustomClose()}
      title={<Title title={title} theme={theme} />}
      appendRight={<AppendRight appendRight={appendRight} />}
    />
  );
};

const titleStyle = {
  fontSize: "1.6rem",
  fontWeight: 500,
};

const leftButtonStyle = {
  marginLeft: "2rem",
  display: "flex",
  alignItems: "center",
  padding: "1rem",
};

const rightButtonStyle = {
  display: "flex",
  alignItems: "center",
  // transform: "translateX(-1rem)",
};

const CustomBack = () => {
  const location = useLocation();
  const handleMixpanle = () => {
    if (location.pathname.includes("errand-request")) {
      CustomMixPanel.track(CustomMixPanel.eventName.clickBack, {
        page: "요청하기",
      });
    }
    if (location.pathname.includes("apply-form")) {
      CustomMixPanel.track(CustomMixPanel.eventName.clickBack, {
        page: "지원하기",
      });
    }
    if (location.pathname.includes("appliers")) {
      CustomMixPanel.track(CustomMixPanel.eventName.clickBack, {
        page: "지원자 목록",
      });
    }
  };
  useBack(handleMixpanle);

  return (
    <div style={leftButtonStyle} onClick={handleMixpanle}>
      <Back />
    </div>
  );
};

const CustomClose = () => {
  const { replace } = useNavigator();
  const location = useLocation();

  return (
    <div
      style={leftButtonStyle}
      onClick={(e) => {
        if (location.pathname !== "/") {
          e.stopPropagation();
          replace("/");
        }
      }}
    >
      {location.pathname !== "/" ? <Back /> : <Close stroke="black" />}
    </div>
  );
};

const Title = ({ title, theme }: { title: React.ReactNode; theme: string }) => (
  <div
    style={{ ...titleStyle, marginLeft: theme === "Android" ? "1.5rem" : "0" }}
  >
    {title}
  </div>
);

const AppendRight = ({ appendRight }: { appendRight: React.ReactNode }) => (
  <div style={rightButtonStyle}>{appendRight}</div>
);

export default CustomScreenHelmet;
