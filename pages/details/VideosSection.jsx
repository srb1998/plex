"use client"
import { useState } from "react"
import VideoPopup from "@/pages/videoPopup/VideoPopup"
import {FaPlay} from "react-icons/fa6"
import dynamic from "next/dynamic"


const VideosSection = ({ data, loading }) => {
    const [show, setShow] = useState(false);
    const [videoId, setVideoId] = useState(null);

    const loadingSkeleton = () => {
      return (
        <div className="skItem">
          <div className="thumb skeleton"></div>
          <div className="row skeleton"></div>
          <div className="row2 skeleton"></div>
        </div>
      );
  };

  return (
    <div className="relative overflow-hidden md:h-[300px] h-[200px]">
      <div className="ml-4 md:text-[32px] text-[24px] text-white mb-2 font-semibold">Official Videos</div>

      {!loading ? (
        <div className="flex gap-[10px] overflow-y-hidden -mr-5 md:ml-4 ml-4 md:p-0 md:m-0 md:gap-5">
          {data?.results?.map((video) => (
            <div
              key={video.id}
              className="w-[145px] flex-shrink-0 md:w-1/4 cursor-pointer"
              onClick={() => {
                setVideoId(video.key);
                setShow(true);
              }}
            >
              <div className="mb-4 relative rounded-2xl overflow-hidden shadow-xl transition-shadow ">
                <img
                  src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}
                  fill
                />
                <div className="absolute inset-0 flex-center text-white md:text-3xl text-xl hover:text-[#F4900E]"><FaPlay /></div> 
              </div>
              <div className="text-white md:text-[18px] text-[14px] font-medium font-inter line-clamp-2">{video.name}</div>
            </div>
          ))}
          <VideoPopup
            show={show}
            setShow={setShow}
            videoId={videoId}
            setVideoId={setVideoId}
          />
        </div>
      ) : (
        <div className="videoSkeleton">
          {loadingSkeleton()}
          
        </div>
      )}
    </div>
  );
}

export default dynamic (() => Promise.resolve(VideosSection), {ssr: false})
