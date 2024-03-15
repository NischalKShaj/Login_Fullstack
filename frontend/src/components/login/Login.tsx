import React, { ChangeEventHandler, useState } from "react";
import "../login/Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import BASE_URL from "../../Routes/config";
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "../../redux/user/userSlice";
import type { RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // function to handle data in the form
  const handleSignup: ChangeEventHandler<HTMLInputElement> = (e) => {
    const target = e.currentTarget;
    setFormData({ ...formData, [target.id]: target.value });
  };

  // fuction to handle the signup and send the data to the backend
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      dispatch(loginStart());
      const response = await axios.post(`${BASE_URL}/home`, formData);
      const data = await response.data;
      if (data.success === false) {
        dispatch(loginFailure(data.message));
        return;
      }
      dispatch(loginSuccess(data));
      navigate("/home");
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<any>;
        if (
          axiosError.response &&
          axiosError.response.data &&
          axiosError.response.data.message
        ) {
          dispatch(loginFailure(axiosError.response.data.message));
        } else {
          dispatch(loginFailure("Something went wrong. Please try again..."));
        }
      } else {
        dispatch(loginFailure("Something went wrong. Please try again..."));
      }
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
