import Identify from "../assets/identify.svg";
import Information from "../assets/information.svg";
import Submit from "../assets/thumbs_up.svg";
import Review from "../assets/violation.svg";

export const instructions = [
  {
    id: 1,
    title: "Identify the type of HIPAA/ACA complaint",
    icon: Identify,
  },
  {
    id: 2,
    title: "Provide your contact information",
    icon: Information,
  },
  {
    id: 3,
    title: "Identify the Filed Against Entity",
    icon: Identify,
  },
  {
    id: 4, 
    title: "Describe the HIPAA/ACA violation",
    icon: Review,
  },         
  {
    id: 5,
    title: "Review and Submit",
    icon: Submit,
  },
];