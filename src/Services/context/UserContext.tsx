import { useContext, createContext } from "react";
import SearchEngineContext from "./SearchEngineContext";
import axios from "axios";

const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const { token } = useContext(SearchEngineContext);

  // Search Action
  const userProfile = async (e: { preventDefault: () => void }) => {
    axios("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: "Bearer " + { token },
      },
    })
      .then((userResponse) => {
        console.log(userResponse);
        return userResponse.data;
      })
      .catch();
  };

  return (
    <UserContext.Provider value={{ userProfile }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
