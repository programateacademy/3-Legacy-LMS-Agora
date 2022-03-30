import ACTIONS from "./index";
import apiAgora from "../../api";

export const fetchAllAnunncies = async (token) => {
  const res = await apiAgora.get("/api/agora/get-announcies", {
    headers: { Authorization: token },
  });
  return res;
};

export const dispatchGetAllAnnucies = (res) => {
  return {
    type: ACTIONS.GET_ANNUNCIES,
    payload: res.data,
  };
};
