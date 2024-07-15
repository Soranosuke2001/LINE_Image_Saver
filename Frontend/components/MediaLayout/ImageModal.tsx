import React from "react";

import { saveAs } from "file-saver";
import { MdOutlineFileDownload } from "react-icons/md";

const ImageModal = ({
  image_url,
  image_id,
  onClose,
}: {
  image_url: string;
  image_id: string;
  onClose: any;
}) => {
  const handleDownload = () => {
    saveAs(image_url, image_id);
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div className="relative">
        <img
          src={image_url}
          alt="Selected"
          className="max-w-full max-h-screen"
        />
      </div>
      <div
        className="absolute right-4 bottom-4 bg-neutral-600 rounded-lg"
        onClick={handleDownload}
      >
        <MdOutlineFileDownload size={40} className="text-white" />
      </div>
    </div>
  );
};

export default ImageModal;
