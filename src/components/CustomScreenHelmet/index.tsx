import { Back } from "@assets/icon";
import { ScreenHelmet } from "@karrotframe/navigator";

const CustomScreenHelmet: typeof ScreenHelmet = ({ title, appendRight }) => {
  return (
    <ScreenHelmet
      customBackButton={CustomBack}
      title={<Title title={title} />}
      appendRight={<AppendRight appendRight={appendRight} />}
    />
  );
};

const style = {
  fontSize: "1.6rem",
  fontWeight: 500,
  padding: "1.6rem 0",
};

const CustomBack = () => <Back />;

const Title = ({ title }: { title: React.ReactNode }) => (
  <div style={style}>{title}</div>
);

const AppendRight = ({ appendRight }: { appendRight: React.ReactNode }) => (
  <div style={style}>{appendRight}</div>
);

export default CustomScreenHelmet;
