import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as client from "./client";
export default function Signup() {
  const [error, setError] = useState("");
  const [user, setUser] = useState({ username: "", password: "", email: "" });
  const navigate = useNavigate();
  const signup = async () => {
    try {
      await client.signup(user);
      navigate("/Account/Profile");
    } catch (err:any) {
      setError(err.response.data.message);
    }
  };
  const signout = async () => {
    await client.signout();
    navigate("/Account/Signin");
  };

  return (
    <div className="container">
        <h1>Signup</h1>
        {error && <div>{error}</div>}
        <div className="input-group">
          <span className="input-group-text">Username:</span>
          <input className="form-control" value={user.username} onChange={(e) => setUser({
              ...user, username: e.target.value })} />
        </div>
        <div className="input-group">
          <span className="input-group-text">Email:</span>
          <input className="form-control" value={user.email} onChange={(e) => setUser({
              ...user, email: e.target.value })} />
        </div>
        <div className="input-group">
        <span className="input-group-text">Password:</span>
        <input className="form-control" value={user.password} onChange={(e) => setUser({
            ...user, password: e.target.value })} />
        </div>
        <div className="row">
        <button className="btn btn-success btn-block" onClick={signup}> Signup </button>
        </div>
    </div>
  );
}
