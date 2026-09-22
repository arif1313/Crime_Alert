import { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { FiSearch, FiBell, FiChevronDown, FiSliders, FiX } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Auth/AuthContext";
import { combinedSearch } from "../../../Api/ReportApi";

const DashboardTopbar = ({ reports, onSearchResults }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [query, setQuery] = useState("");
  const [area, setArea] = useState("all");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");
  const [searchOpen, setSearchOpen] = useState(false);
  const [searching, setSearching] = useState(false);
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

  const areas = useMemo(() => ["all", ...new Set(reports.map((report) => report.reportLocation).filter(Boolean))], [reports]);
  const hasFilters = query || area !== "all" || category !== "all" || status !== "all";

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (!hasFilters) {
        onSearchResults(reports);
        return;
      }

      setSearching(true);
      const response = await combinedSearch({
        reportTitle: query || undefined,
        reportLocation: area !== "all" ? area : undefined,
        reportType: category !== "all" ? category : undefined,
        status: status !== "all" ? status : undefined,
      });
      onSearchResults(response.success ? response.data || [] : []);
      setSearching(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [query, area, category, status, reports, hasFilters, onSearchResults]);

  const clearSearch = () => {
    setQuery("");
    setArea("all");
    setCategory("all");
    setStatus("all");
    setSearchOpen(false);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setSearchOpen(false);
      if (event.key === "/" && document.activeElement?.tagName !== "INPUT") {
        event.preventDefault();
        document.querySelector("[data-dashboard-search]")?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="flex items-center gap-4 px-5 sm:px-8 py-4 border-b border-white/5 bg-[#0b0b12] sticky top-0 z-30">
      <div className="relative max-w-xl flex-1">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
        <input
          value={query}
          data-dashboard-search
          onFocus={() => setSearchOpen(true)}
          onChange={(event) => setQuery(event.target.value)}
          type="text"
          placeholder="Search reports..."
          className="w-full rounded-xl border border-white/5 bg-[#14141f] py-2.5 pl-9 pr-20 text-sm text-gray-200 placeholder:text-gray-500 focus:border-red-500/50 focus:outline-none"
        />
        <div className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-1">
          {hasFilters && <button type="button" onClick={clearSearch} className="rounded-md p-1.5 text-gray-500 hover:bg-white/10 hover:text-white" aria-label="Clear search"><FiX /></button>}
          <button type="button" onClick={() => setSearchOpen((open) => !open)} className={`rounded-md p-1.5 ${searchOpen ? "bg-red-500/15 text-red-400" : "text-gray-500 hover:bg-white/10 hover:text-white"}`} aria-label="Toggle search filters"><FiSliders /></button>
        </div>
        {searchOpen && <div className="absolute left-0 right-0 top-14 z-50 rounded-xl border border-white/10 bg-[#12121c] p-3 shadow-2xl shadow-black/40">
          <div className="grid gap-2 sm:grid-cols-3">
            <select value={area} onChange={(event) => setArea(event.target.value)} className="rounded-lg border border-white/10 bg-[#0b0b12] px-3 py-2 text-xs text-gray-300 outline-none focus:border-red-500/50"><option value="all">All areas</option>{areas.filter((item) => item !== "all").map((item) => <option key={item} value={item}>{item}</option>)}</select>
            <select value={category} onChange={(event) => setCategory(event.target.value)} className="rounded-lg border border-white/10 bg-[#0b0b12] px-3 py-2 text-xs capitalize text-gray-300 outline-none focus:border-red-500/50"><option value="all">All categories</option>{["murder", "robbery", "fraud", "assault", "theft", "vandalism", "arson", "other"].map((item) => <option key={item} value={item}>{item}</option>)}</select>
            <select value={status} onChange={(event) => setStatus(event.target.value)} className="rounded-lg border border-white/10 bg-[#0b0b12] px-3 py-2 text-xs capitalize text-gray-300 outline-none focus:border-red-500/50"><option value="all">All statuses</option><option value="pending">Pending</option><option value="reviewing">Reviewing</option><option value="resolved">Resolved</option></select>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs text-gray-500"><span>{searching ? "Searching reports..." : "Search updates as you type"}</span><button type="button" onClick={() => navigate("/home")} className="font-semibold text-red-400 hover:text-red-300">Open full feed</button></div>
        </div>}
        {hasFilters && !searchOpen && <div className="mt-2 flex flex-wrap gap-1.5">
          {query && <span className="rounded-full border border-red-500/20 bg-red-500/10 px-2 py-1 text-[11px] text-red-300">“{query}”</span>}
          {area !== "all" && <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[11px] text-gray-300">Area: {area}</span>}
          {category !== "all" && <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[11px] capitalize text-gray-300">Type: {category}</span>}
          {status !== "all" && <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[11px] capitalize text-gray-300">Status: {status}</span>}
        </div>}
      </div>

      <div className="flex-1" />

      <button onClick={() => navigate(user ? "/alert" : "/login")} className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/5 text-gray-300" aria-label="Open notifications">
        <FiBell className="text-lg" />
        <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500" />
      </button>

      <button onClick={() => navigate(user ? "/profile" : "/login")} className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-lg hover:bg-white/5">
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

DashboardTopbar.propTypes = {
  reports: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSearchResults: PropTypes.func.isRequired,
};

export default DashboardTopbar;
