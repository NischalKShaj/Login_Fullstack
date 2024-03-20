import React, { ChangeEventHandler, useState } from "react";
import "../signup/Signup.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../Routes/config";
import Oauth from "../OAuth/Oauth";

const Signup = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // function to handle data in the form
  const handleSignup: ChangeEventHandler<HTMLInputElement> = (e) => {
    const target = e.currentTarget;
    setFormData({ ...formData, [target.id]: target.value });
  };

  // fuction to handle the signup and send the data to the backend
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      const response = await axios.post(`${BASE_URL}/`, formData);
      const data = await response.data;
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
        return;
      }
      navigate("/");
    } catch (error: any) {
      setLoading(false);
      setError(
        error.response.data.message ||
          "Something went wrong. Please try again..."
      );
    }
  };

  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit} className="login_box">
        <div className="login_header">
          <span>Signup</span>
        </div>
        <p className="errorText">{error}</p>

        <div className="input_box">
          <input
            type="text"
            id="username"
            className="input_field"
            // value={firstname}
            onChange={handleSignup}
            required
          />
          <label htmlFor="username" className="label">
            username
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
        <div className="input_box">
          <button disabled={loading} type="submit" className="input_submit">
            {loading ? "Loading..." : "sign up"}
          </button>
        </div>
        <Oauth />
      </form>
    </div>
  );
};

export default Signup;
