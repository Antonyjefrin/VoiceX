import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";

const Layout = () => {
  return (
    <div className="layout-container h-screen w-full bg-[#080808]">
      <Header />
      <div className="main">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
