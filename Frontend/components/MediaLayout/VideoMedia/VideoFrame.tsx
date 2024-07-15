"use client";

import React, { useState } from "react";

import VideoModal from "./VideoModal";
import { FaCirclePlay } from "react-icons/fa6";

import { VideoData } from "@/lib/types";

const VideoFrame = ({ video }: { video: VideoData }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const openModal = (video_url: string) => {
    setSelectedVideo(video_url);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedVideo(null);
    setIsModalOpen(false);
  };

  return (
    <>
      <div
        className="w-full rounded-lg border border-black border-solid"
        onClick={() => openModal(video.video_url)}
      >
        {video.preview_image_url === "" ? (
          <div className="w-full h-28 flex justify-center items-center bg-black">
            <FaCirclePlay size={30} className="text-neutral-300" />
          </div>
        ) : (
          <div
            className='w-full h-28 flex justify-center items-center bg-cover bg-center'
            style={{
              backgroundImage: `url(${video.preview_image_url})`
            }}
          >
            <FaCirclePlay size={30} className="text-neutral-300" />
          </div>
        )}
        <div className="flex flex-col p-2">
          <span className="font-bold text-lg truncate">{video.video_id}</span>
          <span className="flex justify-between font-light">
            <span>Duration:</span>
            <span>{video.duration}</span>
          </span>
          <span className="flex justify-between font-light">
            <span>Date:</span>
            <span>{video.timestamp.split("T")[0]}</span>
          </span>
        </div>
      </div>
      {isModalOpen && selectedVideo && (
        <VideoModal video_url={selectedVideo} onClose={closeModal} />
      )}
    </>
  );
};

export default VideoFrame;
