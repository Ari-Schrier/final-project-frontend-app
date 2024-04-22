import axios from "axios";
const TUNES_API = "http://localhost:4000/api/tunes";
const COMMENTS_API = "http://localhost:4000/api/comments";

export const findTunes = async () => {
  const response = await axios
    .get(TUNES_API);
  return response.data;
};

export const updateTune = async (payload:any) => {
  const response = await axios.put(`${TUNES_API}/${payload._id}`,  payload);
  return response.data;
}

export const deleteAComment = async(target:any) => {
  const response = await axios.delete(`${COMMENTS_API}/${target}`);
}

export const createComment = async(payload:any) => {
  const response = await axios.post(COMMENTS_API, payload);
  return response.data;
}

export const getCommentsFor = async(tuneId:any) => {
  const response = await axios.get(`${COMMENTS_API}/${tuneId}`);
  return response.data;
}

export const searchTunes = async (query:any) => {
  const response:any = await axios.get(`https://thesession.org/tunes/search?q=${query}&format=json`);
  console.log(response.data.tunes);
  return response.data.tunes;
}

export const findTune = async (name:any)=>{
  const response = await axios
    .get(`${TUNES_API}/${name}`);
  return response.data;
};

export const lookupTune = async (query:any) => {
  const response:any = await axios.get(`https://thesession.org/tunes/${query}?format=json`);
  const tune = {
    name: response.data.name,
    type: response.data.type,
    aliases: response.data.aliases,
    comments: [],
    sets:[],
    sessionId: query
  }
  const responsetwo = await axios.post(TUNES_API, tune);
  return responsetwo.data
}