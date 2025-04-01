import React, { useState } from "react";
import PageHeader from "../../components/PageHeader";
import { complaintType } from "../../constants/complaintType";
import { getSelectedComplaintTypeName } from "../../common";
import "./style.css";

const ComplaintType = ({ selectedComplaintType, setSelectedComplaintType }) => {
  return (
    <div>
      <PageHeader
        heading="Administrative Simplification Enforcement and Testing Tool (ASETT)"
        previousPage="Welcome"
        previousPagePath="/"
        nextPage="Complainant Information"
        nextPagePath={`/complainant_information/${getSelectedComplaintTypeName(selectedComplaintType)}`}
      />
      <div className="page-content">
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
    </div>        
  )
};

export default ComplaintType;