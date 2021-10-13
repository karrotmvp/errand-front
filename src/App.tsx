import { ThemeProvider } from "@emotion/react";
import { Navigator, Screen } from "@karrotframe/navigator";
import { GlobalStyle } from "./styles/global-style";
import { theme } from "./styles/theme";
import { initMSW } from "./lib/msw";
import Home from "./pages/Home";
import { useEffect } from "react";
import envs from "./config/dotenv";
import mini from "./lib/mini";
import styled from "@emotion/styled";

initMSW();

function App() {
  useEffect(() => {
    mini.startPreset({
      preset: envs.PRESET,
      params: {
        appId: envs.APP_ID,
      },
      onSuccess: function (result) {
        if (result && result.code) {
          console.log(result.code);
        }
      },
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Test />
      <Navigator
        onClose={() => {
          console.log("close. bye~");
        }}
      >
        <Screen path="/" component={Home} />
      </Navigator>
    </ThemeProvider>
  );
}

const Test = styled.div`
  background: ${({ theme }) => theme.color.primary};
`;

export default App;
