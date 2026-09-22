import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiCalendar, FiEdit2, FiMapPin, FiPlus, FiSearch, FiTrash2, FiX } from "react-icons/fi";
import PropTypes from "prop-types";
import { useAuth } from "../Auth/AuthContext";
import { getAllReports, softDeleteReport } from "../../Api/ReportApi";

const categories = ["all", "murder", "robbery", "fraud", "assault", "theft", "vandalism", "arson", "other"];
const statusStyles = {
  pending: "bg-amber-50 text-amber-700 border-amber-200",
  reviewing: "bg-blue-50 text-blue-700 border-blue-200",
  resolved: "bg-emerald-50 text-emerald-700 border-emerald-200",
};

const ReportExplorer = ({ mineOnly = false }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [query, setQuery] = useState("");
  const [area, setArea] = useState("all");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllReports()
      .then((response) => setReports(response.data || []))
      .finally(() => setLoading(false));
  }, []);

  const areas = useMemo(() => ["all", ...new Set(reports.map((report) => report.reportLocation).filter(Boolean))], [reports]);
  const filteredReports = useMemo(() => reports.filter((report) => {
    const haystack = [report.reportTitle, report.reportDescription, report.reportLocation, report.reportType].join(" ").toLowerCase();
    const ownerId = report.reporterId?._id || report.reporterId;
    return (!mineOnly || ownerId === user?._id) &&
      (!query || haystack.includes(query.toLowerCase())) &&
      (area === "all" || report.reportLocation === area) &&
      (category === "all" || report.reportType?.toLowerCase() === category) &&
      (status === "all" || report.status?.toLowerCase() === status);
  }), [reports, query, area, category, status, mineOnly, user]);

  const handleDelete = async (id) => {
    await softDeleteReport(id);
    setReports((current) => current.filter((report) => report._id !== id));
  };

  const hasFilters = query || area !== "all" || category !== "all" || status !== "all";
  const clearFilters = () => {
    setQuery("");
    setArea("all");
    setCategory("all");
    setStatus("all");
  };

  return (
    <main className="min-h-screen bg-[#f6f7f9] px-4 py-8 text-slate-900 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-red-600">Community intelligence</p>
            <h1 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">{mineOnly ? "My reports" : "Crime feed"}</h1>
            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">Search verified community reports, understand what is happening nearby, and help keep your area informed.</p>
          </div>
          <Link to="/report" className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-slate-950/10 transition hover:bg-red-600"><FiPlus /> Report an incident</Link>
        </div>

        <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <div className="relative mb-4">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search title, description, location or category" className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-12 text-sm outline-none transition focus:border-red-400 focus:bg-white focus:ring-4 focus:ring-red-500/10" />
            {hasFilters && <button type="button" onClick={clearFilters} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-400 hover:bg-slate-200 hover:text-slate-900" aria-label="Clear all filters"><FiX /></button>}
          </div>
          {hasFilters && <div className="mb-1 flex flex-wrap items-center gap-2 text-xs"><span className="font-semibold text-slate-500">Active filters:</span>{query && <span className="rounded-full bg-red-50 px-2.5 py-1 text-red-600">“{query}”</span>}{area !== "all" && <span className="rounded-full bg-slate-100 px-2.5 py-1 text-slate-600">Area: {area}</span>}{category !== "all" && <span className="rounded-full bg-slate-100 px-2.5 py-1 capitalize text-slate-600">Type: {category}</span>}{status !== "all" && <span className="rounded-full bg-slate-100 px-2.5 py-1 capitalize text-slate-600">Status: {status}</span>}</div>}
          <div className="grid gap-3 sm:grid-cols-3">
            <select value={area} onChange={(event) => setArea(event.target.value)} className="rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-600 outline-none focus:border-red-400">
              {areas.map((item) => <option key={item} value={item}>{item === "all" ? "All areas" : item}</option>)}
            </select>
            <select value={category} onChange={(event) => setCategory(event.target.value)} className="rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm capitalize text-slate-600 outline-none focus:border-red-400">
              {categories.map((item) => <option key={item} value={item}>{item === "all" ? "All categories" : item}</option>)}
            </select>
            <select value={status} onChange={(event) => setStatus(event.target.value)} className="rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm capitalize text-slate-600 outline-none focus:border-red-400">
              <option value="all">All statuses</option><option value="pending">Pending</option><option value="reviewing">Reviewing</option><option value="resolved">Resolved</option>
            </select>
          </div>
        </section>

        <div className="mb-4 flex items-center justify-between text-sm text-slate-500"><span><strong className="text-slate-900">{filteredReports.length}</strong> reports found</span><span className="hidden sm:inline">Updated moments ago</span></div>
        {loading ? <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center text-sm text-slate-500">Loading community reports...</div> : filteredReports.length === 0 ? <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center"><h2 className="font-bold text-slate-900">No matching reports</h2><p className="mt-1 text-sm text-slate-500">Try a different keyword or clear one of the filters.</p></div> : <div className="grid gap-5 lg:grid-cols-2">{filteredReports.map((report) => <article key={report._id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-slate-900/5"><div className="flex h-44 overflow-hidden bg-slate-100"><img src={report.reportImage || "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80"} alt={report.reportTitle || "Crime report"} className="h-full w-full object-cover" /></div><div className="p-5"><div className="flex items-start justify-between gap-3"><span className="rounded-full border border-red-100 bg-red-50 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-red-600">{report.reportType || "other"}</span><span className={`rounded-full border px-2.5 py-1 text-[11px] font-bold capitalize ${statusStyles[report.status] || statusStyles.pending}`}>{report.status || "pending"}</span></div><h2 className="mt-3 line-clamp-1 text-lg font-bold text-slate-950">{report.reportTitle || "Untitled report"}</h2><p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">{report.reportDescription || "No description provided."}</p><div className="mt-4 flex flex-wrap gap-3 text-xs text-slate-500"><span className="inline-flex items-center gap-1"><FiMapPin />{report.reportLocation || "Location unavailable"}</span><span className="inline-flex items-center gap-1"><FiCalendar />{report.crimeDate ? new Date(report.crimeDate).toLocaleDateString() : "Date unavailable"}</span></div>{mineOnly && <div className="mt-5 flex gap-2 border-t border-slate-100 pt-4"><button onClick={() => navigate(`/update/${report._id}`)} className="inline-flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-200"><FiEdit2 /> Edit</button><button onClick={() => handleDelete(report._id)} className="inline-flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-100"><FiTrash2 /> Delete</button></div>}</div></article>)}</div>}
      </div>
    </main>
  );
};

ReportExplorer.propTypes = {
  mineOnly: PropTypes.bool,
};

export default ReportExplorer;
