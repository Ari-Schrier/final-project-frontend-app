import {Link} from "react-router-dom";
import { useState } from "react";

function Navigation(){
    const [query, setQuery] = useState("");
    return(
        <div className="d-flex flex-row justify-content-around align-items-center bg-success">
            <div className="text-danger">
                <Link to="/home" className="text-decoration-none h1 text-warning">Home</Link>
            </div>
            <div className="mx-5">
                <Link to="/account/Signin" className="text-decoration-none h1 text-warning">Login</Link>
            </div>
            <div className="mx-5">
                <Link to="/account/Profile" className="text-decoration-none h1 text-warning">Profile</Link>
            </div>
            <div className="mx-5">
            </div>
            <div className="float-end">
                <input type="text" value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Search.." className="float-end form-control" />
                <Link onClick={()=>setQuery("")} to={`/search/${query}`} className="text-decoration-none h1 text-warning">Search</Link>
            </div>
        </div>
    );
}
export default Navigation;