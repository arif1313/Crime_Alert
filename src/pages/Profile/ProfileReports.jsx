import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { FiCalendar, FiEdit2, FiEye, FiMapPin, FiPlus, FiRefreshCw, FiTrash2 } from "react-icons/fi";
import { useAuth } from "../Auth/AuthContext";
import { getAllReports, restoreReport, searchDeletedByReporterId, softDeleteReport } from "../../Api/ReportApi";

const statusStyles = {
  pending: "border-amber-500/30 bg-amber-500/10 text-amber-400",
  reviewing: "border-blue-500/30 bg-blue-500/10 text-blue-400",
  resolved: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
};

const ProfileReports = ({ deleted = false }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadReports = async () => {
      if (!user?._id) return;
      try {
        const response = deleted
          ? await searchDeletedByReporterId(user._id)
          : await getAllReports();
        const items = response.data || [];
        setReports(deleted ? items : items.filter((report) => {
          const ownerId = report.reporterId?._id || report.reporterId;
          return ownerId === user._id || (!report.reporterId && user._id === "preview-user");
        }));
      } finally {
        setLoading(false);
      }
    };
    loadReports();
  }, [deleted, user]);

  const updateList = (id) => setReports((current) => current.filter((report) => report._id !== id));
  const handleRemove = async (id) => {
    if (deleted) await restoreReport(id);
    else await softDeleteReport(id);
    updateList(id);
  };

  return (
    <div className="min-h-full bg-[#0b0b12] p-5 text-white sm:p-8">
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div><p className="mb-2 text-[11px] font-bold uppercase tracking-[0.2em] text-red-500">Personal workspace</p><h1 className="text-3xl font-black tracking-tight">{deleted ? "Deleted reports" : "My reports"}</h1><p className="mt-2 text-sm text-gray-500">{deleted ? "Restore reports when you are ready to bring them back." : "Track, update, and manage the reports you have submitted."}</p></div>
        {!deleted && <Link to="/report" className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-500 px-4 py-3 text-sm font-bold text-white hover:bg-red-600"><FiPlus /> New report</Link>}
      </div>
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3"><div className="rounded-xl border border-white/5 bg-[#12121c] p-4"><p className="text-xs text-gray-500">Total shown</p><p className="mt-1 text-2xl font-black text-white">{reports.length}</p></div><div className="rounded-xl border border-white/5 bg-[#12121c] p-4"><p className="text-xs text-gray-500">Pending</p><p className="mt-1 text-2xl font-black text-amber-400">{reports.filter((report) => report.status === "pending").length}</p></div><div className="hidden rounded-xl border border-white/5 bg-[#12121c] p-4 sm:block"><p className="text-xs text-gray-500">Resolved</p><p className="mt-1 text-2xl font-black text-emerald-400">{reports.filter((report) => report.status === "resolved").length}</p></div></div>
      {loading ? <div className="rounded-2xl border border-white/5 bg-[#12121c] p-12 text-center text-sm text-gray-500">Loading your reports...</div> : reports.length === 0 ? <div className="rounded-2xl border border-dashed border-white/10 bg-[#12121c] p-12 text-center"><h2 className="font-bold text-white">{deleted ? "No deleted reports" : "No personal reports yet"}</h2><p className="mt-2 text-sm text-gray-500">{deleted ? "Your deleted reports will appear here." : "Your submitted reports will appear here."}</p></div> : <div className="space-y-4">{reports.map((report) => <article key={report._id} className="overflow-hidden rounded-2xl border border-white/5 bg-[#12121c] shadow-lg"><div className="flex flex-col gap-4 p-4 sm:flex-row sm:p-5"><img src={report.reportImage || "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=500&q=80"} alt={report.reportTitle || "Report"} className="h-32 w-full rounded-xl object-cover sm:w-40" /><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center justify-between gap-2"><span className="rounded-md border border-red-500/30 bg-red-500/10 px-2 py-1 text-[11px] font-semibold uppercase text-red-400">{report.reportType || "other"}</span><span className={`rounded-md border px-2 py-1 text-[11px] font-semibold capitalize ${statusStyles[report.status] || "border-white/10 bg-white/5 text-gray-400"}`}>{report.status || "pending"}</span></div><h2 className="mt-3 truncate text-lg font-bold text-white">{report.reportTitle || "Untitled report"}</h2><p className="mt-1 line-clamp-2 text-sm leading-6 text-gray-500">{report.reportDescription || "No description provided."}</p><div className="mt-3 flex flex-wrap gap-3 text-xs text-gray-500"><span className="inline-flex items-center gap-1"><FiMapPin />{report.reportLocation || "Location unavailable"}</span><span className="inline-flex items-center gap-1"><FiCalendar />{report.crimeDate ? new Date(report.crimeDate).toLocaleDateString() : "Date unavailable"}</span></div></div></div><div className="flex flex-wrap gap-2 border-t border-white/5 px-4 py-3 sm:px-5"><button onClick={() => navigate(`/profile/report/${report._id}`)} className="inline-flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2 text-xs font-bold text-gray-300 hover:bg-white/10"><FiEye /> View</button>{deleted ? <button onClick={() => handleRemove(report._id)} className="inline-flex items-center gap-2 rounded-lg bg-emerald-500/10 px-3 py-2 text-xs font-bold text-emerald-400 hover:bg-emerald-500/20"><FiRefreshCw /> Restore</button> : <><button onClick={() => navigate(`/update/${report._id}`)} className="inline-flex items-center gap-2 rounded-lg bg-blue-500/10 px-3 py-2 text-xs font-bold text-blue-400 hover:bg-blue-500/20"><FiEdit2 /> Edit</button><button onClick={() => handleRemove(report._id)} className="inline-flex items-center gap-2 rounded-lg bg-red-500/10 px-3 py-2 text-xs font-bold text-red-400 hover:bg-red-500/20"><FiTrash2 /> Delete</button></>}</div></article>)}</div>}
    </div>
  );
};

ProfileReports.propTypes = { deleted: PropTypes.bool };
export default ProfileReports;
