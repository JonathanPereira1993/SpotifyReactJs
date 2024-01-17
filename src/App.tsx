import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const CLIENT_ID = "bd7d8d8fc66246bda8913ed802b071ce";
  const REDIRECT_URI = "http://localhost:5173/";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";

  const [token, setToken] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        ?.split("=")[1];

      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }

    setToken(token);
  }, []);

  const renderArtists = () => {
    return artists.map((artist) => (
      <div key={artist.id}>
        {artist.name} {artist.followers.total}
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

    setArtists(data.artists.items);
    console.log(data.artists.items);
  };

  return (
    <>
      <h1>Spotify API</h1>
      <a
        href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
      >
        There
      </a>

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
        <h2>Please, LogIn</h2>
      )}

      {renderArtists()}
    </>
  );
}

export default App;
