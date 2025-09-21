import { BrowserRouter, Routes, Route ,Link} from "react-router-dom";
import Login from "./login";
import SignUp from "./SignUp";
import About from "./About";
function Home(){
    return (
        <>
        <div className="header">
                 <Link to="/">Home</Link>
              <Link to="/about">About</Link>
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
    </div>
        <div className="heading">
            <h1>ASHVINI</h1>
        </div>
        <div className="tagline">
            <h2>Trace the True Source of Your Wellness.</h2>
        </div>
        <div className="description">
            We bring you the true essence of Ayurveda by verifying every herb with complete details — from origin and properties to benefits and authenticity. Rooted in tradition, backed by trust.
        </div>
        
</>

    );
}

export default Home