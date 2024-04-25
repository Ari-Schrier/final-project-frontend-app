import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { TroveState } from "../../store";
import { Link, useParams } from "react-router-dom";
import { findTune, lookupTune, createComment, getCommentsFor, deleteAComment } from "../client";
import { setTune } from "../reducer";
import * as setClient from "../../Sets/client"
import { profile } from "../../Account/Users/client";
import { current } from "@reduxjs/toolkit";

function Tune(){
    const {sessionId} = useParams();
    const [currentUser, setCurrentUser] = useState({username:"nobody", role:"USER"});
    const [selectedSet, setSelectedSet] = useState<any>({name:"nil", tunes:[]})
    const [sets, setSets] = useState<any>([]);
    const [authorSets, setAuthorSets] = useState<any>([]);
    const tune = useSelector((state: TroveState) => 
        state.tunesReducer.tune);
    const dispatch = useDispatch();
    const [thoughts, setThoughts] = useState("");
    const[comments, setComments] = useState([]);
    const addToSet = () => {
        selectedSet.tunes.push(tune.sessionId);
        console.log(selectedSet);
        setClient.updateSet(selectedSet);
        setSets([...sets, selectedSet])
        
    }
    const getSets = async (person:any) =>{
        const allSets:any = await setClient.getAllSets();
        console.log("Debug starts:");
        console.log(allSets);
        setSets(allSets.filter((set:any)=>set.tunes.includes(tune.name)));
        console.log(setSets);
        setAuthorSets(allSets.filter((set:any)=>set.author === person));
        console.log(authorSets);
    }
    const addComment = ()=>{
        createComment({author:currentUser.username, text:thoughts, subjectNum:tune.sessionId, subjectName: tune.name}).then(()=> {
            getCommentsFor(tune.sessionId).then((comments)=>{setComments(comments); setThoughts("");});
        });
            
    };
    const deleteComment = (commentId:any) => {
        deleteAComment(commentId);
        const newComments = comments.filter((comment:any)=>comment._id !== commentId);
        setComments(newComments);
    }
    useEffect(() => {
        profile().then((prof:any)=>{
            setCurrentUser(prof);
            getSets(prof.username);
        });
        findTune(sessionId)
          .then((tune) =>{
            dispatch(setTune(tune));
            getCommentsFor(tune.sessionId).then((comments)=>setComments(comments));}
        ).catch(error =>{
            lookupTune(sessionId)
            .then((tune) => {
                dispatch(setTune(tune))
            });
        });
    }, []);
    return(
        <div className="row">
            <h1>Length of authorSets: {authorSets.length}</h1>
            <div className="col-3"></div>
            <div className="col-6 text-center"> 
                <div className="h1">{tune.name} ({tune.type})</div>
                {tune.aliases.length > 0?<ul className="list-group border-0">
                    <li className="list-group-item border-0 h4">Also Known As:</li>
                    {tune.aliases.slice(0, 5).map((alias:any) => (
                        <li className="list-group-item border-0 h5">{alias}</li>
                    ))}
                </ul>:<></>}
                <div className="row">
                    <div className="col-12 col-lg-6">
                        <ul className="list-group">
                            <li className="list-group-item h3 bg-warning mb-0">Comments:</li>
                            {comments.map((comment:any) => (
                                <li className="list-group-item">
                                    <Link to={`/account/profile/${comment.author}`}>{comment.author}</Link> says: {comment.text}
                                    {(currentUser.username === comment.author || currentUser.role === "ADMIN") && <button className="float-end btn btn-danger" onClick={()=>deleteComment(comment._id)}>DELETE</button>}
                                    </li>
                            ))}
                            {(currentUser.username) && (currentUser.role !== "WARNED") && <li className="list-group-item">
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <button className="btn btn-lg m-2 btn-success mt-3" onClick={()=>addComment()}>Post</button>
                                    </div>
                                    <textarea className="form-control" value={thoughts} onChange={(e)=>setThoughts(e.target.value)}></textarea>
                                </div>
                            </li>}
                        </ul>
                    </div>
                    <div className="col-12 col-lg-6">
                        <ul className="list-group">
                            <li className="list-group-item h3 bg-warning mb-0">Sets Featuring {tune.name}:</li>
                            {sets.map((set:any) => (
                                <li className="list-group-item">
                                    <Link to={`/account/profile/${set.name}`}>set.name</Link> by: {set.author}
                                </li>
                            ))}
                            {(authorSets.length > 0)? <li className="list-group-item">
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <button className="btn btn-lg m-2 btn-success mt-3" onClick={()=>addToSet()}>Add To Set:</button>
                                    </div>
                                    <select onChange={(e)=>setSelectedSet(e.target.value)} className="form-select">
                                        {authorSets.map((set:any)=>(
                                            <option value={{...set}}>{set.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </li>:<li className="list-group-item"><Link to={"/Sets"}>Make a Set To Add This Tune!</Link></li>}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="col-3"></div>
        </div>

    )
}

export default Tune;