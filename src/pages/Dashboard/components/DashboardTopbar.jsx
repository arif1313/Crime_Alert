import { FiSearch, FiBell, FiChevronDown } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Auth/AuthContext";

const DashboardTopbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const name = user?.name || "Guest";
  const location = user?.location || "Dhaka, Bangladesh";
  const avatar =
    user?.avatar ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      name
    )}&background=ef4444&color=fff&bold=true`;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex items-center gap-4 px-5 sm:px-8 py-4 border-b border-white/5 bg-[#0b0b12] sticky top-0 z-30">
      <div className="flex-1 max-w-md relative">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          placeholder="Search area, street, or crime type..."
          className="w-full bg-[#14141f] text-sm text-gray-200 placeholder:text-gray-500 rounded-lg pl-9 pr-3 py-2.5 border border-white/5 focus:outline-none focus:border-red-500/50"
        />
      </div>

      <div className="flex-1" />

      <button className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/5 text-gray-300">
        <FiBell className="text-lg" />
        <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500" />
      </button>

      <button className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-lg hover:bg-white/5">
        <img
          src={avatar}
          alt={name}
          className="w-9 h-9 rounded-full object-cover"
        />
        <div className="hidden sm:block text-left leading-tight">
          <p className="text-sm font-semibold text-white">{name}</p>
          <p className="text-xs text-gray-500">{location}</p>
        </div>
        <FiChevronDown className="text-gray-500 ml-1" />
      </button>

      {user ? (
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-red-600"
        >
          Logout
        </button>
      ) : (
        <Link
          to="/login"
          className="bg-red-500 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-red-600"
        >
          Login
        </Link>
      )}
    </div>
  );
};

export default DashboardTopbar;
