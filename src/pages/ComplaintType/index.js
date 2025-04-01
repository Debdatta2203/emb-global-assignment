import React from "react";
import { Link } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa6";
import ProgressBar from "../../components/ProgressBar";
import { complaintType } from "../../constants/complaintType";
import "./style.css";

const ComplaintType = ({ selectedComplaintType, setSelectedComplaintType }) => {
  return (
    <div>
      <div className="page-content complaint-type-page">
        {/* progress bar */}
        <ProgressBar currentStep={1} />
        {/* page heading */}
        <div className="page-heading">
          <h1>Complaint Type</h1>
          <div className="text-muted">(Make a selection below)</div>
        </div>
        {/* complaint cards */}
        <div className="complaint-type-container">
          {complaintType.map((item) => (
            <div 
              key={item?.id} className={`card complaint-type-item ${item?.id === selectedComplaintType && "selected"}`}
              onClick={() => setSelectedComplaintType(item?.id)}
            >
              <div className="card-header">{item?.name}</div>
              <div className="text-muted">{item?.description}</div>
            </div>
          ))}
        </div>
        {/* page navigation */}
        <div className="page-navigation">
          <Link to="/" className="button">
            Home
            <FaChevronLeft />
          </Link>
          <Link to="/" className="button">Cancel</Link>
          <Link to="/complainant_information" className="button">
            Complainant Information
            <FaChevronRight />
          </Link>
        </div>
      </div>
    </div>        
  )
};

export default ComplaintType;