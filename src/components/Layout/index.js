import React from "react";
import Navbar from "../Navbar";
import SideBar from "../SideBar";
import "./style.css";

const Layout = ({ children}) => {
  return (
    <div>
      {/* navbar */}
      <Navbar />
      {/* layout container */}
      <div className="layout-container">
        {/* sidebar */}
        {/* <SideBar /> */}
        {/* layout content */}
        <div className="layout-content">
          {children}
        </div>
      </div>
    </div>
  )
};

export default Layout;