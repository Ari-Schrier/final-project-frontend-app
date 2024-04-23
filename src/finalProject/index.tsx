import {HashRouter} from "react-router-dom";
import {Routes, Route, Navigate} from "react-router";
import 'bootstrap/dist/css/bootstrap.min.css';
import Details from "./Details";
import Signup from "./Account/Users/signup";
import Login from "./Login";
import Account from "./Account"
import Home from "./Home";
import Navigation from "./Navigation";
import Profile from "./Profile";
import Search from "./Tunes/Search";
import TuneList from "./Tunes";
import Tune from "./Tunes/Tune"
import { Link } from "react-router-dom";
import store from "./store";
import { Provider } from "react-redux";



function FinalProject(){
    return(
        <div className="overflow-hidden">
            <Provider store={store}>
                <Navigation />
                    <div>
                        <Routes>
                        <Route path="/" element={<Navigate to="/home"/>} />
                        <Route path="/details"   element={<Details/>}/>
                        <Route path="/tunes" element={<TuneList/>}/>
                        <Route path="/tunes/:sessionId" element={<Tune/>}/>
                        <Route path="/home" element={<Home/>}/>
                        <Route path="/login"    element={<Signup/>}/>
                        <Route path="/account/*"    element={<Account/>}/>
                        <Route path="/search/:query"    element={<Search/>}/>
                        </Routes>
                    </div>
            </Provider>
        </div>
       
    );
}
export default FinalProject;