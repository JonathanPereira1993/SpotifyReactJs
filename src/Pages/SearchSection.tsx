import { useContext, useEffect, useState } from "react";

import ArtistsCard from "../components/ArtistsCard";
import LoadingSpinner from "../components/LoadingSpinner";
import SearchEngineContext from "../Services/context/SearchEngineContext";
import TrackCard from "../components/TrackCard";

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

  const [filteredArtist, setFilteredArtist] = useState();

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

  useEffect(() => {
    getGenresNames();
  }, []);

  const filterPerGenre = (event) => {
    const value = event.target.value;
    const filtered = artists.filter((artist) => artist.genres.includes(value));

    setFilteredArtist(filtered);
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

        <select
          className="border px-4 rounded-md"
          onChange={filterPerGenre}
          value={artists}
        >
          {availableGenres.map((item, i) => (
            <option key={item.id} value={item.genres}>
              {availableGenres[i]}
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
          {searchType === "track"
            ? artists.map((track: any) => (
                <TrackCard
                  key={track.id}
                  name={track.name}
                  popularity={track.popularity}
                  duration={track.duration_ms}
                />
              ))
            : artists
                .filter((item) => {
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
      </div>
    </div>
  );
};

export default SearchSection;
