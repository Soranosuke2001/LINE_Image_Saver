import React from "react";

import VideoFrame from "./VideoFrame";

import { VideoData } from "@/lib/types";

const VideoLayout = ({
  videoData,
  noData,
  refProp,
}: {
  videoData: VideoData[];
  noData: boolean;
  refProp: any;
}) => {
  return (
    <>
      {videoData.map((video, index) => {
        if (index === videoData.length - 1 && !noData) {
          return (
            <div key={video.video_id} className="mt-2 w-full" ref={refProp}>
              <VideoFrame video={video} />
            </div>
          );
        } else {
          return (
            <div key={video.video_id} className="mt-2 w-full">
              <VideoFrame video={video} />
            </div>
          );
        }
      })}
    </>
  );
};

export default VideoLayout;
