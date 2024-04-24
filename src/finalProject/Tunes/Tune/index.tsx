import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { TroveState } from "../../store";
import { Link, useParams } from "react-router-dom";
import { findTune, lookupTune, createComment, getCommentsFor, deleteAComment } from "../client";
import { setTune } from "../reducer";
import { profile } from "../../Account/Users/client";
import { current } from "@reduxjs/toolkit";

function Tune(){
    const {sessionId} = useParams();
    const [currentUser, setCurrentUser] = useState({username:"nobody", role:"USER"});
    const tune = useSelector((state: TroveState) => 
        state.tunesReducer.tune);
    const dispatch = useDispatch();
    const [thoughts, setThoughts] = useState("");
    const[comments, setComments] = useState([]);
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
        profile().then((prof:any)=>setCurrentUser(prof));
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
            {currentUser.username}
            {currentUser.role}
            <div className="col-3"></div>
            <div className="col-6 text-center"> 
                <div className="h1">{tune.name}</div>
                {tune.aliases.length > 0?<ul className="list-group border-0">
                    <li className="list-group-item border-0 h4">Also Known As:</li>
                    {tune.aliases.slice(0, 5).map((alias:any) => (
                        <li className="list-group-item border-0 h5">{alias}</li>
                    ))}
                </ul>:<></>}

                <ul className="list-group">
                    <li className="list-group-item h3 bg-warning mb-0">Comments:</li>
                    {comments.map((comment:any) => (
                        <li className="list-group-item">
                            <Link to={`/account/profile/${comment.author}`}>{comment.author}</Link> says: {comment.text}
                            {(currentUser.username === comment.author || currentUser.role === "ADMIN") && <button className="float-end btn btn-danger" onClick={()=>deleteComment(comment._id)}>DELETE</button>}
                            </li>
                    ))}
                    {(currentUser.username) && (currentUser.role != "WARNED") && <li className="list-group-item">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <button className="btn btn-lg m-2 btn-success mt-3" onClick={()=>addComment()}>Post!</button>
                            </div>
                            <textarea className="form-control" value={thoughts} onChange={(e)=>setThoughts(e.target.value)} aria-label="With textarea"></textarea>
                        </div>
                    </li>}
                </ul>
            </div>
            <div className="col-3"></div>
        </div>

    )
}

export default Tune;