import axios from "axios";

import { createContext, useContext, useState } from "react";
import SearchEngineContext from "./SearchEngineContext";
import TokenContext from "./TokenContext";

const SavedTrackContext = createContext({});

export const SavedTracksProvider = ({ children }) => {
  const { artists } = useContext(SearchEngineContext);
  const { token } = useContext(TokenContext);

  const [trackId, setTrackId] = useState();

  const [trackSaved, setTrackSaved] = useState([]);

  const saveTrackOnClick = async () => {
    try {
      const response = await axios(
        `https://api.spotify.com/v1/me/tracks? + ${trackId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          data: {
            ids: ["string"],
          },
          method: "PUT",
        }
      );
    } catch {}

    console.log(artists);
  };

  return (
    <SavedTrackContext.Provider
      value={{ trackSaved, setTrackSaved, saveTrackOnClick }}
    >
      {children}
    </SavedTrackContext.Provider>
  );
};

export default SavedTrackContext;
