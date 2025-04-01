import { complaintType } from './constants/complaintType';

// get complaint type name
export const getSelectedComplaintTypeName = (selectedComplaintType) => {
  const selectedComplaint = complaintType.find(item => item.id === selectedComplaintType);
  // split the name and join with underscore
  const name = selectedComplaint?.name?.split(" ");
  return name?.join("_");
};
