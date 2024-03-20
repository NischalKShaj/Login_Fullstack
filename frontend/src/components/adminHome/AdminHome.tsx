import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons"; // Edit and Trash icons

import "./adminHome.css"; // Import the CSS file
import Header from "../header/Header";
import { Link } from "react-router-dom";

const AdminHome = () => {
  const userDetails = useSelector(
    (state: RootState) => state.admin.currentAdmin.userDetails
  );
  console.log("userDetails", userDetails);

  // Check if userDetails is undefined
  if (!userDetails) {
    return <div>Loading...</div>; // or any other fallback UI
  }

  return (
    <div className="admin-home-container">
      <Header />
      <table className="user-table">
        <thead>
          <tr>
            <th>Sl. No.</th>
            <th>Image</th>
            <th>Username</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {userDetails.map((user: any, index: number) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>
                <img
                  src={
                    user.profileImage.startsWith("http")
                      ? user.profileImage
                      : `http://localhost:4001/img/${user.profileImage}`
                  }
                  alt="Profile"
                  width="50"
                  height="50"
                  className="profile-image"
                />
              </td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              {/* Add action buttons or links */}
              <td>
                <Link to={`profile/${user._id}`} className="edit-button">
                  <FontAwesomeIcon icon={faEdit} />
                </Link>
                <button className="delete-button">
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminHome;
