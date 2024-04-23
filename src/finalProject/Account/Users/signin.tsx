import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "./client";
import * as client from "./client";
export default function Signin() {
  const [credentials, setCredentials] = useState<User>({ _id: "",
    username: "", password: "", firstName: "", lastName: "", role: "USER"
  });
  const navigate = useNavigate();
  const signin = async () => {
    await client.signin(credentials);
    navigate("/Account/Profile");
  };
  return (
    <div className="container">
      <h1 className="text-center">Sign In Here!</h1>
      <div className="input-group mb-3">
        <span className="input-group-text">Username:</span>
        <input type="text" value={credentials.username} className="form-control" onChange={(e) =>
          setCredentials({ ...credentials, username: e.target.value })}/>
      </div>
      <div className="input-group mb-3">
        <span className="input-group-text">Password:</span>
        <input type="password" className="form-control" value={credentials.password} onChange={(e) =>
          setCredentials({ ...credentials, password: e.target.value })}/>
      </div>
      <div>
        <button className="btn btn-secondary" onClick={signin}> Sign In </button> <button className="btn btn-primary" onClick={()=>navigate("/Account/Signup")}>Sign Up</button>
      </div>
    </div>
  );
}
