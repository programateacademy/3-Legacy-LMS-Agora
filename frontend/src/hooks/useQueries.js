import { useDispatch, useSelector } from "react-redux";
import apiAgora from "../api";
import { saveQueries } from "../redux/actions/queriesActions"; 

const useQueries= () => {
  const dispatch = useDispatch();
  const queries = useSelector(store => store.queries.data);

  const getQuery = async (id, authorization) => {
    try {
      const { data } = await apiAgora.get(`/api/agora/get-query/${id}`, {
        headers: { Authorization: authorization },
      });
      dispatch(saveQueries({
        ...queries,
        [id]: { name: data.titleQuery, id },
      }));

    } catch (error) {
      console.error(error);
    }
  }

  return {
    getQuery,
  }
};

export default useQueries;
