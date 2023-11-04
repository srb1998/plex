"use client"
import Image from "next/image"
import dayjs from "dayjs"
import CircleRating from "../circleRating/CircleRating"
import Genres from "../genres/Genres"
import {FaPlay} from "react-icons/fa6"
import VideoPopup from "@/pages/videoPopup/VideoPopup"
import { useState } from "react"

import "./style.scss";

export default function Banner({data,loading,video,media_type,id}) {
    const url ="https://image.tmdb.org/t/p/original"
    const [show, setShow] = useState(false)
    const [videoId, setVideoId] = useState(null)

    const toHoursAndMinutes = (totalMinutes) => {
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
    };
    const handleClick = () => {
      const URL = process.env.NEXT_PUBLIC_URL;
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
                    src={url + data.poster_path}
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
                      {media_type === "movie" ? data?.title.charAt(0) : data?.name.charAt(0)}
                      </span>
                      {`${media_type === "tv" ?data?.name.slice(1): data?.title.slice(1)} (${dayjs(
                        data?.release_date
                      ).format("YYYY")})`}
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
                      <CircleRating rating={data.vote_average.toFixed(1)} />
                      User Score
                    </h3>
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
                    {data.release_date && (
                      <div>
                        <span className="mr-2 leading-6 font-medium font-inter">
                          Release Date:{" "}
                        </span>
                        <span className="mr-2 leading-6 opacity-50 font-inter">
                          {dayjs(data.release_date).format("MMM D, YYYY")}
                        </span>
                      </div>
                    )}
                    {data.runtime && (
                      <div className="mr-2 leading-6">
                        <span className="mr-2 leading-6 font-semibold">
                          Runtime:{" "}
                        </span>
                        <span className="mr-2 leading-6 opacity-50">
                          {toHoursAndMinutes(data.runtime)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="w-full flex top-0 left-0 inset-0 opacity-10">
                <Image
                  src={url + data?.backdrop_path}
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
