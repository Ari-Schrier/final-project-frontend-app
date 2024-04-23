import Signin from "./Users/signin";
import Profile from "./Users/profile";
import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { profile } from "./Users/client";
export default function Account() {
  return (
    <div className="container-fluid">
      <Routes>
        <Route path="/" element={<Navigate to="/Account/Signin" />} />
        <Route path="/Signin" element={<Signin />} />
        <Route path="/Profile" element={<Profile />} />
      </Routes>
    </div>
  );
}
