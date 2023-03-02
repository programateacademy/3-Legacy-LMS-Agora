import ACTIONS from './index';

const getWorkbooks = () => ({ type: ACTIONS.GET_WORKBOOKS });
const saveWorkbooks = (payload) => ({ type: ACTIONS.SAVE_WORKBOOKS, payload });
const resetWorkbooks = () => ({ type: ACTIONS.RESET_WORKBOOKS });

export {
  getWorkbooks,
  saveWorkbooks,
  resetWorkbooks,
}
