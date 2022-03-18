import apiAgora from "../../../../../../api"

export const listOutcomes = async (_id) => {
  return await apiAgora.get(`/api/agora/get-outcome/${_id}`);
};

export const evaluate = async (_id, array) => {
  return await apiAgora.patch(`/api/agora/update-outcome/${_id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      result: String(array).trim(),
    }),
  });
};
