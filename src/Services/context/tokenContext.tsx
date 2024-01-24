import { createContext, useState } from "react";
import axios from "axios";

const TokenContext = createContext({});

export const TokenProvider = ({ children }) => {
  const [token, setToken] = useState("");

  const getAuth = async () => {
    const clientId = import.meta.env.VITE_CLIENT_ID;
    const clientSecret = import.meta.env.VITE_SECRET_KEY;

    axios("https://accounts.spotify.com/api/token", {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
      },
      data: "grant_type=client_credentials",
      method: "POST",
    }).then((tokenResponse) => {
      console.log("Login!");
      setToken(tokenResponse.data.access_token);
      return tokenResponse.data.access_token;
    });
  };

  return (
    <TokenContext.Provider value={{ token, getAuth }}>
      {children}
    </TokenContext.Provider>
  );
};

export default TokenContext;
