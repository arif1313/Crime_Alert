// import { useContext } from "react";
// import { Link, NavLink } from "react-router-dom";
// import { AuthContext } from "../Contex/AuthProvider";

import '../Navbar/nav.css'

import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
// swall import 
// import Swal from 'sweetalert2'
// import { useState } from "react";



const Navbar = () => {
const [click, setClick]= useState(true);
const user=true
const handleLogOut=()=>{}
//   const {user,LogOut}= useContext(AuthContext);
  // const handleLogOut=()=>{
  //   Swal.fire({
  //     title: "Are you sure?",
  //     text: "Are you want to logout?",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "logout"
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       LogOut()
  //       .then(()=>{console.log('logoutsucces')
  //      Swal.fire({
  //         title: "Logged Out",
  //         text: "You are Logged out",
  //         icon: "success"
  //       });
      
  //     })
        
  //       .catch(error=>console.error(error))
       
  //     }
  //   });

   
  // }
        const someLink = <>
        <li ><NavLink className=" focus:text-green-500" to="/">Home</NavLink></li>
     
         <li><NavLink className=" focus:text-green-500" to="/allprooerty"> All Prooerty</NavLink></li>
        
        {user&& <li><NavLink className=" focus:text-green-500" to="/dashboard/cover">DashBord</NavLink></li>}
 
         { !click &&<NavLink onClick={()=>setClick(true)} className=" btn btn-sm btn-primary " to="/sinup">Signup</NavLink> }
 
 {click&& <Link onClick={()=>setClick(false)} to="/login" className="btn  btn-sm border-none bg-green-500 text-white " >login</Link>}
     
      </>
       
    return (
        <div className="mx-auto  container border-b-2">
        <div>
          <div className="navbar  fixed z-30 bg-black container mx-auto bg-opacity-20    font-bold rounded-md">
            <div className="navbar-start">
              <div className="dropdown">
                <label tabIndex={0} className="btn btn-ghost lg:hidden">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                </label>
                <ul tabIndex={0} className="menu menu-sm bg-black  dropdown-content mt-3 z-[1] p-2 shadow  rounded-box w-52">
                  {
                    someLink
                  }
                </ul>
              </div>
              <h2 className="normal-case  md:text-3xl text-white font-bold flex items-center"><img  className="w-12 h-12" src={''} alt="" /><span className="text-green-400">D</span>rem<span className="text-green-400">D</span>well </h2>
            </div>
          
            <div className="navbar-center hidden lg:flex">
              <ul className=" menu-horizontal space-x-5 px-1 ">
                {
                  someLink
                }
              </ul>
            </div>
  
            <div className="navbar-end flex-col md:flex-row gap-2">
              {
                user && <> 
           
             <img className="rounded-full h-10 w-10  mr-4" src={user.photoURL?user.photoURL:''} alt="" />
                       <label onClick={handleLogOut} className=" btn btn-sm bg-green-500 border-none text-white normal-case">LogOut</label>
                </> 
              }
            </div>
  
          </div>
         
        </div>
      
     
      </div>
  );
};


export default Navbar;