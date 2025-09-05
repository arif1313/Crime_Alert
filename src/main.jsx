
import {router} from './Ruters'
import { createRoot } from "react-dom/client";
import "./index.css";

// তোমার router file
import { StrictMode } from "react";
import { AuthProvider } from "./pages/Auth/AuthContext";
import { RouterProvider } from "react-router-dom";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
