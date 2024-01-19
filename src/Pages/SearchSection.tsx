import axios from "axios";
import { useEffect, useState } from "react";

const SearchSection = () => {
    const [searchKey, setSearchKey] = useState<string>("");
    const [artists, setArtists] = useState([]);

    const renderArtists = () => {
        return artists.map((artist) => (
            <div key={artist.id}>
                {<ArtistsCard name={artist.name} genre={artist.genres} followers={artist.followers.total} />}
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
        return (
            <div>
                <form onSubmit={searchArtists}>
                    <input
                        className="border w-[300px] h-[40px]"
                        type="text"
                        onChange={(e) => setSearchKey(e.target.value)}
                    />

                    <button type={"submit"}>Search</button>
                </form>

                <div>
                    <div className="grid grid-cols-6 gap-8 mt-4">{renderArtists()}</div>
                </div>
            </div>
        )
    }

    export default SearchSection