import axios from "axios";
import { useContext, useState } from "react";
import { userContext } from "../Services/context/UserContext";

import ArtistsCard from "../components/ArtistsCard";
import LoadingSpinner from "../components/LoadingSpinner";

interface dataTypes {
  name: string;
}

const SearchSection = () => {
  const [searchKey, setSearchKey] = useState<string>("");
  const [empty, setEmpty] = useState<boolean>(false);
  const [artists, setArtists] = useState<[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<boolean>();
  const [searchType, setSearchType] = useState("artist");

  const searchDataType: dataTypes[] = [
    { name: "artist" },
    { name: "album" },
    { name: "music" },
  ];

  // Context - Token
  const { token } = useContext(userContext);

  // Search Action
  const searchArtists = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsLoading(true);

    console.log(searchType);

    try {
      const { data } = await axios.get(`https://api.spotify.com/v1/search`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          q: searchKey,
          type: searchType,
        },
      });

      console.log(data);
      if (searchType == "artist") {
        setArtists(data.artists.items);
      } else if (searchType == "album") {
        setArtists(data.albuns.items);
      } else if (searchType == "music") {
        setArtists(data.musics.items);
      }
    } catch (error: any) {
      if (error) {
        setError(error);
      }
    }
    setIsLoading(false);
    setSearchKey("");
  };

  const handleSearchType = (event) => {
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
        Somethin went wrong
      </div>
    );
  }

  return (
    <div>
      <form
        className="w-full flex justify-center my-8 gap-4"
        onSubmit={searchArtists}
      >
        <select onChange={handleSearchType} name="" id="">
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
          type={"submit"}
        >
          Search
        </button>
      </form>

      <div>
        <div className="grid grid-cols-6 gap-8 mt-4">
          {artists.map((artist) => (
            <ArtistsCard
              key={artist.id}
              name={artist.name}
              followers={artist.followers.total}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchSection;
