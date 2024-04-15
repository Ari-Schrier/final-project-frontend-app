import {HashRouter} from "react-router-dom";
import {Routes, Route, Navigate} from "react-router";
import 'bootstrap/dist/css/bootstrap.min.css';
import Details from "./Details";
import Login from "./Login";
import Home from "./Home";
import Navigation from "./Navigation";
import Profile from "./Profile";
import Search from "./Search";
import { Link } from "react-router-dom";



function FinalProject(){
    return(
        <div className="overflow-hidden">
            <Navigation />
                <div>
                    <Routes>
                    <Route path="/" element={<Navigate to="/home"/>} />
                    <Route path="/details"   element={<Details/>}/>
                    <Route path="/home" element={<Home/>}/>
                    <Route path="/login"    element={<Login/>}/>
                    <Route path="/profile"    element={<Profile/>}/>
                    <Route path="/search"    element={<Search/>}/>
                    </Routes>
                </div>
        </div>
    );
}
export default FinalProject;