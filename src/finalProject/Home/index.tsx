import {Link} from "react-router-dom";
import { useState, useEffect } from "react";
import * as client from "../Account/Users/client";

function Home() {
    const [profile, setProfile] = useState({ username: "nobody", password: "", email: "", role: "USER" });
    const [comments, setComments] = useState([]);
    const fetchProfile = async () => {
      const account = await client.profile();
      setProfile(account);
    };
    const fetchComments = async () => {
      const myComments = await (profile.username?client.getCommentsBy(profile.username):client.getComments());
      console.log(myComments);
      setComments(myComments.slice(0, 15));
  
    };
    useEffect(() => {
      fetchProfile();
    }, []);
    useEffect(()=>{fetchComments();},[profile]);
    return (
      <div className="container my-5">
        <div className="row">
          <div className="col-12 col-md-6">
          {(profile.username===undefined)?
          <>
            <h1>Welcome to TradTrove, the internet's #2 resource for folk music! </h1>
            <div><Link className="h3 text-primary" to={"/account/signup"}>Join to comment on your favorite songs, assemble sets, and share your passion for trad with the world!</Link></div>
            <div><Link className="h3 text-primary" to={"/account/signin"}>Already a member? Sign in here!</Link></div>
          </>:
          <>
            <h1>Welcome back, {profile.username}!</h1>
          </>}
          </div>
          <div className="col-12 col-md-6">
            <ul className="list-group">
              <li className="list-group-item bg-warning">
                {(profile.username===undefined)?"Recent Comments:":`${profile.username}'s Recent Comments:`}
              </li>
              {comments.map((comment:any) => (
                        <li className="list-group-item">
                            <span>{comment.author} says: {comment.text} about {comment.subjectName}</span>
                            </li>
                    ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
  
  export default Home;