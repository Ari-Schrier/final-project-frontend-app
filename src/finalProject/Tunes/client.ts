import axios from "axios";
const TUNES_API = "http://localhost:4000/api/tunes";

export const findTunes = async () => {
  const response = await axios
    .get(TUNES_API);
  return response.data;
};

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
  console.log("Adding new tune:")
  console.log(tune);
  const responsetwo = await axios.post(TUNES_API, tune);
  return responsetwo.data
}