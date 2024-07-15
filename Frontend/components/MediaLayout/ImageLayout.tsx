import React from "react";

import SectionTitle from "./SectionTitle";
import ImageFrame from "./ImageFrame";

import { ImageType } from "@/lib/types";

const ImageLayout = ({
  mediaFiles,
  refProp,
  noData,
}: {
  mediaFiles: ImageType[];
  refProp: any;
  noData: boolean;
}) => {
  return (
    <div className="flex-1 mt-12 w-full overflow-auto border-4 border-solid border-white">
      {mediaFiles.map(({ data, month, year }, index) => (
        <div key={index} className="mb-5">
          <SectionTitle year={year} month={month} />
          <div className="grid grid-cols-2">
            {data.map((image, index) => {
              if (index === data.length - 1 && !noData) {
                return (
                  <div
                    key={image.image_id}
                    className="mt-2 w-full"
                    ref={refProp}
                  >
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
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImageLayout;
