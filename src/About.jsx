import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function About(){
    
    return(<>
    <div className="header">
              <Link to="/">Home</Link>
              <Link to="/about">About</Link>
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>

    </div>
    <div className="main">

    </div>
    <div className="footer">
              {/* <Link to="/">Contact Us</Link>
              <Link to="/about">Email</Link>
              <Link to="/login">Visit us</Link>
              <Link to="/signup">FAQs</Link> */}
    </div>
    </>)
}

export default About