import dayjs from "dayjs";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import CircleRating from "../circleRating/CircleRating";
import { imgUrl, dateOf, titleOf, ratingOf } from "@/utils/api";

const Carousel = ({ data, loading, endpoint }) => {
  const carouselContainer = useRef();
  const router = useRouter();

  const skItem = () => {
    return (
      <div className="skeletonItem">
        <div className="rounded-lg w-full aspect-1/1.5 mb-[30px] skeleton"></div>
        <div className="flex flex-col">
          <div className="w-full h-5 mb-[10px] skeleton"></div>
          <div className="w-3/4 h-5 skeleton"></div>
        </div>
      </div>
    );
  };

  return (
    <div className="mb-[50px] flex-center overflow-x-hidden">
      {!loading ? (
        <div
          className="flex w-full max-w-6xl mx-auto gap-[10px] overflow-y-hidden -mr-5 -ml-5 px-4 sm:gap-5 sm:p-0 sm:m-0"
          ref={carouselContainer}
        >
          {data?.map((item) => {
            const posterUrl = imgUrl(item.poster_path, "w342") || "/assets/no-poster.png";
            const released = dateOf(item);
            return (
              <div
                key={item.id}
                className="w-[125px] relative cursor-pointer flex-shrink-0 md:w-[200px] shadow-md hover:shadow-xl transition-shadow"
                onClick={() => {
                  router.push(`/${item.media_type || endpoint || "movie"}/${item.id}`);
                }}
              >
                <div className="absolute top-[165px] md:top-[275px] left-[10px]">
                  <CircleRating rating={ratingOf(item)} />
                </div>

                <div className="overflow-x-scroll w-full aspect-1/1.5 mb-[30px]">
                  <img
                    src={posterUrl}
                    alt={titleOf(item) || "poster image"}
                    loading="lazy"
                    className="rounded-xl"
                  />
                </div>

                {/* text-block */}
                <div className="flex text-white flex-col">
                  <span className="text-[16px] mb-[10px] leading-6 sm:text-lg font-semibold font-inter line-clamp-3">
                    {titleOf(item)}
                  </span>
                  <span className="text-[14px] opacity-50 font-montserrat">
                    {released ? dayjs(released).format("MMM D, YYYY") : ""}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        // Loading Skeleton
        <div className="flex w-full max-w-6xl mx-auto gap-[10px] overflow-y-hidden -mr-5 -ml-5 px-4 sm:gap-5 sm:p-0 sm:m-0">
          {skItem()}
          {skItem()}
          {skItem()}
          {skItem()}
          {skItem()}
        </div>
      )}
    </div>
  );
};
export default Carousel;
