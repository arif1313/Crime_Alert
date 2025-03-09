import { Outlet } from "react-router-dom"
import Navbar from "../Shared/Navbar/Navbar"


function MainReport() {
  return (
    <div>
      <div className="sticky top-0">
        <Navbar section='reports'></Navbar>
      </div>
      
  
        <Outlet></Outlet>


    </div>
  )
}

export default MainReport