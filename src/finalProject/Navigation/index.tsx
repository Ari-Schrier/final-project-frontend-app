import {Link} from "react-router-dom";

function Navigation(){
    return(
        <div className="row bg-success p-4 rounded-bottom">
            <div className="col-1"></div>
            <div className="col-1  text-danger">
                <Link to="/home" className="text-decoration-none h1 text-warning">Home</Link>
            </div>
            <div className="col-1">
                <Link to="/login" className="text-decoration-none h1 text-warning">Login</Link>
            </div>
            <div className="col-1">
                <Link to="/profile" className="text-decoration-none h1 text-warning">Profile</Link>
            </div>
            <div className="col-6">
            </div>
            <div className="col-2">
                <input type="text" placeholder="Search.." className="float-end form-control" />
                <Link to="/search" className="text-decoration-none h1 text-warning">Search</Link>
            </div>
        </div>
    );
}
export default Navigation;