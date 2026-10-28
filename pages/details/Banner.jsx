"use client"
import Image from "next/image"
import dayjs from "dayjs"
import CircleRating from "../circleRating/CircleRating"
import Genres from "../genres/Genres"
import {FaPlay} from "react-icons/fa6"
import VideoPopup from "@/pages/videoPopup/VideoPopup"
import { useState } from "react"
import { imgUrl, ratingOf } from "@/utils/api"

import "./style.scss";

export default function Banner({data,loading,video,media_type,id}) {
    const [show, setShow] = useState(false)
    const [videoId, setVideoId] = useState(null)

    const toHoursAndMinutes = (totalMinutes) => {
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
    };

    // Movies use title/release_date; TV uses name/first_air_date.
    // The old code always read release_date, so every TV page showed "Invalid Date".
    const heading = media_type === "movie" ? (data?.title ?? "") : (data?.name ?? "");
    const released = data?.release_date || data?.first_air_date || null;
    const year = released ? dayjs(released).format("YYYY") : "";
    const runtime = data?.runtime ?? data?.episode_run_time?.[0] ?? null;
    const posterUrl = imgUrl(data?.poster_path, "w500") || "/assets/no-poster.png";
    const backdropUrl = imgUrl(data?.backdrop_path, "w1280") || "/assets/no-poster.png";

    const handleClick = () => {
      const URL = process.env.NEXT_PUBLIC_URL;
      if (!URL) return;
      if (media_type ==="movie"){
        window.open(`${URL}movie?tmdb=${id}`)
      } else if (media_type ==="tv"){
        window.open(`${URL}tv?tmdb=${id}`)
      }
    }

  return (
    <section className="w-full relative sm:h-[635px] flex-wrap h-[1050px] gap-10 max-container">
      {!loading ? (
        <>
          {!!data && (
            <>
              <div className="absolute w-full md:flex-row flex-col flex md:top-[340px] top-[475px] transform -translate-y-1/2 z-10 md:pr-3">
                <div className="relative top-0 rounded-3xl md:w-2/5 w-[300px] sm:h-[500px] h-[400px] sm:mx-10 mx-auto my-4">
                  <Image
                    src={posterUrl}
                    alt="Poster pic"
                    fill
                    loading="lazy"
                    className="rounded-3xl bg-cover"
                  />
                </div>
                <div className="relative top-4 contentWrapper md:w-4/6 w-[450px] h-[400px] sm:mx-6 mx-auto md:my-6">
                  <div className="mb-4">
                    <h3 className="md:text-[38px] text-[24px] font-medium text-white">
                      <span onClick={handleClick} className="cursor-pointer">
                      {heading.charAt(0)}
                      </span>
                      {`${heading.slice(1)}${year ? ` (${year})` : ""}`}
                    </h3>
                  </div>
                  <div className="sm:text-xl text-base text-white mb-4 italic opacity-50">
                    {data.tagline}
                  </div>
                  <div className="mb-4">
                    <Genres data={data.genres} />
                  </div>
                  <div className="flex my-4 items-center md:space-x-14 space-x-8 focus:ring-4">
                    <h3 className="text-white text-xl flex items-center font-semibold gap-2 ">
                      <CircleRating rating={ratingOf(data)} />
                      User Score
                    </h3>
                    {video?.key && (
                      <h3
                        className="text-white text-xl flex items-center font-semibold gap-2 cursor-pointer hover:text-[#F4900E]"
                        onClick={() => {
                          setShow(true);
                          setVideoId(video.key);
                        }}
                      >
                        <FaPlay />
                        <span>Play Trailer</span>
                      </h3>
                    )}
                  </div>
                  <div className="mb-4">
                    <h3 className="sm:text-2xl mb-2 text-2xl font-semibold text-white">
                      Overview
                    </h3>
                    <p className="text-slate-50 font-inter line-clamp-7">
                      {data.overview}
                    </p>
                  </div>

                  <div className="flex mb-8 py-3 text-white items-center space-x-8 border-b-[1px] border-b-[#1E2E43]">
                    {data.status && (
                      <div className="mr-2 flex flex-wrap">
                        <span className="mr-2 leading-6 font-semibold font-inter">
                          Status:{" "}
                        </span>
                        <span className="mr-2 leading-6 opacity-50 font-inter">
                          {data.status}
                        </span>
                      </div>
                    )}
                    {released && (
                      <div>
                        <span className="mr-2 leading-6 font-medium font-inter">
                          Release Date:{" "}
                        </span>
                        <span className="mr-2 leading-6 opacity-50 font-inter">
                          {dayjs(released).format("MMM D, YYYY")}
                        </span>
                      </div>
                    )}
                    {runtime && (
                      <div className="mr-2 leading-6">
                        <span className="mr-2 leading-6 font-semibold">
                          Runtime:{" "}
                        </span>
                        <span className="mr-2 leading-6 opacity-50">
                          {toHoursAndMinutes(runtime)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="w-full flex top-0 left-0 inset-0 opacity-10">
                <Image
                  src={backdropUrl}
                  alt="Backdrop"
                  fill={true}
                  loading="lazy"
                  objectFit="cover"
                  className="shadow-md"
                />
              </div>
              <VideoPopup
                show={show}
                setShow={setShow}
                videoId={videoId}
                setVideoId={setVideoId}
              />
            </>
          )}
        </>
      ) : (
        <div className="detailsBannerSkeleton contentWrapper">
          <div className="left skeleton"></div>
          <div className="right">
            <div className="row skeleton"></div>
            <div className="row skeleton"></div>
            <div className="row skeleton"></div>
            <div className="row skeleton"></div>
            <div className="row skeleton"></div>
            <div className="row skeleton"></div>
            <div className="row skeleton"></div>
          </div>
        </div>
      )}
    </section>
  );
}
