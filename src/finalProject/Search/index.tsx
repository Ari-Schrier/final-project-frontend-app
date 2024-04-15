import {Link} from "react-router-dom";

function Search(){
    return(
        <div className="container">
        <h2>
        Results for "Butterfly":
        </h2>
        <ul className="list-group">
            <li className="list-group-item">
                <Link to="/tunes/thebutterfly">The Butterfly</Link>
            </li>
            <li className="list-group-item">
                <Link to="/tunes/thebutterfly">Annika's Butterfly</Link>
            </li>
            <li className="list-group-item">
                <Link to="/tunes/thebutterfly">Butterfly</Link>
            </li>
            <li className="list-group-item">
                <Link to="/tunes/thebutterfly">The Ballinahulla Butterfly</Link>
            </li>
            <li className="list-group-item">
                <Link to="/tunes/thebutterfly">The Red Admiral Butterly</Link>
            </li>
        </ul>
        </div>
    );
}
export default Search;