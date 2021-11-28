import axios from "axios";

////link para post
export const API_URLP = "/api/agora/new-project";
////link para get-one
const API_URL2 = `/api/agora/get-one-project`;


export const listProjects = async (token) => {
  const res = await axios.get("/api/agora/get-projects",{
          headers: {Authorization: token}})
  return res;
};

export const oneproject = async (id, token) => {
  const res = await axios.get(`${API_URL2}/${id}`,{
          headers: {Authorization: token}})
  return res;
  
};

export const registerProject = async (newProject) => {
  return await fetch(API_URLP, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: String(newProject.name).trim(),
      context: String(newProject.context).trim(),
      date: String(newProject.date).trim(),
      deliverables: String(newProject.deliverables).trim(),
      description: String(newProject.description).trim(),
      evaluationModality: String(newProject.evaluationModality).trim(),
      pedagogyModality: String(newProject.pedagogyModality).trim(),
      performance: String(newProject.performance).trim(),
      picture: String(newProject.picture).trim(),
      resources: Array(newProject.resources),
      tags: Array(newProject.tags),
      competencies: Array(newProject.competencies),
      competenceFramework: String(newProject.competenceFramework).trim(),
    }),
  });
};
