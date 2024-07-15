import React from "react";

const VideoModal = ({
  video_url,
  onClose,
}: {
  video_url: string;
  onClose: any;
}) => {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div className="relative bg-white p-4 rounded">
        <video controls className="max-w-full max-h-screen mb-4">
          <source src={video_url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default VideoModal;
