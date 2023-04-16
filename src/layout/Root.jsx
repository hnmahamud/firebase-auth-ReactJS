import React, { useContext } from "react";
import Header from "../components/Header/Header";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthContext } from "../providers/AuthProviders";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";

const Root = () => {
  const { loading } = useContext(AuthContext);

  if (loading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  return (
    <>
      <Header></Header>
      <Outlet></Outlet>
      <Toaster />
    </>
  );
};

export default Root;
