import axios from "axios";
import { useState } from "react";
import LoginPage from "./Pages/LoginPage";
import SearchSection from "./Pages/SearchSection";

import { userContext } from "./Services/context/UserContext";

function App() {
  const [token, setToken] = useState<string>();

  return (
    <userContext.Provider value={{ token, setToken }}>
      <div className="h-screen w-screen p-6">
        <h1 className="text-center text-6xl mb-6">Spotify API</h1>

        {token ? <SearchSection /> : <LoginPage />}
      </div>
    </userContext.Provider>
  );
}

export default App;
