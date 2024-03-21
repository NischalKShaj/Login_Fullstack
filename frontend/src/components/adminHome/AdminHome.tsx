import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons"; // Edit and Trash icons

import "./adminHome.css"; // Import the CSS file
import Header from "../header/Header";
import { Link, useNavigate } from "react-router-dom";
import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
} from "../../redux/admin/adminSlice";
import axios from "axios";
import BASE_URL from "../../Routes/config";

const AdminHome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userDetails = useSelector(
    (state: RootState) => state?.admin?.currentAdmin.userDetails
  );
  const currentAdmin = useSelector((state: RootState) => state.admin);
  console.log("userDetails", userDetails);

  useEffect(() => {
    if (!currentAdmin) {
      navigate("/admin");
    }
  }, []);

  // Check if userDetails is undefined
  if (!userDetails) {
    return <div>Loading...</div>; // or any other fallback UI
  }

  // function to delete the user from the database
  const handleDelete = async (userId: string) => {
    try {
      dispatch(deleteUserStart());
      const response = await axios.delete(
        `${BASE_URL}/admin/dashbord/delete/${userId}`,
        {
          withCredentials: true,
        }
      );
      const data = response.data;
      if (data.success === false) {
        dispatch(deleteUserFailure(data));
        return;
      }
      dispatch(deleteUserSuccess(data.userId));
    } catch (error) {
      console.log("error", error);
      dispatch(deleteUserFailure("An error occured while deleting the user"));
    }
  };

  const confirmDelete = (userId: string) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      handleDelete(userId);
    }
  };

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
                    user?.profileImage?.startsWith("http")
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
                <button
                  className="delete-button"
                  onClick={() => confirmDelete(user._id)}
                >
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
