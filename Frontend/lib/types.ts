export type CustomImage = {
  duration: number;
  delay: number;
  width: string;
  height: string;
  left: string;
  src: string;
};

export type ImageData = {
  image_id: string;
  image_url: string;
  timestamp: string;
};

export type ImageType = {
  data: ImageData[];
  month: string;
  year: string;
};

export type VideoData = {
  video_id: string;
  video_url: string;
  preview_image_url: string;
  duration: number;
  timestamp: string;
};

export type VideoType = {
  data: VideoData[];
  month: string;
  year: string;
};

export type AudioData = {
  audio_id: string;
  audio_url: string;
  duration: number;
  timestamp: string;
};

export type FileType = {
  data: VideoData[];
  month: string;
  year: string;
};
