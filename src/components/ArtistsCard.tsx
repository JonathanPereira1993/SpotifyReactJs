interface Artist {
    name: string,
    followers: number,
    photo: string,
    genre: [],
}

const ArtistsCard = ( {name, followers, photo, genre}: Artist ) => {
  return (
    <div className="p-2 flex flex-col items-center justify-center border rounded shadow-md">
        <h1 className="text-3xl">{name}</h1>
        {/* <img src={photo} alt={name} /> */}
        <p className="font-bold">Followers: <span className="font-light underline">{followers}</span></p>
        <div className="flex gap-2 flex-wrap mt-1">
            {genre.map((genre) => (
                <div className="rounded bg-slate-500 text-white py-[2px] px-1 text-center text-xs">{genre}</div>
            ))}
        </div>
        
    </div>
  )
}

export default ArtistsCard