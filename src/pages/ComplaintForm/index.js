import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa6";
import ProgressBar from "../../components/ProgressBar";
import { 
  isEmpty, camelToTitleCase, phoneValidation, 
  emailValidation, formatPhoneNumber, zipCodeValidation
} from "../../common";
import { 
  mandatoryFields, complainantOrganizationTypes, complainantTitles, statesList,
} from "../../constants/complainantFormOptions";
import "./style.css";

const ComplaintForm = () => {
  // states
  const [error, setError] = useState({
    complainantAnonymous: "",
    complainantOrganizationName: "",
    complainantOrganizationPhoneNumber: "",
    complainantTitle: "",
    complainantFirstName: "",
    complainantLastName: "",
    complainantAddress1: "",
    complainantCity: "",  
    complainantState: "",
    complainantZipCode: "",
    complainantEmail: "",
    complainantPhoneNumber: "",
    complainantCellPhoneNumber: "",
  });
  const [formData, setFormData] = useState({
    complainantAnonymous: null,
    complainantOrganizationName: "",
    complainantOrganizationType: "",
    complainantOrganizationTypeOther: "",
    complainantOrganizationRole: "",
    complainantOrganizationPhoneNumber: "",
    complainantTitle: "",
    complainantFirstName: "",
    complainantMI: "",
    complainantLastName: "",
    complainantAddress1: "",
    complainantAddress2: "",
    complainantCity: "",
    complainantState: "",
    complainantZipCode: "",
    complainantEmail: "",
    complainantPhoneNumber: "",
    complainantPhoneNumberExtension: "",
    complainantCellPhoneNumber: "",
  });

  // handle input change
  const handleInputChange = (e, isMandatory = false) => {
    let errorMessage = "";

    // error message for phone number and email or general error message
    if(e.target.name.includes("Phone") || e.target.name.includes("Email")) {
      errorMessage = `Please enter valid ${camelToTitleCase(e.target.name)}`;
    } else {
      errorMessage = `Please enter value for ${camelToTitleCase(e.target.name)}`;
    }
    errorMessage = `Please enter value for ${camelToTitleCase(e.target.name)}`;

    if (isMandatory && isEmpty(e.target.value)) {
      setError({...error, [e.target.name]:  errorMessage});
    } else {
      setError({...error, [e.target.name]:  ""});
    }
    if (e.target.name.includes("Phone")) {
      if(phoneValidation(e.target.value)) {
        // phone validation
        setError({...error, [e.target.name]:  ""});
      } else {
        setError({...error, [e.target.name]:  errorMessage});
      }
    } 
    if(e.target.name.includes("Email")) {
      // email validation
      if(emailValidation(e.target.value)) {
        setError({...error, [e.target.name]:  ""});
      } else {
        setError({...error, [e.target.name]:  errorMessage});
      }
    } 
    setFormData({ 
      ...formData, 
      // format phone number if the input is a phone number
      [e.target.name]: e.target.name.includes("Phone") ? formatPhoneNumber(e.target.value) : e.target.value 
    });
  };

  // handle zip code change
  const handleZipCodeChange = (zipCode = "", extension = "") => {
    // updating zip code
    setFormData({
      ...formData,
      complainantZipCode: zipCode
    });
    // updating zip code extension
    if(!isEmpty(extension)) {
      setFormData({
        ...formData,
        complainantZipCode: `${formData.complainantZipCode?.split("-")[0]}-${extension}`
      });
    }
    // error for zip code, since it is mandatory
    if(isEmpty(zipCode) || !zipCodeValidation(zipCode)) {
      setError({...error, complainantZipCode: "Please enter a valid zip code"});
    } else {
      setError({...error, complainantZipCode: ""});
    }
  };

  // check if form is valid
  const isFormValid = () => {
    // check if all mandatory fields are filled
    for(let key in formData) {
      if(mandatoryFields.includes(key)) {
        if(isEmpty(formData[key])) {
          setError({...error, [key]: `Please enter value for ${camelToTitleCase(key)}`});
          return false;
        }
      }
    }

    return Object.values(error).every((item) => item === "");
  };

  // handle form submission
  const handleFormSubmission = (e) => {
    e.preventDefault();
    // check for complainant anonymous value
    if (isEmpty(formData.complainantAnonymous)) {
      setError({...error, complainantAnonymous:  "Please select an option for Complainant Anonymous"});
    } else {
      setError({...error, complainantAnonymous:  ""});
    }
    
    if(isFormValid()) {
      // convert form data to json
      const jsonData = JSON.stringify(formData, null, 2);
      console.log( jsonData);

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
    }
  };

  return (
    <div>
      <div className="page-content complaint-form-page">
        {/* progress bar */}
        <div className="w-80">
          <ProgressBar currentStep={2} />
        </div>
        {/* page heading */}
        <div className="page-heading">
          <h1>Complainant Details</h1>
        </div>
        {/* form container */}
        <div className="form-container w-80">
          {/* form */}
          <form onSubmit={handleFormSubmission}>
            {/* complainant anonymous */}
            <div className="card">
              <div className="card-body">
                <div className="form-group">
                  <label>
                    Do you want to remain anonymous during this process?
                    <span className="text-danger">*</span>
                    {/* complainant anonymous error */}
                    {error?.complainantAnonymous && (
                      <div className="form-input-error-message">
                        {error?.complainantAnonymous}
                      </div>
                    )}
                  </label>
                  <div className="form-check">
                    <div className="form-check-input">
                      <input type="radio" name="complainantAnonymous" onChange={(e) => handleInputChange(e, true)} value={true} />
                      <label htmlFor="yes">Yes</label>
                    </div>
                    <div className="form-check-input">
                      <input type="radio" name="complainantAnonymous" onChange={(e) => handleInputChange(e, true)} value={false} />
                      <label htmlFor="no">No</label>
                    </div>
                  </div>
                </div>
                <div className="warning-text w-70 mb-0">
                Disclaimer: If you select yes, CMS will not share your Information with the Filed Against Entity (FAE) during the investigation process. However, information provided in this complaint is subject to rules and policies under the Freedom of Information Act (FOIA).
                </div>
              </div>
            </div>
            {/* other form elements */}
            <div className="card">
              <div className="card-body">
                <div className="form-group">
                  <label className="w-70">
                    Complainant Organization Name&nbsp;
                    <span className="text-danger">*</span>
                    {/* complainant organization name error */}
                    {error?.complainantOrganizationName && (
                      <div className="form-input-error-message">
                        {error?.complainantOrganizationName}
                      </div>
                    )}
                  </label>
                  <input 
                    type="text"
                    name="complainantOrganizationName"
                    value={formData.complainantOrganizationName}
                    onChange={(e) => handleInputChange(e, true)}
                    onBlur={(e) => handleInputChange(e, true)}
                    className={`form-input ${error?.complainantOrganizationName ? "form-input-error" : ""}`}
                    maxLength={75}
                    isMandatory={true}
                  />
                </div>
                
                <div className="form-group">
                  <label className="w-70">
                    Complainant Organization Type
                  </label>
                  <select 
                    className="form-input" 
                    name="complainantOrganizationType" 
                    onChange={(e) => handleInputChange(e, false)}
                  >
                    {complainantOrganizationTypes?.map((type) => (
                      <option value={type?.value}>{type?.label}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label className="w-70">
                    Complainant Organization Type Other
                  </label>
                  <input 
                    type="text"
                    name="complainantOrganizationTypeOther"
                    value={formData.complainantOrganizationTypeOther}
                    onChange={(e) => handleInputChange(e, false)}
                    className="form-input"
                    maxLength={100}
                  />
                </div>
                <div className="form-group">
                  <label className="w-70">
                    Complainant Organization Role
                  </label>
                  <input 
                    type="text"
                    name="complainantOrganizationRole"
                    value={formData.complainantOrganizationRole}
                    onChange={(e) => handleInputChange(e, false)}
                    className="form-input"
                    maxLength={100}
                  />
                </div>
                <div className="form-group">
                  <label className="w-70">
                    Complainant Organization Phone&nbsp;
                    <span className="text-danger">*</span>
                    {/* complainant organization phone error */}
                    {error?.complainantOrganizationPhoneNumber && (
                      <div className="form-input-error-message">
                        {error?.complainantOrganizationPhoneNumber}
                      </div>
                    )}
                  </label>
                  <input
                    type="text"
                    placeholder="(xxx) xxx-xxxx"
                    name="complainantOrganizationPhoneNumber"
                    value={formData.complainantOrganizationPhoneNumber}
                    onChange={(e) => handleInputChange(e, true)}
                    onBlur={(e) => handleInputChange(e, true)}
                    className={`form-input ${error?.complainantOrganizationPhoneNumber ? "form-input-error" : ""}`}
                    isMandatory={true}
                  />
                </div>
                <div className="form-group">
                  <label className="w-70">
                    Complainant Title&nbsp;
                    <span className="text-danger">*</span>
                    {/* complainant title error */}
                    {error?.complainantTitle && (
                      <div className="form-input-error-message">
                        {error?.complainantTitle}
                      </div>
                    )}
                  </label>
                    <select
                      className={`form-input ${error?.complainantTitle ? "form-input-error" : ""}`}
                      name="complainantTitle"
                      onChange={(e) => handleInputChange(e, true)}
                      onBlur={(e) => handleInputChange(e, true)}
                    >
                      {complainantTitles?.map((title) => (
                        <option value={title?.value}>{title?.label}</option>
                      ))}
                    </select>
                </div>
                <div className="form-group">
                  <label className="w-70">
                    Complainant First Name&nbsp;
                    <span className="text-danger">*</span>
                    {/* complainant first name error */}
                    {error?.complainantFirstName && (
                      <div className="form-input-error-message">
                        {error?.complainantFirstName}
                      </div>
                    )}
                  </label>
                  <input
                    type="text"
                    name="complainantFirstName"
                    value={formData.complainantFirstName}
                    onChange={(e) => handleInputChange(e, true)}
                    onBlur={(e) => handleInputChange(e, true)}
                    className={`form-input ${error?.complainantFirstName ? "form-input-error" : ""}`}
                    isMandatory={true}
                    maxLength={100}
                  />
                </div>
                <div className="form-group">
                  <label className="w-70">
                    Complainant MI
                  </label>
                  <input
                    type="text"
                    name="complainantMI"
                    value={formData.complainantMI}
                    onChange={(e) => handleInputChange(e, false)}
                    className="form-input"
                    maxLength={100}
                  />
                </div>
                <div className="form-group">
                  <label className="w-70">
                    Complainant Last Name&nbsp;
                    <span className="text-danger">*</span>
                    {/* complainant last name error */}
                    {error?.complainantLastName && (
                      <div className="form-input-error-message">
                        {error?.complainantLastName}
                      </div>
                    )}
                  </label>
                  <input
                    type="text"
                    name="complainantLastName"
                    value={formData.complainantLastName}
                    onChange={(e) => handleInputChange(e, true)}
                    onBlur={(e) => handleInputChange(e, true)}
                    className={`form-input ${error?.complainantLastName ? "form-input-error" : ""}`}
                    isMandatory={true}
                    maxLength={100}
                  />
                </div>
                <div className="form-group">
                  <label className="w-70">
                    Complainant Address 1&nbsp;
                    <span className="text-danger">*</span>
                    {/* complainant address 1 error */}
                    {error?.complainantAddress1 && (
                      <div className="form-input-error-message">
                        {error?.complainantAddress1}
                      </div>
                    )}
                  </label>
                  <input
                    type="text"
                    name="complainantAddress1"
                    value={formData.complainantAddress1}
                    onChange={(e) => handleInputChange(e, true)}
                    onBlur={(e) => handleInputChange(e, true)}
                    className={`form-input ${error?.complainantAddress1 ? "form-input-error" : ""}`}
                    isMandatory={true}
                    maxLength={200}
                  />
                </div>
                <div className="form-group">
                  <label className="w-70">
                    Complainant Address 2
                  </label>
                  <input
                    type="text"
                    name="complainantAddress2"
                    value={formData.complainantAddress2}
                    onChange={(e) => handleInputChange(e, false)}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="w-70">
                    Complainant City/Town&nbsp;
                    <span className="text-danger">*</span>
                    {/* complainant city error */}
                    {error?.complainantCity && (
                      <div className="form-input-error-message">
                        {error?.complainantCity}
                      </div>
                    )}
                  </label>
                  <input
                    type="text"
                    name="complainantCity"
                    value={formData.complainantCity}
                    onChange={(e) => handleInputChange(e, true)}
                    onBlur={(e) => handleInputChange(e, true)}
                    className="form-input"
                    isMandatory={true}
                    maxLength={150}
                  />
                </div>
                <div className="form-group">
                  <label className="w-70">
                    Complainant State/Territory&nbsp;
                    <span className="text-danger">*</span>
                    {/* complainant state error */}
                    {error?.complainantState && (
                      <div className="form-input-error-message">
                        {error?.complainantState}
                      </div>
                    )}
                  </label>
                  <select 
                    className={`form-input ${error?.complainantState ? "form-input-error" : ""}`}
                    name="complainantState"
                    onChange={(e) => handleInputChange(e, true)}
                    onBlur={(e) => handleInputChange(e, true)}
                  >
                    {statesList?.map((state) => (
                      <option value={state?.value}>{state?.label}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label className="w-70">
                    Complainant Zip Code&nbsp;
                    <span className="text-danger">*</span>
                    {/* complainant zip code error */}
                    {error?.complainantZipCode && (
                      <div className="form-input-error-message">
                        {error?.complainantZipCode}
                      </div>
                    )}
                  </label>
                  <div className="form-input-autoWidth-container">
                    <input
                      type="text"
                      placeholder="55555"
                      name="complainantZipCode"
                      value={formData.complainantZipCode?.split("-")[0]}
                      onChange={(e) => handleZipCodeChange(e.target.value)}
                      onBlur={(e) => handleZipCodeChange(e.target.value)}
                      className= {`form-input-autoWidth ${error?.complainantZipCode ? "form-input-error" : ""}`}
                      isMandatory={true}
                      maxLength={5}
                    />
                    <input
                      type="text"
                      placeholder="EXT"
                      name="complainantZipExtension"
                      value={formData.complainantZipCode?.split("-")[1]}
                      onChange={(e) => handleZipCodeChange(formData.complainantZipCode?.split("-")[0], e.target.value)}
                      className="form-input-autoWidth"
                      maxLength={4}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="w-70">
                    Complainant Email Address&nbsp; 
                    <span className="text-danger">*</span>
                    {/* complainant email error */}
                    {error?.complainantEmail && (
                      <div className="form-input-error-message">
                        {error?.complainantEmail}
                      </div>
                    )}
                  </label>
                  <input
                    type="text"
                    placeholder="example@email.com"
                    name="complainantEmail"
                    value={formData.complainantEmail}
                    onChange={(e) => handleInputChange(e, true)}
                    onBlur={(e) => handleInputChange(e, true)}
                    className={`form-input ${error?.complainantEmail ? "form-input-error" : ""}`}
                    isMandatory={true}
                  />
                </div>
                <div className="form-group">
                  <label className="w-70">
                    Complainant Contact Phone Number&nbsp;
                    <span className="text-danger">*</span>
                    {/* complainant phone number error */}
                    {error?.complainantPhoneNumber && (
                      <div className="form-input-error-message">
                        {error?.complainantPhoneNumber}
                      </div>
                    )}
                  </label>
                  <div className="form-input-autoWidth-container">
                    <input
                      type="text"
                      placeholder="(xxx) xxx-xxxx"
                      name="complainantPhoneNumber"
                      value={formData.complainantPhoneNumber}
                      onChange={(e) => handleInputChange(e, true)}
                      onBlur={(e) => handleInputChange(e, true)}
                      className={`form-input-autoWidth ${error?.complainantPhoneNumber ? "form-input-error" : ""}`}
                      isMandatory={true}
                    />
                    <input
                      type="text"
                      placeholder="EXT"
                      name="complainantPhoneNumberExtension"
                      value={formData.complainantPhoneNumberExtension}
                      onChange={(e) => handleInputChange(e, false)}
                      className="form-input-autoWidth"
                      maxLength={5}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="w-70">
                    Complainant Cell Phone Number
                  </label>
                  <div className="form-input-autoWidth-container">
                    <input
                      type="text"
                      placeholder="(xxx) xxx-xxxx"
                      name="complainantCellPhoneNumber"
                      value={formData.complainantCellPhoneNumber}
                      onChange={(e) => handleInputChange(e, false)}
                      className="form-input"
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* buttons */}
            <div className="form-buttons">
              <Link to="/complaint_type" className="button">
                <FaChevronLeft />
                Specify Complaint Type
              </Link>
              <Link to="/" className="button">Cancel</Link>
              <button className="button" type="submit">
                Submit
                <FaChevronRight />
              </button>
            </div>
          </form>
        </div>
        {/* form container */}
      </div>
    </div>        
  )
};

export default ComplaintForm;