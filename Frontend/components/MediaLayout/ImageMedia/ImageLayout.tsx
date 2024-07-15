import React from "react";

import { ImageData } from "@/lib/types";
import ImageFrame from "./ImageFrame";

const ImageLayout = ({
  imageData,
  noData,
  refProp,
}: {
  imageData: ImageData[];
  noData: boolean;
  refProp: any;
}) => {
  return (
    <>
      {imageData.map((image, index) => {
        if (index === imageData.length - 1 && !noData) {
          return (
            <div key={image.image_id} className="mt-2 w-full" ref={refProp}>
              <ImageFrame image={image} />
            </div>
          );
        } else {
          return (
            <div key={image.image_id} className="mt-2 w-full">
              <ImageFrame image={image} />
            </div>
          );
        }
      })}
    </>
  );
};

export default ImageLayout;
