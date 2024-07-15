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
  timestamp: Date;
};

export type ImageType = {
  data: ImageData[];
  month: string;
  year: string;
};
