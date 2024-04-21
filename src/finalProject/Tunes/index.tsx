import {Link} from "react-router-dom";
import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { findTunes } from "./client";
import { setTunes } from "./reducer";
import { TroveState } from "../store";

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
            <li><Link to={`/Tunes/${tune.sessionId}`} className="text-decoration-none">{tune.name}</Link></li>
        ))}
        </ul>
    );
}

export default TuneList;