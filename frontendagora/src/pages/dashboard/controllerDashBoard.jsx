import apiAgora from "../../api"

export const listDash = async (id) => {
  return await apiAgora.get(`/api/agora/get-outcome-dash/${id}`);
}; 

