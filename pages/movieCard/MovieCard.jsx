import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import Ratings from "../searchRatings/Ratings";
import { imgUrl, dateOf, titleOf } from "@/utils/api";

export default function MovieCard({ data, mediaType }) {
  const route = useRouter();
  const posterUrl = imgUrl(data?.poster_path, "w500") || "/assets/no-poster.png";
  const released = dateOf(data);

  return (
    <div
      className="w-calc-50-5 mb-6 cursor-pointer flex-shrink-0 md:w-calc-25-15 lg:w-calc-20-16"
      onClick={() => route.push(`/${data?.media_type || mediaType}/${data?.id}`)}
    >
      <div className="posterBlock">
        <img
          className="absolute top-0 left-0 rounded-xl overflow-hidden w-full h-full object-cover object-center"
          src={posterUrl}
          alt={titleOf(data) || "poster"}
          loading="lazy"
        />
        {/* fromsearch,circle-Rating and Genres*/}
      </div>
      {data && (
        <div className="text-white flex flex-col">
          <span>
            <Ratings data={data} />
          </span>
          <span className="md:text-xl text-base my-2 font-inter font-medium text-ellipsis">
            {titleOf(data)}
          </span>
          <span className="text-[14px] opacity-50 font-inter font-medium">
            {released ? dayjs(released).format("MMM D, YYYY") : ""}
          </span>
        </div>
      )}
    </div>
  );
}
