import { createBrowserRouter } from "react-router-dom";
import Main from "./Layout/Main";
import Home from "./pages/Home/Home";

import ConnecPeople from "./pages/ConnectPeople/ConnecPeople";
import SignUp from "./pages/SignUp/SignUp";
import Form from "./pages/SignUp/Form";
import PasswordCreate from "./pages/SignUp/PasswordCreate";
import Reports from "./pages/Reports/Reports";
import MainReport from "./pages/Reports/MainReport";
import ReportPost from "./pages/Report/ReportPost";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "", // or simply omit this for Home
        element: <Home />,
      
      },
      {
        path: "report", // Remove the leading "/"
        element: <ReportPost />,
        
      },
      {
        path: "connnect", // Remove the leading "/"
        element: <ConnecPeople />,

        
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
      }
    ]

    
  },
]);
