import React from "react";
import Header from "../components/Header/Header";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const Root = () => {
  return (
    <div>
      <Header></Header>
      <Outlet></Outlet>
      <Toaster />
    </div>
  );
};

export default Root;
