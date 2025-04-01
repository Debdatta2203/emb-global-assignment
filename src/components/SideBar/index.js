import React from "react";
import MenuItem from "./MenuItem";
import { menu } from "../../constants/menu";
import "./style.css";

const SideBar = () => {
  return (
    <div className="sidebar">
      {menu?.map((menuItem) => (
        <MenuItem key={menuItem.name} menuItem={menuItem} />
      ))}
    </div>
  )
};

export default SideBar;