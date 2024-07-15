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

  const mediaFiles = data.map(
    ({
      image_id,
      image_url,
      timestamp,
    }: {
      image_id: string;
      image_url: string;
      timestamp: string;
    }) => {
      return {
        image_id,
        image_url,
        timestamp: new Date(timestamp),
      };
    }
  );

  return [
    {
      data: mediaFiles,
      month,
      year,
    },
  ];
};
