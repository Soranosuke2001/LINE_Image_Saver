"use client";

import React, { useState } from "react";

import { VideoData } from "@/lib/types";
import VideoModal from "./VideoModal";

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
        className="w-full"
        onClick={() => openModal(video.video_url)}
      >
        {video.video_id}
      </div>
      {isModalOpen && selectedVideo && (
        <VideoModal
          video_url={selectedVideo}
          onClose={closeModal}
        />
      )}
    </>
  );
};

export default VideoFrame;
