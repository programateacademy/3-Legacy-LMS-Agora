import { useDispatch, useSelector } from "react-redux"; // Se importa modulos a utilizar de la libreria
import apiAgora from "../api"; // Se importa la conexion con el servidor
import { saveProjects } from "../redux/actions/projectActions"; // Se importa un metodo especifico del reducer

//hook para obtener los proyectos y guardarlo en el redux para usarlo en cualquier lado.
const useProjects = () => {
  const dispatch = useDispatch();
  const projects = useSelector(store => store.projects.data);

  const getProject = async (id, authorization) => {
    try {
      const { data } = await apiAgora.get(`/api/agora/get-project/${id}`, {
        headers: { Authorization: authorization },
      });
      dispatch(saveProjects({
        ...projects,
        [id]: { name: data.titleProject, id },
      }));

    } catch (error) {
      console.error(error);
    }
  }

  return {
    getProject,
  }
};

export default useProjects;

