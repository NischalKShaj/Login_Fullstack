import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const AdminHome = () => {
  const userDetails = useSelector(
    (state: RootState) => state.admin.currentAdmin.userDetails
  );
  console.log("userDetails", userDetails);

  // Check if userDetails is undefined
  if (!userDetails) {
    return <div>Loading...</div>; // or any other fallback UI
  }

  // Destructure userDetails safely
  const { username, email } = userDetails;

  return (
    <div>
      <h1>Welcome, {username}</h1>
      <p>Email: {email}</p>
      {/* Render other user details */}
    </div>
  );
};

export default AdminHome;
