import React from "react";
import {createRoot} from "react-dom/client";
import "./index.css";
import { App } from "./App";
import DataProvider from "./redux/store";

const Conteiner = document.getElementById("root");
const root = createRoot(Conteiner);

root.render(
  <React.StrictMode>
    <DataProvider>
      <App />
    </DataProvider>
  </React.StrictMode>,
);
