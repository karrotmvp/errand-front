import React from "react";
import ReactDOM from "react-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { RecoilRoot } from "recoil";

import "@karrotframe/navigator/index.css";
import "@karrotframe/tabs/index.css";
import "./index.css";

import App from "./App";

const queryClient = new QueryClient();

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <RecoilRoot>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </RecoilRoot>
  </QueryClientProvider>,
  document.getElementById("root")
);
