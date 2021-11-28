////link para post
const API_URLP = "/api/badge";



export const listBadges = async () => {
  return await fetch(API_URLP);
}; 


