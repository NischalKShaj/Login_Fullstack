import React, { ChangeEventHandler, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RootState } from "../../redux/store";
import "../userProfile/userProfile.css";
import {
  userUpdateFailure,
  userUpdateStart,
  userUpdateSuccess,
} from "../../redux/user/userSlice";
import axios from "axios";
import BASE_URL from "../../Routes/config";
import { userUpdateSuccessAdmin } from "../../redux/admin/adminSlice";

const UserProfile = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<Record<string, string>>({});
  const userDetails = useSelector(
    (state: RootState) => state.admin.currentAdmin.userDetails
  );
  console.log("userDetails", userDetails);

  //   finding the user based on the params
  const currentUser = userDetails.find((user: any) => user._id === id);

  //   function to handle the change
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { id, value } = e.currentTarget;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };
  console.log("formData", formData);

  //   function to handle submition of the edited data
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      dispatch(userUpdateStart());
      const response = await axios.post(
        `${BASE_URL}/admin/dashbord/edit/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      const data = response.data;
      if (data.success === false) {
        dispatch(userUpdateFailure(data));
        return;
      }
      dispatch(userUpdateSuccess(data));
      dispatch(userUpdateSuccessAdmin(data.user));
      navigate("/dashboard");
    } catch (error: any) {
      console.log("error", error.response.data);
      dispatch(userUpdateFailure(error));
    }
  };

  return (
    <div className="wrapper">
      <form
        className="home_box"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <div className="home_header">
          <span>User Profile</span>
        </div>

        <div className="profile_picture">
          <label htmlFor="profileImage" className="label"></label>
          <input
            className="image_update"
            id="profileImage"
            type="file"
            accept="image/png"
            onChange={handleChange}
          />
          <img
            src={
              currentUser?.profileImage?.startsWith("http")
                ? currentUser.profileImage
                : `http://localhost:4001/img/${currentUser.profileImage}`
            }
            id="profileImagePreview"
            alt="Profile"
            className="profile_image"
          />
        </div>

        <div className="username_box">
          <label htmlFor="username" className="label"></label>
          <input
            type="text"
            id="username"
            className="username_field"
            defaultValue={currentUser.username}
            onChange={handleChange}
          />
        </div>

        <div className="useremail_box">
          <label htmlFor="email" className="label"></label>
          <input
            type="text"
            id="email"
            className="useremail_field"
            defaultValue={currentUser.email}
            onChange={handleChange}
          />
        </div>

        <div className="userpassword_box">
          <label htmlFor="password" className="label"></label>
          <input
            type="password"
            id="password"
            className="userpassword_field"
            defaultValue="Password"
            onChange={handleChange}
          />
        </div>

        <button className="edit_profile" type="submit">
          Update
        </button>
        <Link to={"/dashboard"}>
          <button className="logout_user" type="button">
            Dashboard
          </button>
        </Link>
      </form>
    </div>
  );
};

export default UserProfile;
