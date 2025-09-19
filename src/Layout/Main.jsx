import { Outlet } from "react-router-dom"

import Navbar2 from "../pages/Shared/Navbar/Navbar2"



const Main = () => {
  return (
    <div className=" ">
       <Navbar2 section={'main'}></Navbar2>
        <Outlet></Outlet>
        
    </div>
  )
}

export default Main