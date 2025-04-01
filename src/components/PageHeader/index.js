import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

const PageHeader = ({ 
  heading, previousPage, previousPagePath,
  nextPage, nextPagePath
}) => {
    return (
      <div className="page-header">
        <h1>{heading}</h1>
      </div>
    )
};

export default PageHeader;