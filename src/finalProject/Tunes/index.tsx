import {Link} from "react-router-dom";
import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { findTunes } from "./client";
import { setTunes } from "./reducer";
import { TroveState } from "../store";

const TUNESAPI = "http://localhost:4000/api/tunes";

function TuneList(){
    const tuneList = useSelector((state: TroveState) => 
        state.tunesReducer.tunes);
    const dispatch = useDispatch();
    useEffect(() => {
        findTunes()
          .then((tunes) =>
            dispatch(setTunes(tunes))
        );
      }, []);
    return(
        <ul>
        {tuneList.map((tune:any) => (
            <li>{tune.name}</li>
        ))}
        </ul>
    );
}

export default TuneList;