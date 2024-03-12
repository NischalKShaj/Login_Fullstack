import React, { useState } from "react";
import "../signup/Signup.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // function to handle the signup and send the data to backend and navigate to login page
  const handleSignup = async () => {
    try {
      const response = await axios.post("http://localhost:4001/", {
        firstname,
        lastname,
        email,
        password,
      });
      console.log(response.data);

      if (response.data.success) {
        console.log("signup success");
        navigate("/");
      } else {
        console.log("signup failed", response.data.message);
        navigate("/signup");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="wrapper">
      <div className="login_box">
        <div className="login_header">
          <span>Signup</span>
        </div>

        <div className="input_box">
          <input
            type="text"
            id="fname"
            className="input_field"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
          <label htmlFor="firstname" className="label">
            firstname
          </label>
        </div>

        <div className="input_box">
          <input
            type="text"
            id="lname"
            className="input_field"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
          <label htmlFor="lastname" className="label">
            lastname
          </label>
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

        {/* <div className="input_box">
          <label htmlFor="image" className="imageLabel">
            Upload profile picture
          </label>
          <input
            type="file"
            id="image"
            className="input_field"
            // onChange={handleImageChange}
          />
        </div> */}

        <div className="input_box">
          <button type="submit" className="input_submit" onClick={handleSignup}>
            submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
