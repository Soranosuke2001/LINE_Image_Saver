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
      <div className="w-full border border-solid border-black" onClick={() => openModal(video.video_url)}>
        {video.preview_image_url === "" ? (
          <div className="w-full h-24 flex justify-center items-center bg-black">
            <FaCirclePlay size={30} className="text-neutral-300"/>
          </div>
        ) : (
          <img src={video.preview_image_url} alt="Video preview image" />
        )}
        <div className="flex flex-col">
          <span>{video.video_id}</span>
          <span>{video.duration}</span>
          <span>{video.timestamp.toISOString().split('T')[0]}</span>
        </div>
      </div>
      {isModalOpen && selectedVideo && (
        <VideoModal video_url={selectedVideo} onClose={closeModal} />
      )}
    </>
  );
};

export default VideoFrame;
