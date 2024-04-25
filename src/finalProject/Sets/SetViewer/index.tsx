import { useParams } from "react-router";
import * as setClient from "../client"
import * as tuneClient from "../../Tunes/client"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function SetViewer(){
    const [set, setSet] = useState({name: "name", description: "description", author: "author", tunes:[]})
    const [tunes, setTunes] = useState<any>([{name:"tune1", sessionId: 0}]);
    const {setId} = useParams()
    const setUp = async () => {
        await setClient.getSet(setId).then((set)=>{
        setSet(set);
        tuneClient.findTunes().then((tunes)=>{
            const foundTunes = tunes.filter((tune:any)=> set.tunes.includes(tune.sessionId));
            setTunes(foundTunes);
            console.log(foundTunes);
        });
        });
    };
    useEffect(()=>{setUp();}, [])
    return(
    <div className="container">
        <div className="row justify-content-center">
            <div className="col-12 col-md-6">
                <h1>{set.name} by <Link to= {`/account/${set.author}`}>{set.author}</Link></h1>
                <h2>{set.description}</h2>
            </div>
            <ul className="list-group w-75">
                <li className="list-group-item bg-warning">Tunes In {set.name}:</li>
                {(tunes.length == 0) && <li className="list-group-item">None yet! Go add some!</li>}
                {tunes.map((tune:any)=><li className="list-group-item"><Link className="h2" to={`/tunes/${tune.sessionId}`}>{tune.name}</Link></li>)}
            </ul>
        </div>
    </div>);
}