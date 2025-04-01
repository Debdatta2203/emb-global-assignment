import React, { useState } from "react";
import ProgressBar from "../../components/ProgressBar";
import "./style.css";

const ComplaintForm = () => {
  // states
  const [formData, setFormData] = useState({
    complainantAnonymous: null,
    complainantOrganizationName: "",
    complainantOrganizationType: "",
    complainantOrganizationTypeOther: "",
    complainantOrganizationPhone: "",
    complainantTitle: "",
    complainantFirstName: "",
    complainantMI: "",
    complainantLastName: "",
    complainantAddress1: "",
    complainantAddress2: "",
    complainantCity: "",
    complainantState: "",
    complainantZip: "",
    complainantEmail: "",
    complainantPhone: "",
    complainantMobile: "",
  });

  // handle input change
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // handle form submission
  const handleFormSubmission = (e) => {
    e.preventDefault();
    // convert form data to json
    const jsonData = JSON.stringify(formData, null, 2);

    // Create a blob and download the file
    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    
    // Create a temporary download link
    const a = document.createElement("a");
    a.href = url;
    a.download = "formData.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    console.log("Hi Appiness ", jsonData);
  };

  return (
    <div>
      <div className="page-content complaint-form-page">
        {/* progress bar */}
        <ProgressBar currentStep={2} />
        {/* page heading */}
        <div className="page-heading">
          <h1>Complainant Details</h1>
        </div>
        <div className="form-container">
          {/* form */}
          <form onSubmit={handleFormSubmission}>
            <input 
              type="text"
              placeholder="Enter Complainant Organization Name"
              name="complainantOrganizationName"
              value={formData.complainantOrganizationName}
              onChange={handleInputChange}
              className="form-input"
              maxLength={75}
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>        
  )
};

export default ComplaintForm;