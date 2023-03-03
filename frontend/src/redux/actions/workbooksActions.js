import ACTIONS from './index'; // Se importa las acciones agregadas globalmente y declaradas

// Acciones para poder guardar un dato en el redux
const getWorkbooks = () => ({ type: ACTIONS.GET_WORKBOOKS });
const saveWorkbooks = (payload) => ({ type: ACTIONS.SAVE_WORKBOOKS, payload });
const resetWorkbooks = () => ({ type: ACTIONS.RESET_WORKBOOKS });

export {
  getWorkbooks,
  saveWorkbooks,
  resetWorkbooks,
}
