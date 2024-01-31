// import { getAuth } from "../Services/api/SpotifyService";
import { useContext } from "react";
import TokenContext from "../Services/context/TokenContext";
import UserContext from "../Services/context/UserContext";

const LoginPage = () => {
  const { getAuth } = useContext(TokenContext);
  const { userProfile } = useContext(UserContext);

  const getTokenFromlLocalStorage = () => {
    getAuth();
    userProfile();
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
