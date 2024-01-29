import Artist from "./types.ts";
const ArtistsCard = ({ name, followers, photo, genre }: Artist) => {
  const getInitials = () => {
    let artistName = name;

    if (artistName !== undefined) {
      let stringSplitted = artistName.split(" ");
      let result;
      if (stringSplitted.length > 1) {
        result =
          Array.from(stringSplitted[0])[0] +
          " " +
          Array.from(stringSplitted[1])[0];
      } else {
        result = Array.from(stringSplitted[0])[0];
      }

      return result;
    }
  };

  return (
    <div className="p-2 relative flex flex-col items-center justify-center border rounded shadow-md">
      <h1 className="text-3xl mb-4 mt-4">{name}</h1>
      {photo !== undefined ? (
        <img src={photo} alt={name} className="mb-2 rounded-lg shadow" />
      ) : (
        <div className="h-[200px] w-full flex items-center justify-center bg-green-200 rounded text-3xl font-bold">
          {getInitials()}
        </div>
      )}

      {followers !== undefined ? (
        <p className="font-bold">
          Followers: <span className="font-light underline">{followers}</span>
        </p>
      ) : (
        <p></p>
      )}
      <div className="flex gap-2 flex-wrap">
        {genre !== undefined ? (
          genre.map((item) => (
            <span className="py-[2px] px-[4px] bg-slate-500 text-xs rounded-md text-white">
              {item}
            </span>
          ))
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default ArtistsCard;
