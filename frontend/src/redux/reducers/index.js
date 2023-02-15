import { combineReducers } from "redux";
import auth from "./authReducer";
import token from "./tokenReducer";
import menu from "./menuReducer";
import projects from "./projectReducer";

export default combineReducers({
  auth,
  token,
  menu,
  projects
});
