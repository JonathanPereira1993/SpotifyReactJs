interface Artist {
  name: string;
  followers: number;
  photo?: string;
  genre?: [];
}

const ArtistsCard = ({ name, followers, photo }: Artist) => {
  console.log(photo);
  return (
    <div className="p-2 flex flex-col items-center justify-center border rounded shadow-md">
      <h1 className="text-3xl">{name}</h1>
      <img src={photo} alt={name} />
      <p className="font-bold">
        Followers: <span className="font-light underline">{followers}</span>
      </p>
    </div>
  );
};

export default ArtistsCard;
