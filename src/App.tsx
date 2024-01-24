import { useContext } from "react";
import LoginPage from "./Pages/LoginPage";
import SearchSection from "./Pages/SearchSection";

import TokenContext from "./Services/context/tokenContext";

function App() {
  const { token } = useContext(TokenContext);
  console.log("On the App", token);
  return (
    <>
      <div className="h-screen w-screen p-6">
        <h1 className="text-center text-6xl mb-6">Spotify API</h1>

        {token ? <SearchSection /> : <LoginPage />}
      </div>
    </>
  );
}

export default App;
