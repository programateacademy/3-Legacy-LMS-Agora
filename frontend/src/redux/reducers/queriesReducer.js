import ACTIONS from "../actions/";

const initialState = {
  loading: false,
  data: {},
  isError: false,
};

const querieReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.GET_QUERIES:
      return {
        ...state,
        loading: true,
      };
    case ACTIONS.SAVE_QUERIES:
      return {
        ...state,
        loading: false,
        data: { ...state.data, ...action.payload }
      };
    case ACTIONS.RESET_QUERIES:
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

export default querieReducer;
