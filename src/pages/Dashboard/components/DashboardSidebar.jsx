import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiPlusCircle,
  FiPhoneCall,
  FiMapPin,
  FiRadio,
  FiClock,
  FiShield,
  FiUser,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";
import logo from "../../../assets/home/icons/logo.png";

const navItem =
  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors";
const activeCls = "bg-red-500/10 text-red-500";
const idleCls = "text-gray-400 hover:text-white hover:bg-white/5";

const NavItem = ({ to, icon: Icon, children, end }) => (
  <NavLink
    to={to}
    end={end}
    className={({ isActive }) => `${navItem} ${isActive ? activeCls : idleCls}`}
  >
    <Icon className="text-lg shrink-0" />
    <span>{children}</span>
  </NavLink>
);

const SectionLabel = ({ children }) => (
  <p className="px-3 pt-5 pb-2 text-[11px] tracking-wider text-gray-500">
    {children}
  </p>
);

const DashboardSidebar = () => {
  return (
    <aside className="hidden lg:flex flex-col w-64 shrink-0 bg-[#0b0b12] border-r border-white/5 h-screen sticky top-0 px-4 py-5">
      {/* Logo */}
      <div className="flex items-center gap-2 px-2 mb-6">
        <img src={logo} alt="Crime Alert" className="w-8 h-8 rounded" />
        <span className="text-white font-bold text-lg">Crime Alert</span>
      </div>

      <nav className="flex-1 overflow-y-auto">
        <NavItem to="/dashboard" icon={FiHome} end>
          Dashboard
        </NavItem>

        <SectionLabel>REPORT & HELP</SectionLabel>
        <NavItem to="/report" icon={FiPlusCircle}>
          Report a Crime
        </NavItem>
        <NavItem to="/emergency" icon={FiPhoneCall}>
          Emergency Call
        </NavItem>
        <NavItem to="/live-location" icon={FiMapPin}>
          Live Location
        </NavItem>

        <SectionLabel>EXPLORE</SectionLabel>
        <NavItem to="/map" icon={FiRadio}>
          Crime in My Area
        </NavItem>
        <NavItem to="/area-history" icon={FiClock}>
          Area History
        </NavItem>
        <NavItem to="/safety-tips" icon={FiShield}>
          Safety Tips
        </NavItem>

        <SectionLabel>ACCOUNT</SectionLabel>
        <NavItem to="/profile" icon={FiUser}>
          Profile
        </NavItem>
        <NavItem to="/settings" icon={FiSettings}>
          Settings
        </NavItem>
        <NavItem to="/logout" icon={FiLogOut}>
          Logout
        </NavItem>
      </nav>

      {/* Emergency box */}
      <div className="mt-4 rounded-xl bg-red-500/10 border border-red-500/20 p-4">
        <p className="text-red-400 font-semibold text-sm mb-1">Emergency?</p>
        <p className="text-gray-400 text-xs mb-3">
          Tap to call local emergency number
        </p>
        <a
          href="tel:999"
          className="flex items-center justify-between rounded-lg bg-red-500 hover:bg-red-600 transition-colors px-4 py-2"
        >
          <span className="text-white font-bold text-lg">999</span>
          <FiPhoneCall className="text-white text-lg" />
        </a>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
