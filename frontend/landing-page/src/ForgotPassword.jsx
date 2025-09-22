import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSendOtp = () => {
    if (password === confirmPassword) {
      // In a real app, this would send an OTP to the email
      alert('OTP sent to your email!');
    } else {
      alert("Password and confirmed password don't match");
    }
  };

  const handleVerifyOtp = () => {
    if (otp === '123') {
      alert('OTP Verified! Redirecting to login...');
      navigate('/portal');
    } else {
      alert('Invalid OTP');
    }
  };

  return (
    <div className="forgot-password-page">
      <div className="reset-password-card">
        <h2>Reset Your Password</h2>
        <div className="input-group">
          <input
            type="email"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-group">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        <div className="input-group">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        <div className="button-group">
          <button onClick={handleSendOtp}>Send Otp</button>
        </div>
        <div className="input-group">
          <input
            type="text"
            placeholder="Enter The Otp Received"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
        </div>
        <div className="button-group">
          <button onClick={handleVerifyOtp}>Verify Otp</button>
        </div>
      </div>
    
    </div>
  );
}

export default ForgotPassword;