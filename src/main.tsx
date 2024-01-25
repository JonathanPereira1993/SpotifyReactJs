import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { TokenProvider } from "./Services/context/TokenContext.tsx";
import { SearchEngineProvider } from "./Services/context/SearchEngineContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <TokenProvider>
      <SearchEngineProvider>
        <App />
      </SearchEngineProvider>
    </TokenProvider>
  </React.StrictMode>
);
