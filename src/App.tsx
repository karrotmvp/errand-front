import { ThemeProvider } from "@emotion/react";
import "./App.css";
import { initMSW } from "./lib/msw";
import { GlobalStyle } from "./styles/global-style";

import { theme } from "./styles/theme";

initMSW();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      이것은 테스트용 텍스트입니다!!
    </ThemeProvider>
  );
}

export default App;
