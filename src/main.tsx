import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { TokenProvider } from "./Services/context/TokenContext.tsx";
import { SearchEngineProvider } from "./Services/context/SearchEngineContext.tsx";
import { SavedTracksProvider } from "./Services/context/SavedTracksContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <TokenProvider>
      <SavedTracksProvider>
        <SearchEngineProvider>
          <App />
        </SearchEngineProvider>
      </SavedTracksProvider>
    </TokenProvider>
  </React.StrictMode>
);
