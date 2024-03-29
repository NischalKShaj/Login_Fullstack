import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);
  return currentUser ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoute;

export const AdminPrivateRoute = () => {
  const { currentAdmin } = useSelector((state: RootState) => state.admin);
  return currentAdmin ? <Outlet /> : <Navigate to="/admin" replace />;
};
