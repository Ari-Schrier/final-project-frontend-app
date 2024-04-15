import {Link} from "react-router-dom";

function Home() {
    return (
      <div className="row mx-5">
        <div className="col-12 col-md-6">
          <h1>Welcome to TradTrove, the internet's #2 resource for folk music! </h1>
          <h2>Join to comment on your favorite songs, assemble sets, and share your passion for trad with the world!</h2>
          <Link to="/login" className="h2 text-primary">Join or login now to get started</Link>
          <div>
          More Text
          More Text
          </div>
        </div>
        <div className="col-12 col-md-6">
            <ul className="list-group">
                <li className="list-group-item"><h1>Recent Activity</h1></li>
                <li className="list-group-item"><Link to="/profile/morrison">John Morrison</Link> comments "This is my absolute favorite!" on <Link to="/tunes/morrisonsfavorite">Morrison's Jig</Link></li>
                <li className="list-group-item"><Link to="/profile/morrison">John Carty</Link> added <Link to="/tunes/thebutterfly">The Butterfly</Link> to his set!</li>
            </ul>

        </div>
      </div>
    );
  }
  
  export default Home;