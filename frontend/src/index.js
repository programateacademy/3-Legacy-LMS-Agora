import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App";
import DataProvider from "./redux/store";
import 'remixicon/fonts/remixicon.css';

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <DataProvider>
      <App />
    </DataProvider>
  </React.StrictMode>,
);
