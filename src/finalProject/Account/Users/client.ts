import axios from "axios";
export const USERS_API = "http://localhost:4000/api/users";
export const COMMENTS_API = "http://localhost:4000/api/comments";
export const signup = async (user:any) => {
  const response = await axios.post(`${USERS_API}/signup`, user);
  return response.data;
};
export interface User { _id: string; username: string; password: string; role: string;
firstName: string, lastName: string };

export const signin = async (credentials: User) => {
  const response = await axios.post( `${USERS_API}/signin`, credentials );
  return response.data;
};

export const changePermissions = async (name:any, label:any) => {
  await axios.get(`${USERS_API}/${name}`).then((user:any)=>
    {console.log(user.data);
      axios.put(`${USERS_API}/${user.data._id}`, {...user.data, role:label})}
  )
};

export const getComments = async ()=>{
  const response = await axios.get(`${COMMENTS_API}/all`);
  return response.data;
};

export const signout = async () => {
    const response = await axios.post(`${USERS_API}/signout`);
    return response.data;
};

export const profile = async () => {
  const response = await axios.post(`${USERS_API}/profile`);
  return response.data;
};

export const updateUser = async (user: any) => {
  const response = await axios.put(`${USERS_API}/${user._id}`, user);
  return response.data;
};

export const getCommentsBy = async (user:any) =>{
  const response = await axios.get(`${COMMENTS_API}/user/${user}`);
  return response.data
};

  