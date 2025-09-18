import { createBrowserRouter } from "react-router-dom";

import Main from "./Layout/Main";
import Form from "./pages/SignUp/Form";
import ReportPost from "./pages/Report/ReportPost";
import Home2 from "./pages/Home/Home2";
import ReportAnalysis from "./pages/Profile/ReportAnalysis";
import SafetyTIps from "./pages/Home/safetyTips/SafetyTIps";
import Connection from "./pages/Connection/Connection";
import Feed from "./pages/Home/Feed";
import Login from "./pages/Auth/Login";
import ProtectedRoute from "./pages/Auth/ProtectedRoute";

import CrimeHeatmapFeature from "./pages/Home/CrimeHeatmap/CrimeHeatmapFeature";
import ReportUpdate from "./pages/Report/ReportUdate";
import ReportStat from "./pages/Reports/ReportStat";
import ProfileMain from "./pages/Profile/ProfileMain";
import FrofileFeed from "./pages/Profile/FrofileFeed";
import ReportDetails from "./pages/Reports/ReportDetails ";
import Aboutme from "./pages/Profile/Aboutme";
import DeletedReports from "./pages/Profile/DeletedReports";

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

      { path: "signup/form", element: <Form /> },
      { path: "login", element: <Login /> },
      { path: "map", element: <CrimeHeatmapFeature /> },

      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "profile", // ✅ parent path
            element: <ProfileMain />, // ✅ layout for profile section
            children: [
              { index: true, element: <FrofileFeed /> }, // default /profile
              { path: "analysis", element: <ReportAnalysis /> }, 
              { path: "aboutme", element: <Aboutme /> },// /profile/analysis
               { path: "state", element: <ReportStat /> },
                { path: "report/:id", element: <ReportDetails /> },
                { path: "deleted", element: < DeletedReports/> },
                { path: "reports", element: < Feed/>}
            ],
          },
          { path: "report", element: <ReportPost /> },
          { path: "update/:id", element: <ReportUpdate /> },
          { path: "safety-tips", element: <SafetyTIps /> },
          { path: "connect", element: <Connection /> },
        ],
      },
    ],
  },
]);
