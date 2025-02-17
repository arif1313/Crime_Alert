
import { useEffect, useState } from 'react';
import logo from '../../../assets/home/icons/logo.png'
const Navbar = () => {
    const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setIsVisible(false); // Hide navbar on scroll down
      } else {
        setIsVisible(true); // Show navbar on scroll up
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);
  const login = true;
  const navLinks = <>
      <li className="">
          <a className="text-white 
 hover:text-red-500">Home</a>
      </li>
      <li className="">
          <a className="text-white 
 hover:text-red-500">Report</a>
      </li>
      <li className="">
          <a className="text-white 

 hover:text-red-500">Safety Tips</a>
      </li>
      <li className="">
          <a className="text-white 
 hover:text-red-500">Alert</a>
      </li>
      <li className="">
          <a className="text-white 
 hover:text-red-500">Contact Us</a>
      </li>
  </>;

  return (
   
      <div  className={`fixed top-0 w-full bg-black z-10 text-white p-4 transition-transform duration-300 navbar  ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}>
          <div className="navbar-start">
              <div className="dropdown">
                  <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                      <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor">
                          <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M4 6h16M4 12h8m-8 6h16" />
                      </svg>
                  </div>
                  <ul
                      tabIndex={0}
                      className="menu menu-sm dropdown-content rounded-box z-[1] mt-3 w-52 p-2 shadow">
                      {navLinks}
                  </ul>
              </div>
              <h1 className="text-2xl flex items-center font-extrabold"><img className='h-12 w-12' src={logo} alt="" /> CrimeAlert</h1>
          </div>
          <div className="navbar-center hidden lg:flex">
              <ul className="menu menu-horizontal px-1 font-bold">
                  {navLinks}
              </ul>
          </div>
          <div className="navbar-end ">
              {login ? <a className="btn bg-[#E50914]   border-0 hover:bg-red-800 text-white">Sign Up</a> : <a className="btn">Login</a>}
          </div>
      </div>
  );
}

export default Navbar;
