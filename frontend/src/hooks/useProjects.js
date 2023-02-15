import { useDispatch, useSelector } from "react-redux";
import apiAgora from "../api";
import { saveProjects } from "../redux/actions/projectActions";

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
}

export default useProjects