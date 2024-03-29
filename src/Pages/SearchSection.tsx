import { useContext, useEffect, useMemo, useState } from "react";

import ArtistsCard from "../components/ArtistsCard";
import LoadingSpinner from "../components/LoadingSpinner";
import SearchEngineContext from "../Services/context/SearchEngineContext";
import TrackCard from "../components/TrackCard";
import TokenContext from "../Services/context/TokenContext";

const SearchSection = () => {
  const {
    searchType,
    searchEngine,
    searchDataType,
    isLoading,
    artists,
    empty,
    error,
    setSearchKey,
    handleSearchType,
    availableGenres,
    getGenresNames,
  } = useContext(SearchEngineContext);

  const { getUser } = useContext(TokenContext);

  const [filteredArtist, setFilteredArtist] = useState();

  useEffect(() => {
    getGenresNames();
    getUser();
  }, []);

  const filteredArtists = useMemo(() => {
    return filteredArtist !== undefined
      ? artists.filter((artist: any) =>
          artist.name.toLowerCase().includes(filteredArtist.toLowerCase())
        )
      : artists;
  }, [filteredArtist, artists]);

  if (empty) {
    return (
      <div className="w-screen text-red-400 text-3xl h-screen flex items-center justify-center">
        Write something to search
      </div>
    );
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

  const handleFilterChange = (e: any) => {
    setFilteredArtist(e.target.value);
  };

  return (
    <div>
      <form
        className="w-full flex justify-center my-8 gap-4"
        onSubmit={searchEngine}
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

        {searchType === "track" || (
          <select
            className="border px-4 rounded-md"
            onChange={handleFilterChange}
            value={filteredArtist}
          >
            {availableGenres.map((item, i) => (
              <option key={item.id} value={item.genres}>
                {availableGenres[i]}
              </option>
            ))}
          </select>
        )}
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

      <>
        <div className="grid grid-cols-5 gap-8 mt-4">
          {searchType === "track"
            ? artists.map((track: any) => (
                <TrackCard
                  trackId={track.id}
                  key={track.id}
                  name={track.name}
                  popularity={track.popularity}
                  duration={track.duration_ms}
                />
              ))
            : artists
                .filter((item: any) => {
                  return filteredArtist === undefined
                    ? item
                    : item.genres.includes(filteredArtist);
                })
                .map((artist: any) => (
                  <ArtistsCard
                    key={artist.id}
                    name={artist.name}
                    followers={artist.followers?.total}
                    photo={artist.images[0]?.url}
                    genre={artist.genres}
                  />
                ))}
        </div>
      </>
    </div>
  );
};

export default SearchSection;
