import React from "react";

import NoData from "./NoData";
import SectionTitle from "./SectionTitle";
import ImageLayout from "./ImageMedia/ImageLayout";

import VideoLayout from "./VideoMedia/VideoLayout";
import AudioLayout from "./AudioMedia/AudioLayout";

const MediaLayout = ({
  mediaType,
  mediaFiles,
  refProp,
  noData,
}: {
  mediaType: string;
  mediaFiles: any;
  refProp: any;
  noData: boolean;
}) => {
  return (
    <div className="flex-1 mt-12 w-full overflow-auto border-4 border-solid border-white">
      {noData && mediaFiles.length === 0 && <NoData />}
      {mediaFiles.map(({ data, month, year } : any, index: number) => (
        <div key={index} className="mb-5">
          <SectionTitle year={year} month={month} />

          <div className="grid grid-cols-2">
            {mediaType === "image" && (
              <ImageLayout imageData={data} noData={noData} refProp={refProp} />
            )}
            {mediaType === "video" && (
              <VideoLayout videoData={data} noData={noData} refProp={refProp}/>
            )}
            {mediaType === "audio" && (
              <AudioLayout audioData={data} noData={noData} refProp={refProp}/>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MediaLayout;
