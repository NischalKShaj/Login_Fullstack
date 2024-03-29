import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import SignupPage from "../pages/SignupPage";
import ProfilePage from "../pages/ProfilePage";
import PrivateRoute from "./PrivateRoute";
import AdminLoginPage from "../pages/AdminLoginPage";
import AdminHomePage from "../pages/AdminHomePage";
import { AdminPrivateRoute } from "./PrivateRoute";
import UserProfilePage from "../pages/UserProfilePage";

const MainRoutes = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route element={<PrivateRoute />}>
            <Route path="/home" element={<HomePage />} />
          </Route>
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/admin" element={<AdminLoginPage />} />
          <Route element={<AdminPrivateRoute />}>
            <Route path="/dashboard" element={<AdminHomePage />} />
            <Route
              path="/dashboard/profile/:id"
              element={<UserProfilePage />}
            />
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default MainRoutes;
