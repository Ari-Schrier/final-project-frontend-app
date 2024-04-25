import * as client from "../client";
import { getSetsBy } from "../../../Sets/client";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
export default function Profile() {
    const {user} = useParams();
  const [profile, setProfile] = useState({ username: "nobody", password: "", 
    email: "", role: "USER" });
    const [comments, setComments] = useState([]);
    const [sets, setSets] = useState<any[]>([]);
    const fetchSets = async () => {
        const mySets = await getSetsBy(user);
        setSets(mySets);
    }
  const navigate = useNavigate();
  const fetchProfile = async () => {
    const account = await client.profile();
    setProfile(account);
  };
  const fetchComments = async () => {
    const myComments = await client.getCommentsBy(user);
    setComments(myComments);

  };
  useEffect(() => {
    fetchProfile();
  }, []);
  useEffect(()=>{fetchComments();},[]);
  useEffect(()=>{fetchSets();},[]);
  return (
    <div className="container">
      <h1>{user}'s Profile</h1>
      {profile.username}
      {profile.role}
        <div className="row">
            <div className="col-md-6 col-12">
                <ul className="list-group">
                    <li className="list-group-item bg-warning">Comment History:</li>
                    {comments.map((comment:any)=>
                        <li className="list-group-item">
                        "{comment.text}" on <span className="text-primary" onClick={()=>navigate(`/tunes/${comment.subjectNum}`)}>{comment.subjectName}</span>
                    </li>)}

                </ul>
            </div>
            <div className="col-md-6 col-12">
              <ul className="list-group">
                <li className="list-group-item bg-warning">Sets:</li>
                    {sets.map((set:any)=>
                        <li className="list-group-item">
                        <span className="text-primary" onClick={()=>navigate(`/sets/${set.name}`)}>{set.name}</span>
                    </li>)}
              </ul>
            </div>
        </div>
        {(profile.role=="ADMIN") && 
        <>
        <h2>Admin Controls</h2>
        <div className="flex flex-row justify-content-around align-items-center">
          <button className="btn btn-danger" onClick={()=>client.changePermissions(user, "WARNED")}>Warn User</button>
          <button className="btn btn-primary" onClick={()=>client.changePermissions(user, "USER")}>Un-Warn User</button>
          <button className="btn btn-success" onClick={()=>client.changePermissions(user, "ADMIN")}>Promote User</button>
        </div>
        </>}
        </div>
  );
}
