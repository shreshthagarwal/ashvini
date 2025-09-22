import React,{useState} from 'react'
import { Link , useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa"; 
function Login(){
    const [email,setEmail]= useState(); 
    const [password,setPassword]= useState();
    const [showPassword, setShowPassword] = useState(false);   
    const [remeberMe, setRemeberMe] = useState(false);
    const [login, setLogin] = useState(false);
     const navigate = useNavigate();

    function handleEmail(e){
        setEmail(e.target.value);
    }
    function handlePassword(e){
        setPassword(e.target.value);
    }
    function handleLogin() {
    if (email === "example@gmail.com" && password === "123456") {
      alert("Login Successful ");
      navigate('/portal');
      setLogin(true);
    } else {
      alert("Invalid Credentials ");
    }
  }
        return(
            <>
            <h1>Hi, Welcome Back!👋</h1>
            <div className="email">
                <p>Email</p>
                <input value={email} placeholder="example@gmail.com" onChange={handleEmail}/>
            </div>
            <div className="password">
                <p>Password</p>
                <input value={password} type={showPassword? "text":"password"} placeholder="Enter your password" onChange={handlePassword}/>
                 <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
            </div>
            <div className="forgotPassword">
         <Link to="/forgotpassword">forgot password?</Link>
            </div>

            <div className="remeberMe">
             <span>   <input type="checkbox" onClick={()=>setRemeberMe(!remeberMe)}/> Remember me</span>
            </div>
            <div className="loginBtn">
                <button onClick={handleLogin}>Login</button>
            </div>
            <p>------Or With------</p>
            <div className="loginWGoogle">
                 <button onClick={handleLogin}>Login With Google</button>
            </div>

            <span>
                <p>Don't have an account?</p>
               <Link to="/signup">Sign Up</Link>
            </span>
            </>
        )
}

export default Login

//forgot password
//login with google