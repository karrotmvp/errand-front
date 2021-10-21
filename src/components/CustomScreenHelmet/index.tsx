import { Back } from "@assets/icon";
import { ScreenHelmet } from "@karrotframe/navigator";

const CustomScreenHelmet: typeof ScreenHelmet = ({ title, appendRight }) => {
  return (
    <ScreenHelmet
      customBackButton={CustomBack()}
      customCloseButton={CustomClose()}
      title={<Title title={title} />}
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

// TODO. close svg 받아서 교체할 것
const CustomClose = () => (
  <div style={leftButtonStyle}>
    <Back />
  </div>
);

const Title = ({ title }: { title: React.ReactNode }) => (
  <div style={titleStyle}>{title}</div>
);

const AppendRight = ({ appendRight }: { appendRight: React.ReactNode }) => (
  <div style={rightButtonStyle}>{appendRight}</div>
);

export default CustomScreenHelmet;
