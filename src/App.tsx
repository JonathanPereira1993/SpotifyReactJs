import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const clientId = import.meta.env.VITE_CLIENT_ID;
  const redirectURI = import.meta.env.VITE_REDIRECT_URI;
  const authEndpoint = import.meta.env.VITE_AUTH_ENDPOINT;
  const responseType = "token";

  const [token, setToken] = useState<string>("");
  const [searchKey, setSearchKey] = useState<string>("");
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
    console.log(token);
    const { data } = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q: searchKey,
        type: "artist",
      },
    });

    console.log(data.artists.items);
    setArtists(data.artists.items);
  };

  return (
    <div className="m-auto flex flex-col justify-center items-center h-screen w-screen">
      <h1>Spotify API</h1>
      <a
        href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectURI}&response_type=${responseType}`}
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
    </div>
  );
}

export default App;
