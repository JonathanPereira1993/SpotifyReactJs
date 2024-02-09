import axios from "axios";

import TokenContext from "../../context/TokenContext";
import { useContext } from "react";

// const client_id = import.meta.env.VITE_CLIENT_ID;
// const redirect_uri = "http://localhost:5173/callback";
// const scopes = ['user-read-private', 'user-read-email']

const getUser = () => {
  const { token } = useContext(TokenContext);

  if (token) {
    axios
      .get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log("Error fetching user profile: ", error);
        return error;
      });
  }
};

export default getUser();
