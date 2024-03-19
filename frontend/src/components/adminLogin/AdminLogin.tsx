import React, { ChangeEventHandler, useEffect, useState } from "react";
import "../adminLogin/adminLogin.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import {
  loginFailure,
  loginStart,
  loginSuccess,
} from "../../redux/admin/adminSlice";
import axios, { AxiosError } from "axios";
import BASE_URL from "../../Routes/config";

const AdminLogin = () => {
  const { currentAdmin } = useSelector((state: RootState) => state.admin);
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state: RootState) => state.admin);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //   function to check whether the admin is logged in or not
  useEffect(() => {
    if (currentAdmin) {
      navigate("/dashboard");
    }
  }, [currentAdmin, navigate]);

  //   function to handle the data from the form
  const handleLogin: ChangeEventHandler<HTMLInputElement> = (e) => {
    const target = e.currentTarget;
    setFormData({ ...formData, [target.id]: target.value });
  };

  //   function to handle the submission of the form
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      dispatch(loginStart());
      const response = await axios.post(
        `${BASE_URL}/admin/dashbord`,
        formData,
        {
          withCredentials: true,
        }
      );
      const data = response.data;
      if (data.success === false) {
        dispatch(loginFailure(data.message));
        return;
      }
      dispatch(loginSuccess(data));
      navigate("/dashboard");
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
      <form onSubmit={handleSubmit} className="admin_login_box">
        <div className="admin_login_header">
          <span>Admin Login</span>
        </div>
        <p className="errorText">
          {typeof error === "string" ? error : error?.message}
        </p>
        <div className="admin_input_box">
          <input
            type="email"
            id="email"
            className="admin_input_field"
            // value={email}
            onChange={handleLogin}
            required
          />
          <label htmlFor="email" className="label">
            email
          </label>
        </div>

        <div className="admin_input_box">
          <input
            type="password"
            id="password"
            className="admin_input_field"
            required
            // value={password}
            onChange={handleLogin}
          />
          <label htmlFor="password" className="label">
            password
          </label>
        </div>
        <div className="admin_input_box">
          <button
            disabled={loading}
            type="submit"
            className="admin_input_submit"
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminLogin;
