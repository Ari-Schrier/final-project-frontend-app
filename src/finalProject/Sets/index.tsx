import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as userClient from "../Account/Users/client";
import * as setClient from "./client";
export default function Sets(){
    const [profile, setProfile] = useState({ username: "nobody", password: "", email: "", role: "USER" });
    const [newSet, setNewSet] = useState({name:"", description: "", tunes:[]});
    const [sets, setSets] = useState<any>([]);
    const fetchSets = async () => {
        const mySets = await setClient.getSetsBy(profile);
        setSets(mySets);
    }
    const fetchProfile = async () => {
      const account = await userClient.profile();
      setProfile(account);
    };
    const addSet = async () => {
        await setClient.addSet({...newSet,  author: profile.username});
        setSets([...sets, newSet]);
        setNewSet({...newSet, name:"", description: ""})
    }
    const deleteSet = async (setName : any) => {
        await setClient.deleteSet(setName);
        setSets(sets.filter((set:any) => set.name != setName));
    }
    useEffect(() => {
      fetchProfile();
    }, []);
    useEffect(() => {
        fetchSets();
      }, [profile]);
    return(<div className="container">
        {profile.username? 
        <>
        <ul className="list-group my-5">
            <li className="list-group-item bg-warning">{profile.username}'s Sets:</li>
            {sets.map((set:any)=>
                        <li className="list-group-item">
                        <Link className="text-primary" to={`/Sets/${set.name}`}>{set.name}</Link>: {set.description}
                        <button className="btn btn-danger float-end" onClick={()=>deleteSet(set.name)}>Delete</button>
                    </li>)}

        </ul>
        <div className="input-group">
            <div className="input-group-prepend">
                <span className="input-group-text">New Set Name:</span>
            </div>
            <input type="text" className="form-control" placeholder="What is your new set called?" onChange={(e)=>setNewSet({...newSet, name: e.target.value})} value={newSet.name}></input>
        </div>
        <div className="input-group">
            <div className="input-group-prepend">
                <span className=" h-100 input-group-text">New Set Description:</span>
            </div>
            <textarea className="form-control" placeholder="Tell us a little bit about your new set." onChange={(e)=>setNewSet({...newSet, description: e.target.value})} value={newSet.description}></textarea>
        </div>
        <button onClick={()=>addSet()} className="btn btn-primary w-100">Create a New Set</button>
        </>: 
        <div className="d-flex flex-column justify-content-center">
            <div className="h1">Set Management</div>
            <div className="h2">Sorry! You need to <Link to="/account/signin">log in</Link> to manage sets!</div>        
        </div>

        }
    </div>);
}