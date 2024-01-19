import { getAuth } from "../Services/api/SpotifyService";
import { useContext } from "react";
import { userContext } from "../Services/context/UserContext";

const LoginPage = () => {
  const { setToken } = useContext(userContext);

  const getTokenFromlLocalStorage = () => {
    getAuth();
    let localStorageValue = window.localStorage.getItem("token");
    if (localStorageValue != "") {
      setToken(localStorageValue);
    }
  };
  return (
    <div className="mx-auto w-full text-center">
      <h2 className="text-3xl mb-4">Please, LogIn</h2>
      <button
        className="py-2 px-4 bg-blue-400 rounded-md text-white hover:opacity-90"
        onClick={getTokenFromlLocalStorage}
      >
        Login
      </button>
    </div>
  );
};

export default LoginPage;
