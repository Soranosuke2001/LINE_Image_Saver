import React from "react";

import AudioFrame from "./AudioFrame";

import { AudioData } from "@/lib/types";

const AudioLayout = ({
  audioData,
  noData,
  refProp,
}: {
  audioData: AudioData[];
  noData: boolean;
  refProp: any;
}) => {
  return (
    <>
      {audioData.map((audio, index) => {
        if (index === audioData.length - 1 && !noData) {
          return (
            <div key={audio.audio_id} className="mt-2 w-full" ref={refProp}>
              <AudioFrame audio={audio} />
            </div>
          );
        } else {
          return (
            <div key={audio.audio_id} className="mt-2 w-full">
              <AudioFrame audio={audio} />
            </div>
          );
        }
      })}
    </>
  );
};

export default AudioLayout;
