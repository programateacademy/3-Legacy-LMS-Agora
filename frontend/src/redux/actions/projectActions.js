import ACTIONS from './index'; // Se importa las acciones agregadas globalmente y declaradas

// Acciones para poder guardar un dato en el redux
const getProjects = () => ({ type: ACTIONS.GET_PROJECTS });
const saveProjects = (payload) => ({ type: ACTIONS.SAVE_PROJECTS, payload });
const resetProjects = () => ({ type: ACTIONS.RESET_PROJECTS });

export {
  getProjects,
  saveProjects,
  resetProjects,
}
