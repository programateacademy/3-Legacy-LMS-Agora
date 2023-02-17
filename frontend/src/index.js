import React from "react";
<<<<<<< HEAD
import { createRoot } from "react-dom/client";
=======
import {createRoot} from "react-dom/client";
>>>>>>> 940fc670bd66d2c16325c201bf12bc8b6f0ca42a
import "./index.css";
import { App } from "./App";
import DataProvider from "./redux/store";
import 'remixicon/fonts/remixicon.css';

<<<<<<< HEAD
const Root = createRoot(document.getElementById("root"));

Root.render(
=======
const Conteiner = document.getElementById("root");
const root = createRoot(Conteiner);

root.render(
>>>>>>> 940fc670bd66d2c16325c201bf12bc8b6f0ca42a
  <React.StrictMode>
    <DataProvider>
      <App />
    </DataProvider>
  </React.StrictMode>,
);
