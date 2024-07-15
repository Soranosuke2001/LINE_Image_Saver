import axios from "axios";

export const fetchMediaFiles = async (mediaType: string) => {
  const response = await axios.get(`/api/fetch/${mediaType}`);

  if (response.status !== 200) {
    return "Error";
  }

  const { message: data, month, year } = response.data;

  if (data.length === 0) {
    return "NoData";
  }

  let mediaFiles = null;

  if (mediaType === "image") {
    mediaFiles = data.map((image: any) => {
      return {
        ...image,
        timestamp: new Date(image.timestamp),
      };
    });
  } else if (mediaType === "video") {
    mediaFiles = data.map((video: any) => {
      return {
        ...video,
        timestamp: new Date(video.timestamp),
      };
    });
  } else if (mediaType === "audio") {
    mediaFiles = data.map((audio: any) => {
      return {
        ...audio,
      };
    });
  } else {
    mediaFiles = data.map((file: any) => {
      return {
        ...file,
      };
    });
  }

  return [
    {
      data: mediaFiles,
      month,
      year,
    },
  ];
};
