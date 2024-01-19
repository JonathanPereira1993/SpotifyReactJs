import axios from "axios";
import { useContext, useState } from "react";
import { userContext } from "../Services/context/UserContext";
import ArtistsCard from "../components/ArtistsCard";

const SearchSection = () => {
  const [searchKey, setSearchKey] = useState<string>("");
  const [artists, setArtists] = useState<[]>([]);

  const { token } = useContext(userContext);

  const searchArtists = async (e) => {
    e.preventDefault();
    const { data } = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q: searchKey,
        type: "artist",
      },
    });

    setArtists(data.artists.items);
  };

  return (
    <div>
      <form
        className="w-full flex justify-center my-8 gap-4"
        onSubmit={searchArtists}
      >
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
