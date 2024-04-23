import { useState } from "react";
import {Link} from "react-router-dom";

function Search(){
    const [query, setQuery] = useState("")
    return(
        <div className="d-flex justify-content-center">
            <div><input type="text" value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Search.." className="float-end form-control" /></div>
                <div><Link to={`/search/${query}`} className="text-decoration-none h1 text-success">Search</Link></div>
        </div>
    );
}

export default Search;