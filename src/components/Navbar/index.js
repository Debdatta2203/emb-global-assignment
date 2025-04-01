import React from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../assets/logo.svg";
import { menu } from "../../constants/menu";
import "./style.css";

const Navbar = () => {
  // location
  const location = useLocation();

  return (
    <div className="navbar">
        <div className="navbar-container">
          {/* logo */}
          <div className="navbar-logo">
            <img src={Logo} alt="logo" />
          </div>
          {/* menu links */}
          <div className="navbar-menu-links">
            {menu?.map((item, index) => (
              <Link 
                className={`navbar-menu-link link ${location.pathname === item.path ? "active" : ""}`} 
                to={item.path} key={index}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
    </div>
  )
};

export default Navbar;