import axios from "axios";

import { createContext, useContext, useState } from "react";
import SearchEngineContext from "./SearchEngineContext";
import TokenContext from "./TokenContext";

const SavedTrackContext = createContext({});

export const SavedTracksProvider = ({ children }) => {
  const { artists } = useContext(SearchEngineContext);
  const { token } = useContext(TokenContext);

  const [trackSaved, setTrackSaved] = useState([]);

  const saveTrackOnClick = async (trackId) => {
    try {
      const response = await axios(
        `https://api.spotify.com/v1/me/tracks + ${trackId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          data: {
            ids: trackId,
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
