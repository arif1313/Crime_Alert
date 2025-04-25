import { useEffect, useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../../assets/home/icons/logo.png";

// eslint-disable-next-line react/prop-types
const Navbar = ({ section }) => {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      if (section !== "main") {
        setIsVisible(true); // Keep the navbar always visible
        return; // Exit early
      }
  
      const scrollY = window.scrollY;
      const scrollingDown = scrollY > lastScrollY.current;
      const scrollingUp = scrollY < lastScrollY.current;
  
      if (scrollingDown) {
        setIsVisible(false);
      } else if (scrollingUp) {
        setIsVisible(true);
      }
  
      lastScrollY.current = scrollY;
    };
  
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [section]);
  
  const login = true;
  const navLinks = (
    <>
      <NavLink to="/" className="text-white hover:text-red-500 mx-2">
        Home
      </NavLink>
      <NavLink to="/report" className="text-white hover:text-red-500 mx-2">
        Report
      </NavLink>
      <NavLink to="/safety-tips" className="text-white hover:text-red-500 mx-2">
        Safety Tips
      </NavLink>


      <NavLink to="/alert" className="text-white hover:text-red-500 mx-2 relative flex items-center">
  <span>Alert</span>
  <span className="absolute -top-4 left-5 badge badge-secondary text-xs">12</span>
</NavLink>
      <NavLink to="/contact" className="text-white hover:text-red-500 mx-2">
        Contact Us
      </NavLink>
      <NavLink to="/connect" className="text-white hover:text-red-500 mx-2">
        Connection
      </NavLink>
      <NavLink to="/reports" className="text-white hover:text-red-500 mx-2">
        Reports
      </NavLink>
    </>
  );

  return (
    <div
      className={`fixed top-0 w-full bg-black z-50 text-white p-4 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="flex justify-between items-center">
        {/* Left Side - Logo */}
        <div className="flex items-center">
          <img className="h-12 w-12" src={logo} alt="CrimeAlert Logo" />
          <h1 className="text-2xl font-extrabold ml-2">CrimeAlert</h1>
        </div>

        {/* Right Side - Auth Button */}
        <div className="flex gap-4 items-center">
          <div className="flex gap-4">
            <div className="px-1 font-bold flex gap-4">{navLinks}</div>
          </div>
          <div>
            {login ? (
              <button className="btn bg-[#E50914] border-0 hover:bg-red-800 text-white">
                <NavLink to="/signup/form" className="text-white">Sign Up</NavLink>
              </button>
            ) : (
              <button className="btn">Login</button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <div className="lg:hidden mt-2">
        <details className="dropdown">
          <summary className="btn btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </summary>
          <ul className="menu dropdown-content rounded-box z-[1] mt-3 w-52 p-2 shadow">
            {navLinks}
          </ul>
        </details>
      </div>
    </div>
  );
};

export default Navbar;
