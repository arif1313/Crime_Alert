import { createBrowserRouter } from "react-router-dom";
import Main from "./Layout/Main";


import SignUp from "./pages/SignUp/SignUp";
import Form from "./pages/SignUp/Form";
import PasswordCreate from "./pages/SignUp/PasswordCreate";
import Reports from "./pages/Reports/Reports";
import MainReport from "./pages/Reports/MainReport";
import ReportPost from "./pages/Report/ReportPost";
import Home2 from "./pages/Home/Home2";
import Profile from "./pages/Profile/Profile";
import SubProfile from "./pages/Profile/SubProfile";
import ReportAnalysis from "./pages/Profile/ReportAnalysis";
import ManageReport from "./pages/Profile/ManageReport/Managereport";
import SafetyTIps from "./pages/Home/safetyTips/SafetyTIps";
import Connection from "./pages/Connection/Connection";
import Feed from "./pages/Home/Feed";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "", // or simply omit this for Home
        element: <Home2/>,
        children:[
          {
            path: "",
            element:<Feed></Feed>
          },
          {
            path:"connect",
            element:<Connection></Connection>
          },


        ]

      
      },
      {
        path: "report", // Remove the leading "/"
        element: <ReportPost />,
        
      },
      {
        path: "connect", // Remove the leading "/"
        element: <Connection />,

        
      },
      {
        path: "safety-tips", // Remove the leading "/"
        element: <SafetyTIps />,

        
      },
      
  
      {
        path: "profile", // Remove the leading "/"
        element: <Profile />,
        children:[
          {
            path:'',
            element:<SubProfile></SubProfile>

          },
          {
            path:'analysis',
            element:<ReportAnalysis></ReportAnalysis>

          },
          {
            path: 'manage',
            element: <ManageReport />
          }
          
          
         
        ]

        
      },
    
      {
        path:"signup",
        element:<SignUp></SignUp>,
        children:[
          {
            path:'form',
            element:<Form></Form>
          },
          {
            path:'pass',
            element:<PasswordCreate></PasswordCreate>
          },
        ]
      }
    ],
  },
  {
    path: "reports", 
    element: <MainReport />,
    children:[
      {
        path:'',
        element:<Reports></Reports>
      },
      
    ]

    
  },
]);
