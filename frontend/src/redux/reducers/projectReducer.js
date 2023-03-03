import ACTIONS from "../actions/"; // Se importa las diferentes acciones definidas
// Arbol de objecto que define inicialmente para usarlo en cualquier lado del proyecto
const initialState = {
  loading: false,
  data: {},
  isError: false,
};

const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.GET_PROJECTS:
      return {
        ...state,
        loading: true,
      };
    case ACTIONS.SAVE_PROJECTS:
      return {
        ...state,
        loading: false,
        data: { ...state.data, ...action.payload }
      };
    case ACTIONS.RESET_PROJECTS:
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

export default projectReducer;
