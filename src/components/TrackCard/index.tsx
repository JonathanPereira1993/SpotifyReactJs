interface Track {
  name: string;
  duration: number;
  popularity: number;
}

const convertTime = (num: number) => {
  const minutes = Math.floor(num / 60000);
  const seconds = ((num % 60000) / 1000).toFixed(0);

  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
};

const TrackCard = ({ name, duration, popularity }: Track) => {
  return (
    <div className="p-2 relative flex flex-col items-center justify-center border rounded shadow-md">
      <h1 className="text-3xl text-center mb-6 mt-4">{name}</h1>
      <div className="flex gap-2 border px-2 rounded mb-4">
        <h2 className="font-semibold">Popularity:</h2>
        <p>{popularity}</p>
      </div>
      <div className="border-t w-full text-center py-2">
        <h2 className="font-bold">Music duration:</h2>
        <p>{convertTime(duration)}</p>
      </div>
    </div>
  );
};

export default TrackCard;
