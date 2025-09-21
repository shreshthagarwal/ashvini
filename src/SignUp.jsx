import React,{useState} from 'react'
import { FaEye, FaEyeSlash } from "react-icons/fa"; 
import { Link } from "react-router-dom"

function SignUp(){
    const [name,setName]= useState(""); 
    const [username,setUsername]= useState(""); 
    const [email,setEmail]= useState(""); 
    const [phone,setPhone]= useState(); 
    const [password,setPassword]= useState();
    const [showPassword, setShowPassword] = useState(false);   
    const [remeberMe, setRemeberMe] = useState(false);
    const [signUp, setSignUp] = useState(false);
    function handleName(e){
        setName(e.target.value);
    }
    function handleUsername(e){
        setUsername(e.target.value);
    }
    function handleEmail(e){
        setEmail(e.target.value);
    }
     function handlePhone(e){
        setPhone(e.target.value);
    }
    function handlePassword(e){
        setPassword(e.target.value);
    }
    function handleSignUp(){
    }
        return(
            <>
            <h1>Create an Account</h1>
            <div className="name">
                <p>Name</p>
                <input value={name} placeholder="Enter your Name" onChange={handleName}/>
            </div>
            <div className="username">
                <p>Username</p>
                <input value={username} placeholder="Enter your Username" onChange={handleUsername}/>
            </div>
            <div className="email">
                <p>Email</p>
                <input value={email} placeholder="Enter your Email" onChange={handleEmail}/>
            </div>
            <div className="phone">
                <p>Phone Number</p>
                <input value={phone} placeholder="Enter your Phone Number" onChange={handlePhone}/>
            </div>
            <div className="password">
                <p>Password</p>
                <input value={password} type={showPassword? "text":"password"} placeholder="Enter your Password" onChange={handlePassword}/>
                 <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
            </div>
          
            <div className="SignUpBtn">
                <button onClick={handleSignUp}>Sign Up</button>
            </div>
            <p>------Or With------</p>
            <div className="loginWGoogle">
                 <button onClick={handleSignUp}>Sign Up With Google</button>
            </div>

            <span>
                <p>Already have an account?</p>
                 <Link to="/login">Login</Link>
            </span>
            </>
        )
}

export default SignUp