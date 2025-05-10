import React from "react";
import ReactDOM from "react-dom/client";
import './index.css'
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes"; // Update path as needed
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </React.StrictMode>
);
