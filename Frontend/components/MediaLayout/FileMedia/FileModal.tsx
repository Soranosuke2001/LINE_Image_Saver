"use client";

import React from "react";

import { FaHeadphones } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { saveAs } from "file-saver";

const FileModal = ({
  file_url,
  filename,
  onClose,
}: {
  file_url: string;
  filename: string;
  onClose: any;
}) => {
  const handleDownload = () => {
    saveAs(file_url, filename);
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div className="relative bg-white p-4 rounded">
        <div className="w-full h-[40vh] flex justify-center items-center bg-black text-white rounded-lg mb-4">
          <FaHeadphones size={70} />
          <Button onClick={handleDownload} className="bg-white">Download File</Button>
        </div>
      </div>
    </div>
  );
};

export default FileModal;
