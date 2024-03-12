import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // login logic implemented
  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:4001/home", {
        email,
        password,
      });
      if (response.data.success) {
        console.log("login success");
        navigate("/home");
      } else {
        console.log("login failed", response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // signup logic implemented
  const handleSignup = async () => {
    navigate("/signup");
  };

  return (
    <div className="wrapper">
      <div className="login_box">
        <div className="login_header">
          <span>Login</span>
        </div>
        <div className="input_box">
          <input
            type="email"
            id="user"
            className="input_field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="email" className="label">
            email
          </label>
        </div>

        <div className="input_box">
          <input
            type="password"
            id="pass"
            className="input_field"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="password" className="label">
            password
          </label>
        </div>

        <div className="input_box">
          <button type="submit" className="input_submit" onClick={handleLogin}>
            login
          </button>
        </div>

        <div className="register">
          <span onClick={handleSignup}>Dont have an account?Register</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
