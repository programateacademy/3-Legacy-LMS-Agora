import ACTIONS from './index'; // Se importa las acciones agregadas globalmente y declaradas

// Acciones para poder guardar un dato en el redux
const getQueries = () => ({ type: ACTIONS.GET_QUERIES });
const saveQueries = (payload) => ({ type: ACTIONS.SAVE_QUERIES, payload });
const resetQueries = () => ({ type: ACTIONS.RESET_QUERIES });

export {
  getQueries,
  saveQueries,
  resetQueries,
}
