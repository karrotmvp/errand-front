import { Back, Close } from "@assets/icon";
import { ScreenHelmet, useNavigator } from "@karrotframe/navigator";
import { checkMobileType } from "@utils/utils";

const CustomScreenHelmet: typeof ScreenHelmet = ({ title, appendRight }) => {
  const theme = checkMobileType();
  const { replace } = useNavigator();

  return (
    <ScreenHelmet
      customBackButton={CustomBack()}
      customCloseButton={CustomClose(replace)}
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
};

const rightButtonStyle = {
  marginRight: "2rem",
  display: "flex",
  alignItems: "center",
};

const CustomBack = () => (
  <div style={leftButtonStyle}>
    <Back />
  </div>
);

const CustomClose = (
  replace: (
    to: string,
    options?:
      | {
          animate?: boolean | undefined;
        }
      | undefined
  ) => void
) => {
  const isDetail = window.location.pathname;
  console.log("in close", isDetail);
  return (
    <div
      style={leftButtonStyle}
      onClick={(e) => {
        e.stopPropagation();
        // TODO 중간URL로 들어왔다는 Flag를 잡아서 replace('/')하기
        replace("/");
      }}
    >
      <Close stroke="black" />
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
