import axios from "axios";
const TUNES_API = "http://localhost:4000/api/tunes";
export const findTunes = async () => {
  const response = await axios
    .get(TUNES_API);
  return response.data;
};
