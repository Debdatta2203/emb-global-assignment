import { complaintType } from './constants/complaintType';

// get complaint type name
export const getSelectedComplaintTypeName = (selectedComplaintType) => {
  const selectedComplaint = complaintType.find(item => item.id === selectedComplaintType);
  // split the name and join with underscore
  const name = selectedComplaint?.name?.split(" ");
  return name?.join("_");
};

// check if the value is empty
export const isEmpty = (value) => {
  return value === null || value === undefined || value === "";
};

// email validation
export const emailValidation = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// phone validation
export const phoneValidation = (phone) => {
  const phoneRegex = /^\d{10}$/;
  return phoneRegex.test(phone);
};

// zip code validation
export const zipCodeValidation = (zipCode) => {
  const zipCodeRegex = /^\d{5}$/;
  return zipCodeRegex.test(zipCode);
};

// converts camel case to title case
export const camelToTitleCase = (input) => {
  // returns empty string if input is null or empty
  if (!input) {
    return '';
  }
  // splits the string by replacing the capital letters with space followed by the letter
  const words = input.replace(/([A-Z])/g, " $1");
  // returns the words, capitalizing the first letter of the group (e.g., organizationName -> Organization Name)
  return words.charAt(0).toUpperCase() + words.slice(1);
};

// format phone number
export const formatPhoneNumber = (phone) => {
  // converts number to string in case it's passed as a number
  let str = phone.toString();
  let formattedStr = "";


  return str;
};