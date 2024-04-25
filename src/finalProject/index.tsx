import {HashRouter} from "react-router-dom";
import {Routes, Route, Navigate} from "react-router";
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from "./Account/Users/signup";
import Account from "./Account"
import Home from "./Home";
import Navigation from "./Navigation";
import Results from "./Tunes/Search/Results";
import Search from "./Tunes/Search";
import TuneList from "./Tunes";
import Tune from "./Tunes/Tune"
import Sets from "./Sets";
import SetViewer from "./Sets/SetViewer";
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
                        <Route path="/sets"   element={<Sets/>}/>
                        <Route path="/sets/:setId"   element={<SetViewer/>}/>
                        <Route path="/tunes" element={<TuneList/>}/>
                        <Route path="/tunes/:sessionId" element={<Tune/>}/>
                        <Route path="/home" element={<Home/>}/>
                        <Route path="/login"    element={<Signup/>}/>
                        <Route path="/account/*"    element={<Account/>}/>
                        <Route path="/search/:query"    element={<Results/>}/>
                        <Route path="/search" element={<Search/>}/>
                        </Routes>
                    </div>
            </Provider>
        </div>
       
    );
}
export default FinalProject;