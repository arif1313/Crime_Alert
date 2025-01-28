

const Navbar = () => {
    const login=true;
    const navLinks=<>
     <li className="hover:text-red-500"><a>Home</a></li>
   
      
        <li className="hover:text-red-500"><a>Report</a></li>
        <li className="hover:text-red-500"><a>Safety Tips</a></li>
        <li className="hover:text-red-500"><a>Alert</a></li>

     
    <li className="hover:text-red-500"><a>Contact Us</a></li></>
  return (
    <div className="navbar fixed  container  bg-black/30 text-white ">
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
          className="menu menu-sm dropdown-content  rounded-box z-[1] mt-3 w-52 p-2 shadow">
         {navLinks}
        </ul>
      </div>
      <a className=" text-2xl ">CrimeAlert</a>
    </div>
    <div className="navbar-center hidden lg:flex">
      <ul className="menu menu-horizontal px-1 font-bold ">
       {navLinks}
      </ul>
    </div>
    <div className="navbar-end">
    {login? <a className="btn">Sign Up</a>:
      <a className="btn">Login</a>}
    </div>
  </div>
  )
}

export default Navbar