import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App";
import DataProvider from "./redux/store";
import 'remixicon/fonts/remixicon.css';

const Root = createRoot(document.getElementById("root"));

Root.render(
  <React.StrictMode>
    <DataProvider>
      <App />
    </DataProvider>
  </React.StrictMode>,
);
