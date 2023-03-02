import { combineReducers } from "redux";
import auth from "./authReducer";
import token from "./tokenReducer";
import menu from "./menuReducer";
import projects from "./projectReducer";
import workbooks from "./workbooksReducer";
import queries from "./queriesReducer";

export default combineReducers({
  auth,
  token,
  menu,
  projects,
  workbooks,
  queries
});
