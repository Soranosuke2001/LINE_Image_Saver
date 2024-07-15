import React from "react";

import { FaHeadphones } from "react-icons/fa6";

const AudioModal = ({
  audio_url,
  onClose,
}: {
  audio_url: string;
  onClose: any;
}) => {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div className="relative bg-white p-4 rounded">
        <div className="w-full h-[40vh] flex justify-center items-center bg-black text-white rounded-lg mb-4">
          <FaHeadphones size={70} />
        </div>
        <audio controls className="max-w-full max-h-screen mb-4">
          <source src={audio_url} type="audio/mp3" />
          Your browser does not support the audio tag.
        </audio>
      </div>
    </div>
  );
};

export default AudioModal;
