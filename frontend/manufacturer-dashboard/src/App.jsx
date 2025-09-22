import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Login from "./login";
// import SignUp from "./SignUp";
// import Home from './Home'
// import About from "./About";
// import Portal from "./Portal";
// import Farmer from "./Farmer";
// import Lab from "./components/Lab";
// import BatchSelection from "./components/BatchSelection";
// import Dashboard from "./components/Dashboard";
// import Consumer from "./Consumer";
// import Processor from "./Processor";
import Manufacturer from "./components/Manufacturer";
// import LabScreen from "./components/LabScreen";
// import UploadTestResults from "./components/UploadTestResults";
// import CertificateTable from "./components/CertificateTable";
import NewBatch from "./components/NewBatch";
import BatchHistory from "./components/BatchHistory";
// import ForgotPassword from "./ForgotPassword";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/*  />  
        */}
        {/* <Route path="/CertificateTable" element={<CertificateTable />} />
        <Route path="/UploadTestResults" element={<UploadTestResults />} /> */}
        {/* <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Home />} /> 
        <Route path="/about" element={<About />} />
        <Route path="/portal" element={<Portal />} />
        <Route path="/farmer" element={<Farmer />} />*/}
        <Route path="/NewBatch" element={<NewBatch />} /> 
        <Route path="/" element={<Manufacturer />} /> 
        <Route path="/BatchHistory" element={<BatchHistory />}/>
        {/* <Route path="/Lab" element={<Lab />} /> */}
        {/* <Route path="/Processor" element={<Processor />} />
        <Route path="/Consumer" element={<Consumer />} /> */}
        {/* <Route path="/BatchSelection" element={<BatchSelection />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/LabScreen" element={<LabScreen />} /> */}
        {/* <Route path="/forgotpassword" element={<ForgotPassword />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;