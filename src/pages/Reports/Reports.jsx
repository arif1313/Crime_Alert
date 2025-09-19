import PropTypes from "prop-types";
import { useState } from "react";
import SingleReport from "./SingleReport";
import { combinedSearch } from "../../Api/ReportApi";

const categoryOptions = ["murder", "robbery", "fraud", "assault", "theft", "arson", "other"];

const Reports = ({ reports, setReports, loading, manageable, mainrout }) => {
  const [searchArea, setSearchArea] = useState("");
  const [searchTitle, setSearchTitle] = useState("");
  const [searchCategory, setSearchCategory] = useState("other");
  const [loadingSearch, setLoadingSearch] = useState(false);

  const handleDeleted = (id) => {
    if (setReports) {
      setReports((prev) => prev.filter((r) => r._id !== id));
    }
  };

  const handleSearch = async () => {
    setLoadingSearch(true);
    try {
      const params = {
        reportType: searchCategory !== "other" ? searchCategory : undefined,
        reportTitle: searchTitle || undefined,
        reportLocation: searchArea || undefined,
      };
      const res = await combinedSearch(params);
      if (setReports) setReports(res.data);
    } catch (err) {
      console.error("Search failed:", err);
    }
    setLoadingSearch(false);
  };

  return (
    <div className="flex gap-10 container justify-between mx-auto">
      {/* Right Section */}
      <div className="flex flex-col gap-5 w-full">
        {/* Fixed Header */}
        
    <div
  className={`text-xl sticky top-14 bg-white z-10 p-3 ${
    (location.pathname === "/profile/myReport" || location.pathname === "/profile/deleted"||location.pathname==='/profile/action')
      ? "hidden"
      : ""
  }`}
>
  <h1>Search Area-Based Report</h1>
  <div className="flex justify-between flex-wrap gap-2">
    <div>
      <input
        type="text"
        placeholder="Search area"
        className="input input-neutral"
        value={searchArea}
        onChange={(e) => setSearchArea(e.target.value)}
      />
    </div>
    <div>
      <input
        type="text"
        placeholder="Search title"
        className="input input-neutral"
        value={searchTitle}
        onChange={(e) => setSearchTitle(e.target.value)}
      />
    </div>
    <div>
      <select
        className="input input-neutral"
        value={searchCategory}
        onChange={(e) => setSearchCategory(e.target.value)}
      >
        {categoryOptions.map((cat) => (
          <option key={cat} value={cat}>
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </option>
        ))}
      </select>
    </div>
    <div>
      <button
        className="btn bg-[#be171f] border-[#821a1f] text-white hover:from-[#9d171e] hover:to-[#be171f]"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  </div>
</div>

        
        {/* Scrollable Reports */}
        {loading || loadingSearch ? (
          <p>Loading...</p>
        ) : (
          <div className="overflow-auto p-2 flex flex-col gap-5">
            {reports.length === 0 ? (
              <p>No reports found</p>
            ) : (
              reports.map((report) => (
                <SingleReport
                  key={report._id}
                  report={report}
                  manageable={manageable}
                  onDeleted={handleDeleted}
                  mainrout={mainrout}
                />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// ✅ Props validation
Reports.propTypes = {
  reports: PropTypes.array.isRequired,
  setReports: PropTypes.func,
  loading: PropTypes.bool.isRequired,
  manageable: PropTypes.bool,
  mainrout: PropTypes.string,
};

export default Reports;
