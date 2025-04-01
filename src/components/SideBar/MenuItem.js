import React from "react";
import { Link } from "react-router-dom";

const MenuItem = ({ menuItem }) => {
    return (
        <div className="menu-item">
            <img src={menuItem.icon} alt={menuItem.name} />
            <Link className="link" to={menuItem.path}>{menuItem.name}</Link>
        </div>
    )
};

export default MenuItem;