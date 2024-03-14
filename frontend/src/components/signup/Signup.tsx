import React, { ChangeEventHandler, useState } from "react";
import "../signup/Signup.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  // function to handle data in the form
  const handleSignup: ChangeEventHandler<HTMLInputElement> = (e) => {
    const target = e.currentTarget;
    setFormData({ ...formData, [target.id]: target.value });
  };

  // fuction to handle the signup and send the data to the backend
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await axios.post("http://localhost:4001/", formData);
    const data = await response.data;
    console.log(data);
  };

  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit} className="login_box">
        <div className="login_header">
          <span>Signup</span>
        </div>

        <div className="input_box">
          <input
            type="text"
            id="firstname"
            className="input_field"
            // value={firstname}
            onChange={handleSignup}
            required
          />
          <label htmlFor="firstname" className="label">
            firstname
          </label>
        </div>

        <div className="input_box">
          <input
            type="text"
            id="lastname"
            className="input_field"
            // value={lastname}
            onChange={handleSignup}
            required
          />
          <label htmlFor="lastname" className="label">
            lastname
          </label>
        </div>

        <div className="input_box">
          <input
            type="email"
            id="email"
            className="input_field"
            // value={email}
            onChange={handleSignup}
            required
          />
          <label htmlFor="email" className="label">
            email
          </label>
        </div>

        <div className="input_box">
          <input
            type="password"
            id="password"
            className="input_field"
            required
            // value={password}
            onChange={handleSignup}
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
          <button type="submit" className="input_submit">
            submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
