import { createBrowserRouter } from "react-router-dom";

import Main from "./Layout/Main";
import Form from "./pages/SignUp/Form";
import ReportPost from "./pages/Report/ReportPost";
import Home2 from "./pages/Home/Home2";

import SafetyTIps from "./pages/Home/safetyTips/SafetyTIps";
import Connection from "./pages/Connection/Connection";
import Feed from "./pages/Home/Feed";
import Login from "./pages/Auth/Login";
import ProtectedRoute from "./pages/Auth/ProtectedRoute";

import CrimeHeatmapFeature from "./pages/Home/CrimeHeatmap/CrimeHeatmapFeature";
import ReportUpdate from "./pages/Report/ReportUdate";

import ProfileMain from "./pages/Profile/ProfileMain";
import FrofileFeed from "./pages/Profile/FrofileFeed";
import ReportDetails from "./pages/Reports/ReportDetails ";
import Aboutme from "./pages/Profile/Aboutme";
import DeletedReports from "./pages/Profile/DeletedReports";
import ActionTeamCreate from "./pages/Actionteam/ActionTeamCreate";
import ActionTeam from "./pages/Actionteam/ActionTeam";
import AllUser from "./pages/Actionteam/AllUser";
import ActionReport from "./pages/Reports/ActionReport";
import AreaReportOvarviw from "./pages/Reports/AreaReportOvarviw";
import ReportBarChart from "./pages/Reports/Charts/ReportBarChart";

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
              { index:true, element: <Aboutme /> },
              { path:'myReport', element: <FrofileFeed /> }, // default /profile
              { path: "analysis", element: <ReportBarChart /> }, 
              { path: "aboutme", element: <Aboutme /> },// /profile/analysis
                { path: "report/:id", element: <ReportDetails /> },
                { path: "deleted", element: < DeletedReports/> },
                { path: "reports", element: < Feed/>},
                { path: "ActionTeam/create", element: < ActionTeamCreate/>},
                {path: "Manage/ActionTeam", element: < ActionTeam/>},
                {path: "userMange", element: < AllUser/>},
                {path: "action", element: < ActionReport/>},
                {path:"areaReport",element:<AreaReportOvarviw />}

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
