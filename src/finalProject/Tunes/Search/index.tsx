import {Link, useParams} from "react-router-dom";
import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { searchTunes } from "../client";
import { setTunes } from "../reducer";
import { TroveState } from "../../store";


function Search(){
    const {query} = useParams();
    const tuneList = useSelector((state: TroveState) => 
        state.tunesReducer.tunes);
    const dispatch = useDispatch();
    useEffect(() => {
        searchTunes(query)
          .then((tunes:any) =>
            dispatch(setTunes(tunes))
        );
      }, [query]);
    return(
        <div className="container text-center">
            {tuneList.length==0 && <div className="h3">No Tunes Found</div>}
            <ul className="list-group">
                <li className="list-group-item">Search Results:</li>
            {tuneList.map((tune:any) => (
                <li className="list-group-item"><Link to={`/Tunes/${tune.id}`} className="text-decoration-none">{tune.name}</Link></li>
            ))}
            </ul>
        </div>
    );
}
export default Search;