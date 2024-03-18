import React, { ChangeEvent, ChangeEventHandler, useState } from "react";
import "./Home.css";
import { useSelector, useDispatch } from "react-redux";
import {
  userUpdateStart,
  userUpdateSuccess,
  userUpdateFailure,
} from "../../redux/user/userSlice";
import { RootState } from "../../redux/store";
import BASE_URL from "../../Routes/config";
import axios from "axios";

const Home = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const dispatch = useDispatch();

  // funciton for handling the update
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const target = e.currentTarget;
    setFormData({ ...formData, [target.id]: target.value });
  };

  // Function to handle profile picture change
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("clicked");
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file); // Set the selected image file to state
      console.log("Selected file:", file);
      // Perform any additional actions, such as displaying a preview of the selected image
    }
  };

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updatedFormData = new FormData();

    if (selectedImage) {
      updatedFormData.append("profileImage", selectedImage);
    } else {
      // If no new image is selected, append the current image from the currentUser object
      updatedFormData.append("profileImage", currentUser.profileImage);
    }

    // Append other form data fields to the FormData object
    Object.entries(formData).forEach(([key, value]) => {
      updatedFormData.append(key, value);
    });

    console.log("Form data submitted:", formData);
    try {
      dispatch(userUpdateStart());

      const response = await axios.post(
        `${BASE_URL}/update/${currentUser._id}`,
        updatedFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Use multipart/form-data for FormData
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
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          <img
            src={currentUser.profileImage}
            alt="Profile"
            className="profile_image"
          />
        </div>

        <div className="username_box">
          <label htmlFor="username" className="label"></label>
          <input
            type="text"
            className="username_field"
            defaultValue={currentUser.username}
            onChange={handleChange}
          />
        </div>

        <div className="useremail_box">
          <label htmlFor="email" className="label"></label>
          <input
            type="text"
            className="useremail_field"
            defaultValue={currentUser.email}
            onChange={handleChange}
          />
        </div>

        <div className="userpassword_box">
          <label htmlFor="password" className="label"></label>
          <input
            type="password"
            className="userpassword_field"
            defaultValue="Password"
            onChange={handleChange}
          />
        </div>

        <button className="edit_profile" type="submit">
          Update
        </button>
        <button className="logout_user" type="button">
          Logout
        </button>
      </form>
    </div>
  );
};

export default Home;
