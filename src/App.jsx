import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./login";
import SignUp from "./SignUp";
import Home from './Home'
import About from "./About";
import Portal from "./Portal";
import Farmer from "./Farmer";
import Lab from "./Lab";
import Consumer from "./Consumer";
import Processor from "./Processor";
import Manufacturer from "./Manufacturer";
import ForgotPassword from "./ForgotPassword";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Home />} /> 
        <Route path="/about" element={<About />} />
        <Route path="/portal" element={<Portal />} />
        <Route path="/farmer" element={<Farmer />} />
        <Route path="/Manufacturer" element={<Manufacturer />} />
        <Route path="/Lab" element={<Lab />} />
        <Route path="/Processor" element={<Processor />} />
        <Route path="/Consumer" element={<Consumer />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
