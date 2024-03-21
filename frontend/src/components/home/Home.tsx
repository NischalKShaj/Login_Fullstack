import React, {
  ChangeEvent,
  ChangeEventHandler,
  useEffect,
  useState,
} from "react";
import "./Home.css";
import { useSelector, useDispatch } from "react-redux";
import {
  userUpdateStart,
  userUpdateSuccess,
  userUpdateFailure,
  userLogout,
} from "../../redux/user/userSlice";
import { RootState } from "../../redux/store";
import BASE_URL from "../../Routes/config";
import axios from "axios";

const Home: React.FC = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const dispatch = useDispatch();

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updatedFormData = new FormData();

    // Append the selected image to the form data if it exists
    if (selectedImage) {
      updatedFormData.append("profileImage", selectedImage);
    } else {
      // Remove the profile image field if not selected
      updatedFormData.append("profileImage", currentUser.profileImage);
    }

    // Append other form data fields to the FormData object
    Object.entries(formData).forEach(([key, value]) => {
      updatedFormData.append(key, value);
    });

    console.log("Form data submitted:", updatedFormData);

    // Attempt to update user data
    try {
      dispatch(userUpdateStart());

      const response = await axios.post(
        `${BASE_URL}/update/${currentUser._id}`,
        updatedFormData,
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
    } catch (error: any) {
      console.log("error", error.response.data);
      dispatch(userUpdateFailure(error));
    }
  };

  useEffect(() => {
    console.log("Selected image:1", selectedImage);
  }, [selectedImage]);

  // Function to handle profile picture change
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      console.log("Selected image:", file);

      // Display the selected image in the UI
      const reader = new FileReader();
      reader.onload = () => {
        const imageUrl = reader.result as string;
        // Update the image source in the UI
        const imgElement = document.getElementById(
          "profileImagePreview"
        ) as HTMLImageElement;
        if (imgElement) {
          imgElement.src = imageUrl;
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Function to handle input field changes
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { id, value } = e.currentTarget;
    if (id === "profileImage") {
      // Handle profile image change
      handleImageChange(e);
    } else {
      // Handle other form field changes
      setFormData((prevData) => ({ ...prevData, [id]: value }));
    }
  };

  // funciton to logout the user
  const handleLogout = async () => {
    try {
      await fetch(`${BASE_URL}/logout`);
      dispatch(userLogout());
    } catch (error) {
      console.log("error");
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
            onChange={handleImageChange}
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
        <button onClick={handleLogout} className="logout_user" type="button">
          Logout
        </button>
      </form>
    </div>
  );
};

export default Home;
