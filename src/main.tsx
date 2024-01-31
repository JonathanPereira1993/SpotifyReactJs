import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { TokenProvider } from "./Services/context/TokenContext.tsx";
import { SearchEngineProvider } from "./Services/context/SearchEngineContext.tsx";
import { UserProvider } from "./Services/context/UserContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <TokenProvider>
      <UserProvider>
        <SearchEngineProvider>
          <App />
        </SearchEngineProvider>
      </UserProvider>
    </TokenProvider>
  </React.StrictMode>
);
