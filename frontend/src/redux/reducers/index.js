import { combineReducers } from "redux";
import auth from "./authReducer";
import token from "./tokenReducer";
import menu from "./menuReducer"

export default combineReducers({
  auth,
  token,
  menu
});
