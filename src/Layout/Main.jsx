import { Outlet } from "react-router-dom"
// import Navbar from "../pages/Shared/Navbar/Navbar"
import Footer from "../pages/Shared/Footer/Footer"
// import Navbar2 from "../pages/Shared/Navbar/Navbar2"
import Navbar from "../pages/Shared/Navbar/Navbar"



const Main = () => {
  return (
    <div className=" ">
       <Navbar></Navbar>
        <Outlet></Outlet>
        <Footer></Footer>
    </div>
  )
}

export default Main