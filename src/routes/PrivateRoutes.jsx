import React, { useContext } from "react";
import { AuthContext } from "../providers/AuthProviders";
import { Navigate } from "react-router-dom";

const PrivateRoutes = ({ children }) => {
  // Use context api
  const { user } = useContext(AuthContext);

  if (user) {
    return children;
  }

  return <Navigate to="/login" replace={true}></Navigate>;
};

export default PrivateRoutes;
