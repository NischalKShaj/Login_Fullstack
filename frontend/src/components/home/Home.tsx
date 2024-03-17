import React from "react";
import "./Home.css";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const Home = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);
  return (
    <div className="wrapper">
      <div className="home_box">
        <div className="home_header">
          <span>User Profile</span>
        </div>

        <div className="profile_picture">
          <img
            src={currentUser.profileImage}
            alt="Profile"
            className="profile_image"
          />
        </div>

        <div className="username_box">
          <input
            type="text"
            className="username_field"
            value={`username: ${currentUser.username}`}
            readOnly
          />
        </div>

        <div className="useremail_box">
          <input
            type="text"
            className="useremail_field"
            value={`email: ${currentUser.email}`}
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
