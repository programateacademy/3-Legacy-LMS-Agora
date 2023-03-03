import { useDispatch, useSelector } from "react-redux"; // Se importa modulos a utilizar de la libreria
import apiAgora from "../api"; // Se importa la conexion con el servidor
import { saveWorkbooks } from "../redux/actions/workbooksActions"; // Se importa un metodo especifico del reducer

//hook para obtener los proyectos y guardarlo en el redux para usarlo en cualquier lado.
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

