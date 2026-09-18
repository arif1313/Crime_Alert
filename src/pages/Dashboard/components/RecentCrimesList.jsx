import { useState } from "react";
import { FiChevronRight, FiCalendar, FiMapPin } from "react-icons/fi";

const RecentCrimeCard = ({ crime }) => (
  <button className="w-full text-left flex gap-4 bg-[#12121c] hover:bg-[#161622] transition-colors rounded-2xl border border-white/5 p-3 sm:p-4">
    <div className="w-28 h-28 sm:w-32 sm:h-32 shrink-0 rounded-xl overflow-hidden">
      <img
        src={crime.reportImage || "https://via.placeholder.com/300"}
        alt={crime.reportTitle || "Crime report"}
        className="w-full h-full object-cover"
      />
    </div>

    <div className="flex-1 min-w-0">
      <div className="flex items-start justify-between gap-2">
        <span className="text-[11px] font-medium px-2 py-0.5 rounded-md border border-red-500/30 bg-red-500/15 text-red-400">
          {crime.reportType || "Crime"}
        </span>
      </div>

      <h3 className="text-white font-semibold mt-2 truncate">
        {crime.reportTitle || "Untitled report"}
      </h3>

      <p className="flex items-center gap-1 text-xs text-gray-500 mt-1">
        <FiMapPin className="shrink-0" /> {crime.reportLocation || "Location unavailable"}
      </p>

      <p className="text-sm text-gray-400 mt-2 line-clamp-2">
        {crime.reportDescription || "No description available."}
      </p>

      <div className="flex items-center gap-1 text-xs text-gray-500 mt-3">
        <span className="flex items-center gap-1">
          <FiCalendar />
          {crime.createdAt
            ? new Date(crime.createdAt).toLocaleDateString()
            : "Date unavailable"}
        </span>
      </div>
    </div>

    <FiChevronRight className="self-center text-gray-600 shrink-0 hidden sm:block" />
  </button>
);

const PAGE_SIZE = 3;

const RecentCrimesList = ({ reports, loading, hasError }) => {
  const [visible, setVisible] = useState(PAGE_SIZE);
  const items = reports.slice(0, visible);
  const hasMore = visible < reports.length;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white font-semibold text-lg">
          Recent Crimes in Your Area
        </h2>
        <button className="text-sm text-gray-400 hover:text-white flex items-center gap-1">
          View All <FiChevronRight className="text-xs" />
        </button>
      </div>

      {loading ? (
        <p className="text-sm text-gray-500">Loading crime reports...</p>
      ) : hasError ? (
        <p className="text-sm text-red-400">Unable to load crime reports.</p>
      ) : items.length === 0 ? (
        <p className="text-sm text-gray-500">No crime reports found.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {items.map((crime) => (
            <RecentCrimeCard key={crime._id} crime={crime} />
          ))}
        </div>
      )}

      {hasMore && (
        <div className="flex justify-center mt-5">
          <button
            onClick={() => setVisible((v) => v + PAGE_SIZE)}
            className="px-5 py-2 text-sm font-medium text-gray-300 border border-white/10 rounded-lg hover:bg-white/5"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default RecentCrimesList;
