import ACTIONS from './index';

const getQueries = () => ({ type: ACTIONS.GET_QUERIES });
const saveQueries = (payload) => ({ type: ACTIONS.SAVE_QUERIES, payload });
const resetQueries = () => ({ type: ACTIONS.RESET_QUERIES });

export {
  getQueries,
  saveQueries,
  resetQueries,
}
