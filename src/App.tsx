import React from 'react';
import logo from './logo.svg';
import './App.css';
import FinalProject from './finalProject';
import {HashRouter} from "react-router-dom";
import {Routes, Route, Navigate} from "react-router";

function App() {
  return (
    <HashRouter>
      <FinalProject />
    </HashRouter>
  );
}

export default App;
