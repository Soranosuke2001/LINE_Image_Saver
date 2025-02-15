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

  return [
    {
      data,
      month,
      year,
    },
  ];
};
