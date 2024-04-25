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
    const [selectedSet, setSelectedSet] = useState<any>({name:"Nuthng.", tunes:[]})
    const [sets, setSets] = useState<any>([]);
    const [authorSets, setAuthorSets] = useState<any>([]);
    const tune = useSelector((state: TroveState) => 
        state.tunesReducer.tune);
    const dispatch = useDispatch();
    const [thoughts, setThoughts] = useState("");
    const[comments, setComments] = useState([]);
    const addToSet = () => {
        console.log(selectedSet);
        const translated = JSON.parse(selectedSet);
        translated.tunes.push(tune.sessionId);
        setClient.updateSet(translated);
        setSets([...sets, translated])
        
    }
    const getSets = async (person:any) =>{
        const allSets:any = await setClient.getAllSets();
        const playlist = allSets.filter((each:any)=>each.tunes.includes(sessionId));
        //Would love to do this with a lambda function. For some reason it stops working if I do.
        setSets(playlist);
        setAuthorSets(allSets.filter((set:any)=>set.author === person));
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
                                    <Link to={`/sets/${set.name}`}>{set.name}</Link> by: <Link to={`/account/profile/${set.author}`}>{set.author}</Link>
                                </li>
                            ))}
                            {(authorSets.length > 0)? <li className="list-group-item">
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <button className="btn btn-lg m-2 btn-success mt-3" onClick={()=>addToSet()}>Add To Set:</button>
                                    </div>
                                    <select onChange={(e)=>setSelectedSet(e.target.value)} className="form-select">
                                        <option value="NOPE" selected>Choose a set to add to...</option>
                                        {authorSets.map((set:any)=>(
                                            <option value={JSON.stringify(set)}>{set.name}</option>
                                            //I'm sure that there's a better way to do this than my JSON solution, but it's due tomorrow and I've been trying
                                            //to figure out what a better solution might look like for the past three and a half hours.
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