"use client";

import React, { useState } from "react";

import { ImageData } from "@/lib/types";
import ImageModal from "./ImageModal";

const ImageFrame = ({ image }: { image: ImageData }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedImageName, setSelectedImageName] = useState<string | null>(
    null
  );

  const openModal = (image_url: string, image_id: string) => {
    setSelectedImage(image_url);
    setSelectedImageName(image_id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setSelectedImageName(null);
    setIsModalOpen(false);
  };

  return (
    <>
      <div
        className="w-full"
        onClick={() => openModal(image.image_url, image.image_id)}
      >
        <img src={image.image_url} alt={image.image_id} />
      </div>
      {isModalOpen && selectedImage && selectedImageName && (
        <ImageModal
          image_url={selectedImage}
          image_id={selectedImageName}
          onClose={closeModal}
        />
      )}
    </>
  );
};

export default ImageFrame;
