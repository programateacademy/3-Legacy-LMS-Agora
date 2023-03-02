import { useDispatch, useSelector } from "react-redux";
import apiAgora from "../api";
import { saveWorkbooks } from "../redux/actions/workbooksActions";

const useWorkbook = () => {
  const dispatch = useDispatch();
  const workbooks = useSelector(store => store.workbooks.data);

  const getWorkbook = async (id, authorization) => {
    try {
      const { data } = await apiAgora.get(`/api/agora/get-workbook/${id}`, {
        headers: { Authorization: authorization },
      });
      dispatch(saveWorkbooks({
        ...workbooks,
        [id]: { name: data.titleWorkbook, id },
      }));

    } catch (error) {
      console.error(error);
    }
  }

  return {
    getWorkbook,
  }
};

export default useWorkbook;

