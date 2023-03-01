import ACTIONS from "../actions/";

const initialState = {
  loading: false,
  data: {},
  isError: false,
};

const workbookReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.GET_WORKBOOKS:
      return {
        ...state,
        loading: true,
      };
    case ACTIONS.RESET_WORKBOOKS:
      return {
        ...state,
        loading: false,
        data: { ...state.data, ...action.payload }
      };
    case ACTIONS.RESET_WORKBOOKS:
      return {
        ...state,
        loading: false,
        data: initialState.data,
        isError: false,
      };
    default:
      return state;
  }
};

export default workbookReducer;
