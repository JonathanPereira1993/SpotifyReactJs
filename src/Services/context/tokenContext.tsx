import { createContext, useState } from "react";
import axios from "axios";

const TokenContext = createContext({});
const clientId = import.meta.env.VITE_CLIENT_ID;
const redirectUri = import.meta.env.VITE_REDIRECT_URI;

export const TokenProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [userProfile, setUserProfile] = useState<any>(null);

  const scopes = ["user-read-private", "user-read-email"];

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

  const getUser = async () => {
    const getAccessToken = () => {
      const hash = window.location.hash
        .substring(1)
        .split("&")
        .reduce((initial: any, item: string) => {
          if (item) {
            const parts = item.split("=");
            initial[parts[0]] = decodeURIComponent(parts[1]);
          }
          return initial;
        }, {});
      window.location.hash = "";
      return hash.access_token;
    };

    const accessToken = getAccessToken();

    if (accessToken) {
      axios
        .get("https://api.spotify.com/v1/me", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          setUserProfile(response.data);
          console.log(response.data);
          return response.data;
        })
        .catch((error) => {
          console.log("Error fetching user profile: ", error);
        });
    } else {
      window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
        "%20"
      )}&response_type=token`;
    }
  };
  return (
    <TokenContext.Provider value={{ token, getAuth, getUser }}>
      {children}
    </TokenContext.Provider>
  );
};

export default TokenContext;
