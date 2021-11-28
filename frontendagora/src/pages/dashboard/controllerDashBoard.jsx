////link para post
const API_URLP = "/api/agora";



export const listDash = async (id) => {
  return await fetch(`${API_URLP}/get-outcome-dash/${id}`);
}; 

