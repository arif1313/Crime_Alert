import { NavLink } from "react-router-dom";
import logo from "../../../assets/home/icons/logo.png";

const Navbar2 = () => (
    <nav className="bg-black  shadow sticky top-0 z-50 px-4 py-2">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-15">
       
          <img src={logo} alt="Logo" className="h-15 w-15" />

          {/* "https://placehold.co/40x40" /// dummy pic linkd */}
          {/* search option */}
          {/* <input
            type="text"
            placeholder="Search"
            className="hidden sm:block px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          /> */}
        </div>
        <div className="flex space-x-15 text-sm font-medium">
          <a href="#" className="flex flex-col items-center font-bold text-red-700 hover:text-blue-600">
            <svg className="h-5 w-5 mb-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2a8 8 0 100 16 8 8 0 000-16z" />
            </svg>
            <NavLink to="/" className="text-white hover:text-red-500 mx-2">
        Home
      </NavLink>
          </a>
          <a href="#" className="flex flex-col items-center text-gray-600 hover:text-blue-600">
            <svg className="h-5 w-5 mb-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M4 3a1 1 0 00-1 1v1h14V4a1 1 0 00-1-1H4z" />
              <path fillRule="evenodd" d="M3 7h14v10a1 1 0 01-1 1H4a1 1 0 01-1-1V7zm4 3a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
            </svg>
            Jobs
          </a>
          <a href="#" className="flex flex-col items-center text-gray-600 hover:text-blue-600">
            <svg className="h-5 w-5 mb-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v3h-1a1 1 0 00-.993.883L16 9v5a2 2 0 01-2 2H6a2 2 0 01-2-2V9a1 1 0 00-.883-.993L3 8H2V5z" />
            </svg>
            Messaging
          </a>
          <a href="#" className="flex flex-col items-center text-gray-600 hover:text-blue-600">
            <svg className="h-5 w-5 mb-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2a6 6 0 016 6c0 4.418-6 10-6 10S4 12.418 4 8a6 6 0 016-6z" />
            </svg>
            Notifications
          </a>
          <a href="#" className="flex flex-col items-center text-gray-600 hover:text-blue-600">
            <img src="https://placehold.co/24x24" alt="User" className="rounded-full" />
            Me
          </a>
        </div>
      </div>
    </nav>
  );
  export default Navbar2;