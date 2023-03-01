import ACTIONS from './index';

const getProjects = () => ({ type: ACTIONS.GET_PROJECTS });
const saveProjects = (payload) => ({ type: ACTIONS.SAVE_PROJECTS, payload });
const resetProjects = () => ({ type: ACTIONS.RESET_PROJECTS });

export {
  getProjects,
  saveProjects,
  resetProjects,
}
