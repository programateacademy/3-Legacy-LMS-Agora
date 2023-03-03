import { useDispatch, useSelector } from "react-redux"; // Se importa modulos a utilizar de la libreria
import apiAgora from "../api"; // Se importa la conexion con el servidor
import { saveQueries } from "../redux/actions/queriesActions";  // Se importa un metodo especifico del reducer

//hook para obtener los proyectos y guardarlo en el redux para usarlo en cualquier lado.
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
