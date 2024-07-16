import React from "react";

import NoData from "./NoData";
import SectionTitle from "./SectionTitle";

import ImageLayout from "./ImageMedia/ImageLayout";
import VideoLayout from "./VideoMedia/VideoLayout";
import AudioLayout from "./AudioMedia/AudioLayout";
import FileLayout from "./FileMedia/FileLayout";
import { Loader2 } from "lucide-react";

const MediaLayout = ({
  mediaType,
  mediaFiles,
  refProp,
  noData,
  isFetching,
}: {
  mediaType: string;
  mediaFiles: any;
  refProp: any;
  noData: boolean;
  isFetching: boolean;
}) => {
  return (
    <div className="flex-1 mt-12 w-full overflow-auto border-4 border-solid border-white">
      {noData && mediaFiles.length === 0 && <NoData />}
      {mediaFiles.map(({ data, month, year } : any, index: number) => (
        <div key={index} className="mb-5">
          <SectionTitle year={year} month={month} />

          <div className="grid grid-cols-2 gap-x-2">
            {mediaType === "image" && (
              <ImageLayout imageData={data} noData={noData} refProp={refProp} />
            )}
            {mediaType === "video" && (
              <VideoLayout videoData={data} noData={noData} refProp={refProp}/>
            )}
            {mediaType === "audio" && (
              <AudioLayout audioData={data} noData={noData} refProp={refProp}/>
            )}
            {mediaType === "file" && (
              <FileLayout fileData={data} noData={noData} refProp={refProp}/>
            )}
          </div>
        </div>
      ))}
      {isFetching && (
        <div className="w-full flex justify-center">
          <Loader2 className="animate-spin" />
        </div>
      )}
    </div>
  );
};

export default MediaLayout;
