import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { typeContext } from "./Services/context/tokenContext.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <typeContext.Provider value={""}>
      <App />
    </typeContext.Provider>
  </React.StrictMode>
);
