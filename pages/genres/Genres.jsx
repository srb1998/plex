const Genres = ({ data }) => {
  return (
    <div className="flex gap-1">
      {data?.map((genre) => {
        return (
          <div
            key={genre.id}
            className="bg-[#da2f68] py-[3px] px-[5px] text-xs rounded-md text-white whitespace-nowrap text-ellipsis font-semibold font-inter overflow-hidden"
          >
            {genre.name}
          </div>
        );
      })}
    </div>
)
}
export default Genres;
