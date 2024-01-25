import { createContext, useContext, useState, useEffect } from "react";
import TokenContext from "./TokenContext";
import { searchCall } from "../api/SpotifyService";

const SearchEngineContext = createContext({});

interface dataTypes {
  name: string;
}

export const SearchEngineProvider = ({ children }) => {
  const { token } = useContext(TokenContext);

  const [searchKey, setSearchKey] = useState<string>(undefined);
  const [empty, setEmpty] = useState<boolean>(false);
  const [artists, setArtists] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>();
  const [searchType, setSearchType] = useState<string>("artist");

  const searchDataType: dataTypes[] = [
    { name: "artist" },
    { name: "album" },
    { name: "track" },
  ];

  // Search Action
  const searchEngine = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsLoading(true);

    const { response, err } = await searchCall({
      q: searchKey,
      type: searchType,
      token: token,
    });

    window.localStorage.setItem("SearchType", searchType);

    if (response) {
      if (searchType == "artist") {
        setArtists(response.artists.items);
      } else if (searchType == "album") {
        setArtists(response.albums.items);
      } else if (searchType == "track") {
        setArtists(response.tracks.items);
      }
    }

    if (response === undefined) {
      setEmpty(true);
    }

    if (response) {
      setError(error);
    }

    setIsLoading(false);
    setSearchKey("");
  };

  useEffect(() => {
    setSearchType(window.localStorage.getItem("SearchType"));
  }, []);

  const handleSearchType = (event: any) => {
    setSearchType(event.target.value);
  };

  return (
    <SearchEngineContext.Provider
      value={{
        searchKey,
        searchType,
        searchEngine,
        searchDataType,
        isLoading,
        artists,
        empty,
        error,
        setSearchKey,
        handleSearchType,
        setSearchType,
      }}
    >
      {children}
    </SearchEngineContext.Provider>
  );
};

export default SearchEngineContext;
