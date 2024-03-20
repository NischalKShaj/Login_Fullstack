import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../Routes/config";
import { adminLogout } from "../../redux/admin/adminSlice";
import "../header/header.css";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // function to add a new use
  const handleNewUser = () => {
    confirmAlert({
      title: "Confirm",
      message: "Are you sure you want to add a new user?",
      buttons: [
        {
          label: "Yes",
          onClick: () => navigate("/signup"),
        },
        {
          label: "No",
          onClick: () => {}, // Do nothing
        },
      ],
    });
  };

  //   fuction to logout from the dashboard
  const handleLogout = async () => {
    try {
      await fetch(`${BASE_URL}/admin/logout`);
      dispatch(adminLogout());
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="header-container">
      <h4 className="header-title">Welcome to admin dashboard</h4>
      <input
        className="header-search"
        placeholder="enter the username"
        type="search"
      />
      <button className="header-button" onClick={handleNewUser} type="button">
        Add User
      </button>
      <button
        className="header-button logout-button"
        onClick={handleLogout}
        type="button"
      >
        logout
      </button>
    </div>
  );
};

export default Header;
