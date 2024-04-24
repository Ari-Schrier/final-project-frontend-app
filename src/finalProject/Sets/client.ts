import axios from "axios";
const SETS_API = "http://localhost:4000/api/sets";

export const getSetsBy = async(user:any) => {
    const response = await axios.get(`${SETS_API}/author/${user.username}`);
    return response.data;
  }