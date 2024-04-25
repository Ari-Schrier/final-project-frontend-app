import axios from "axios";
const SETS_API = "http://localhost:4000/api/sets";

export const getSetsBy = async(user:any) => {
    const response = await axios.get(`${SETS_API}/author/${user.username}`);
    return response.data;
  }

export const addSet = async (set:any) => {
  const response = await axios.post(SETS_API, set);
  return response.data;
}

export const deleteSet = async (name: any) => {
  const response = await axios.delete(`${SETS_API}/${name}`);
  return response.data;
}

export const getSet = async (name:any) => {
  const response = await axios.get(`${SETS_API}/all/${name}`);
  return response.data[0];
}