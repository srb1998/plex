import Carousel from "../carousel/Carousel";

export default function Similar({ data,loading,mediaType,id }) {
  const title = mediaType === "tv" ? "Similar TV Shows" : "Similar Movies";

  return (
    <div className="relative overflow-hidden md:h-[500px] h-[400px]">
      <div className="mt-4 mb-2 ml-4 md:text-[32px] text-[24px] font-inter font-medium text-white">{title}</div>
        <Carousel
          title={title}
          data={data?.results}
          loading={loading}
          endpoint={mediaType}
        />
    </div>
  );
}
