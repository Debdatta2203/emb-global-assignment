import React from "react";
import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa6";
import { instructions } from "../../constants/instructions";
import "./style.css";

const Instructions = () => {
  return (
    <div>
      <div className="page-content">
        <div className="flex-container">
          {/* page details */}
          <div className="page-details">
            <div className="w-80">
              <div className="page-header">
                Administrative Simplification Enforcement and Testing Tool (ASETT)
              </div>
              <h1>File a HIPAA Complaint in 5 Steps!</h1>
              <div className="warning-text">
                Disclaimer: If you file a complaint without registration, you will not be able to view your complaints,upload supporting documents, correspond electronically, or test transactions.
              </div>
              <p className="text">
                The following is the list of steps you will take in order to file a complaint regarding HIPAA Transactions and Code Sets, Unique Identifiers, and/or Operating Rules. If you wish to file a Health Insurance Privacy complaint, please visit the Office for Civil Rights (OCR) website.
              </p>
              <p className="text">
                You can review all information entered before submitting your complaint to CMS. Once the complaint is submitted, CMS will review all information and respond to your complaint.
              </p>
              <p className="text mb-3">
                Click the Complaint Type button below to begin filing your complaint.
              </p>
              {/* next page navigation */}
              <Link to="/complaint_type" className="button">
                Complaint Type
                <FaChevronRight />
              </Link>
            </div>
          </div>
          {/* instructions container */}
          <div className="instructions-container">

            {instructions.map((instruction, index) => (
              <div className="instruction-item" key={instruction.id}>
                <div className="instruction-icon">
                  <img src={instruction.icon} alt={instruction.title} />
                </div>
                <div className="instruction-title">{instruction.title}</div>
                {index !== instructions.length - 1 && <div className="instruction-line"></div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
};

export default Instructions;