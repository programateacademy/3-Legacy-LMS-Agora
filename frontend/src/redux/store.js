import React from "react";
import { createStore } from "redux";
import rootReducer from "./reducers";
import { Provider } from "react-redux";

//Objeto que mantiene el árbol de estado de la aplicación
const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

function DataProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}

export default DataProvider;
