////link para post
const API_URLP = "/api/agora";

export const listOutcomes = async (_id) => {
  return await fetch(`${API_URLP}/get-outcome/${_id}`);
};

export const evaluate = async (_id, array) => {
  return await fetch(`${API_URLP}/update-outcome/${_id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      result: String(array).trim(),
    }),
  });
};
