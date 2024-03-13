import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <div className="wrapper">
      <div className="home_box">
        <div className="home_header">
          <span>User Profile</span>
        </div>

        <div className="username_box">
          <input
            type="text"
            className="username_field"
            value="firstname"
            readOnly
          />
        </div>

        <div className="username_box">
          <input
            type="text"
            className="username_field"
            value="lastname"
            readOnly
          />
        </div>

        <div className="useremail_box">
          <input
            type="text"
            className="useremail_field"
            value="useremail"
            readOnly
          />
        </div>

        <button className="edit_profile" type="submit">
          Edit
        </button>
        <button className="logout_user" type="submit">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Home;
