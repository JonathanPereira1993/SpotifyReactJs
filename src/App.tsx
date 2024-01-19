import axios from "axios";
import { useEffect, useState } from "react";
import ArtistsCard from "./components/ArtistsCard";
import LoginPage from "./Pages/LoginPage";


function App() {
  const [token, setToken] = useState();
  const [searchKey, setSearchKey] = useState<string>("");
  const [artists, setArtists] = useState([]);

  useEffect(() => {
  }, []);

  const renderArtists = () => {
    return artists.map((artist) => (
      <div key={artist.id}>
        {<ArtistsCard name={artist.name} genre={artist.genres} followers={artist.followers.total}/>}
      </div>
    ));
  };

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

    console.log(data.artists.items)
    setArtists(data.artists.items);
  };

  return (
    <div className="h-screen w-screen p-6">
      <h1 className="text-center text-6xl mb-6">Spotify API</h1>

      {token ? (
        <form onSubmit={searchArtists}>
          <input
            className="border w-[300px] h-[40px]"
            type="text"
            onChange={(e) => setSearchKey(e.target.value)}
          />

          <button type={"submit"}>Search</button>
        </form>
      ) : (
        <LoginPage />
      )}

      <div className="grid grid-cols-6 gap-8 mt-4">{renderArtists()}</div>
    </div>
  );
}

export default App;
