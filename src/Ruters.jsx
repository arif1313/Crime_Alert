import { createBrowserRouter } from "react-router-dom";

import Main from "./Layout/Main";


 import Form from "./pages/SignUp/Form"; 


 import MainReport from "./pages/Reports/MainReport"; 
 import ReportPost from "./pages/Report/ReportPost";
  import Home2 from "./pages/Home/Home2";
   import Profile from "./pages/Profile/Profile"; 
  
   import ReportAnalysis from "./pages/Profile/ReportAnalysis";
    import ManageReport from "./pages/Profile/ManageReport/Managereport";
     import SafetyTIps from "./pages/Home/safetyTips/SafetyTIps"; 
     import Connection from "./pages/Connection/Connection"; 
     import Feed from "./pages/Home/Feed";
import Login from "./pages/Auth/Login";
import ProtectedRoute from "./pages/Auth/ProtectedRoute";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "",
        element: <Home2 />,
        children: [
          { path: "", element: <Feed /> },
          { path: "connect", element: <Connection /> },
        ],
      },

      // Public routes
      { path: "signup/form", element: <Form /> },
   
      { path: "login", element: <Login /> }, // Login page

      // Protected routes
      {
        element: <ProtectedRoute />,
        children: [
          { path: "profile", element: <Profile /> },
          { path: "profile/analysis", element: <ReportAnalysis /> },
          { path: "profile/manage", element: <ManageReport /> },
          { path: "report", element: <ReportPost /> },
          { path: "safety-tips", element: <SafetyTIps /> },
          { path: "connect", element: <Connection /> },
          { path: "reports", element: <MainReport /> },
        ],
      },
    ],
  },
]);
