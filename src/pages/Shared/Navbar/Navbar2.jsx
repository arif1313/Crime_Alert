import { NavLink } from "react-router-dom";
import logo from "../../../assets/home/icons/logo.png";
import { BiAlarm, BiDice1, BiHome, BiLink, BiLogIn, BiNews, BiSolidContact, BiSolidReport } from "react-icons/bi";
import { AiFillProfile } from "react-icons/ai";

const login = true;

const Navbar2 = () => (
  <nav className="bg-black shadow sticky top-0 z-50 px-4 py-2">
    <div className="max-w-7xl mx-auto flex justify-between items-center">

      {/* Logo Section */}
      <div className="flex items-center space-x-4 text-white font-bold text-2xl sm:text-3xl">
        <img src={logo} alt="Logo" className="h-10 w-10 sm:h-12 sm:w-12" />
        Crime Alert
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-6 text-xs sm:text-sm font-medium">
        <NavLink to="/" className="text-white hover:text-red-500 mx-2 flex flex-col items-center font-bold">
          <BiHome className="text-xl" />
          Home
        </NavLink>

        <NavLink to="/report" className="text-white hover:text-red-500 mx-2 flex flex-col items-center font-bold">
          <BiSolidReport className="text-xl" />
          Report
        </NavLink>

        <NavLink to="/safety-tips" className="text-white hover:text-red-500 mx-2 flex flex-col items-center font-bold">
          <BiDice1 className="text-xl" />
          Safety Tips
        </NavLink>

        <NavLink to="/alert" className="text-white hover:text-red-500 mx-2 flex flex-col items-center font-bold">
          <BiAlarm className="text-xl" />
          Alert
        </NavLink>

        <NavLink to="/contact" className="text-white hover:text-red-500 mx-2 flex flex-col items-center font-bold">
          <BiSolidContact className="text-xl" />
          Contact Us
        </NavLink>

        <NavLink to="/connect" className="text-white hover:text-red-500 mx-2 flex flex-col items-center font-bold">
          <BiLink className="text-xl" />
          Connection
        </NavLink>

        <NavLink to="/reports" className="text-white hover:text-red-500 mx-2 flex flex-col items-center font-bold">
          <BiNews className="text-xl" />
          Reports
        </NavLink>

        {login ? (
          <NavLink to="/profile" className="text-white hover:text-red-500 mx-2 flex flex-col items-center font-bold">
            <AiFillProfile className="text-xl" />
            Me
          </NavLink>
        ) : (
          <NavLink to="/signup/form" className="text-white hover:text-red-500 mx-2 flex flex-col items-center font-bold">
            <BiLogIn className="text-xl" />
            Sign Up
          </NavLink>
        )}
      </div>

      {/* Mobile Menu Placeholder (Optional) */}
      <div className="md:hidden">
        {/* Mobile menu/hamburger button can be added here */}
      </div>

    </div>
  </nav>
);

export default Navbar2;
