import { useEffect, useState } from "react";
import LoginPage from "./Pages/LoginPage";
import SearchSection from "./Pages/SearchSection";

function App() {
  const [token, setToken] = useState<string>();

  useEffect(() => setToken(window.localStorage.getItem("token")), []);

  return (
    <div className="h-screen w-screen p-6">
      <h1 className="text-center text-6xl mb-6">Spotify API</h1>

      {token ? <SearchSection /> : <LoginPage />}
    </div>
  );
}

export default App;
