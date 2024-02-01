import { createContext, useState } from "react";

const SavedTrackContext = createContext({});

export const SavedTracksProvider = ({ children }) => {
  const [trackSaved, setTrackSaved] = useState([]);

  return (
    <SavedTrackContext.Provider value={{ trackSaved, setTrackSaved }}>
      {children}
    </SavedTrackContext.Provider>
  );
};

export default SavedTrackContext;
