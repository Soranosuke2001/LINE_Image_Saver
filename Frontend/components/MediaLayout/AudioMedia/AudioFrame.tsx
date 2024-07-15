"use client";

import React, { useState } from "react";

import { FaCirclePlay } from "react-icons/fa6";

import AudioModal from "./AudioModal"; 
import { AudioData } from "@/lib/types";

const AudioFrame = ({ audio }: { audio: AudioData }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedAudio, setSelectedAudio] = useState<string | null>(null);

  const openModal = (video_url: string) => {
    setSelectedAudio(video_url);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedAudio(null);
    setIsModalOpen(false);
  };

  return (
    <>
      <div
        className="w-full rounded-lg border border-black border-solid"
        onClick={() => openModal(audio.audio_url)}
      >
        <div className="w-full h-28 flex justify-center items-center bg-black">
          <FaCirclePlay size={30} className="text-neutral-300" />
        </div>
        <div className="flex flex-col p-2">
          <span className="font-bold text-lg truncate">Audio: {audio.audio_id}</span>
          <span className="flex justify-between font-light">
            <span>Duration:</span>
            <span>{audio.duration}</span>
          </span>
          <span className="flex justify-between font-light">
            <span>Date:</span>
            <span>{audio.timestamp.split("T")[0]}</span>
          </span>
        </div>
      </div>
      {isModalOpen && selectedAudio && (
        <AudioModal audio_url={selectedAudio} onClose={closeModal} />
      )}
    </>
  );
};

export default AudioFrame;
