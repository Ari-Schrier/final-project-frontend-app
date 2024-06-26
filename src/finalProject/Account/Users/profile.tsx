import * as client from "./client";
import { getSetsBy } from "../../Sets/client";
import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
export default function Profile() {
  const [profile, setProfile] = useState({ username: "nobody", password: "", 
    email: "", role: "USER" });
    const [comments, setComments] = useState([]);
    const [sets, setSets] = useState<any[]>([]);
    const fetchSets = async () => {
        const mySets = await getSetsBy(profile);
        setSets(mySets);
    }
  const navigate = useNavigate();
  const fetchProfile = async () => {
    const account = await client.profile();
    setProfile(account);
  };
  const fetchComments = async () => {
    const myComments = await client.getCommentsBy(profile.username);
    setComments(myComments);

  };
  const signout = async () => {
    await client.signout();
    navigate("/Account/Signin");
  };
  const save = async () => {
    await client.updateUser(profile);
  };
  useEffect(() => {
    fetchProfile();
  }, []);
  useEffect(()=>{fetchComments();},[profile]);
  useEffect(()=>{fetchSets();},[profile]);
  return (
    <div className="container">
      <h1>My Profile:</h1>
      {profile.username ? (
        <div>
            <div className="input-group">
                <span className="input-group-text">Username:</span>
                <input className="form-control"
                    value={profile.username} onChange={(e) =>
                    setProfile({ ...profile, username: e.target.value })}/>
            </div>
            <div className="input-group">
                <span className="input-group-text">Password:</span>
                <input className="form-control"
                    value={profile.password} onChange={(e) =>
                        setProfile({ ...profile, password: e.target.value })}/>
            </div>
            <div className="input-group">
                <span className="input-group-text">Email:</span>
                <input className="form-control"
                    value={profile.email} onChange={(e) =>
                        setProfile({ ...profile, email: e.target.value })}/>
            </div>
            <div className="input-group">
                <span className="input-group-text">User Status:</span>
                <select className="form-select"
                    onChange={(e) =>
                        setProfile({ ...profile, role: e.target.value })}>
                        <option value="ADMIN">Admin</option>
                        <option value="USER">User</option>
                        <option value="WARNED">Warned User</option>
                </select>
            </div>
        <div>
            <button className="btn btn-success" onClick={save}>
                Save
            </button>
            <button className="btn btn-danger" onClick={signout}>
                Sign Out
            </button>
        </div>

        <div className="row">
            <div className="col-md-6 col-12">
                <ul className="list-group">
                    <li className="list-group-item bg-warning">Comment History:</li>
                    {comments.map((comment:any)=>
                        <li className="list-group-item">
                        "{comment.text}" on <span className="text-primary" onClick={()=>navigate(`/Tunes/${comment.subjectNum}`)}>{comment.subjectName}</span>
                    </li>)}

                </ul>
            </div>
            <div className="col-md-6 col-12">
              <ul className="list-group">
                <li className="list-group-item bg-warning">Sets:</li>
                    {sets.map((set:any)=>
                        <li className="list-group-item">
                        <span className="text-primary" onClick={()=>navigate(`/Sets/${set.name}`)}>{set.name}</span>
                    </li>)}
              </ul>
            </div>
        </div>
        </div>
      ): <Navigate to="/account/signin" />}
    </div>
  );
}
