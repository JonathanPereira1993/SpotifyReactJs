import { useEffect, useState } from "react";
import { searchCall } from "../Services/api/SpotifyService";

import ArtistsCard from "../components/ArtistsCard";
import LoadingSpinner from "../components/LoadingSpinner";

import { tokenContext } from "../Services/context/tokenContext";

interface dataTypes {
  name: string;
}

const SearchSection = () => {
  const [searchKey, setSearchKey] = useState<string>("");
  const [empty, setEmpty] = useState<boolean>(false);
  const [artists, setArtists] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>();
  const [searchType, setSearchType] = useState<string>("artist");
  const [token, setToken] = useState<string>("");

  const searchDataType: dataTypes[] = [
    { name: "artist" },
    { name: "album" },
    { name: "track" },
  ];

  useEffect(() => {
    setSearchType(window.localStorage.getItem("SearchType"));
  }, []);

  // Search Action
  const searchArtists = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsLoading(true);

    const { response, err } = await searchCall({
      q: searchKey,
      type: searchType,
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

    if (err.response.status == 401) {
      setError(error);
      window.localStorage.clear();
    }

    setIsLoading(false);
    setSearchKey("");
  };

  const handleSearchType = (event: any) => {
    setSearchType(event.target.value);
  };

  if (empty) {
    return <div>Write something to search</div>;
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="w-screen text-red-400 text-3xl h-screen flex items-center justify-center">
        Something went wrong
      </div>
    );
  }

  return (
    <div>
      <form
        className="w-full flex justify-center my-8 gap-4"
        onSubmit={searchArtists}
      >
        <select
          className="border px-4 rounded-md"
          onChange={handleSearchType}
          value={searchType}
        >
          {searchDataType.map((type) => (
            <option key={type.name} value={type.name}>
              {type.name}
            </option>
          ))}
        </select>
        <input
          className="border rounded-md px-3 w-[300px] h-[40px]"
          type="text"
          onChange={(e) => setSearchKey(e.target.value)}
        />

        <button
          className="rounded-md bg-slate-500 px-4 text-white hover:opacity-90"
          type="submit"
        >
          Search
        </button>
      </form>

      <div>
        <div className="grid grid-cols-5 gap-8 mt-4">
          {artists.map((artist: any) => (
            <ArtistsCard
              key={artist.id}
              name={artist.name}
              followers={artist.followers?.total}
              photo={artist.images[0]?.url}
              genre={artist.genres}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchSection;
