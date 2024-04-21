import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { TroveState } from "../../store";
import { Link, useParams } from "react-router-dom";
import { findTune, lookupTune } from "../client";
import { setTune } from "../reducer";

function Tune(){
    const {sessionId} = useParams();
    const tune = useSelector((state: TroveState) => 
        state.tunesReducer.tune);
    const dispatch = useDispatch();
    useEffect(() => {
        findTune(sessionId)
          .then((tune) =>
            dispatch(setTune(tune))
        ).catch(error =>{
            lookupTune(sessionId)
            .then((tune) =>
                dispatch(setTune(tune)));
        });
    }, []);
    return(
        <div className="row">
            Session Id: {sessionId}
            <div className="col-3"></div>
            <div className="col-6 text-center"> 
                <div className="h1">{tune.name}</div>
                <ul className="list-group border-0">
                    <li className="list-group-item border-0 h4">Also Known As:</li>
                    {tune.aliases.map((alias:any) => (
                        <li className="list-group-item border-0 h5">{alias}</li>
                    ))}
                </ul>

                <ul className="list-group">
                    <li className="list-group-item h3 bg-warning mb-0">Comments:</li>
                    {tune.comments.map((comment:any) => (
                        <li className="list-group-item">{comment}</li>
                    ))}
                </ul>
            </div>
            <div className="col-3"></div>
        </div>

    )
}

export default Tune;