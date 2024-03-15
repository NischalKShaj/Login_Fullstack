import React, { ChangeEventHandler, useState } from "react";
import "../login/Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../Routes/config";

const Login = () => {
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
      const response = await axios.post(`${BASE_URL}/home`, formData);
      const data = await response.data;
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
        return;
      }
      navigate("/home");
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
          <span>Login</span>
        </div>
        <p className="errorText">{error}</p>
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
            {loading ? "Loading..." : "Login"}
          </button>
        </div>
        <div className="register">
          <Link to="/signup">
            <span>Dont have an account? Register</span>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
