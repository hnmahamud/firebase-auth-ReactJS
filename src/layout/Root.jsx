import React from "react";
import Header from "../components/Header/Header";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const Root = () => {
  return (
    <>
      <Header></Header>
      <Outlet></Outlet>
      <Toaster />
    </>
  );
};

export default Root;
