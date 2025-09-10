import PropTypes from "prop-types";
import SingleReport from "./SingleReport";

const Reports = ({ reports, setReports, loading, manageable, mainrout }) => {
  // ✅ Delete হলে reload ছাড়া UI থেকে সরাবে
  const handleDeleted = (id) => {
    if (setReports) {
      setReports((prev) => prev.filter((r) => r._id !== id));
    }
  };

  return (
    <div className="flex gap-10 container justify-between w-full mx-auto">
      {/* Right Section */}
      <div className="flex flex-col gap-5 w-full">
        {/* Fixed Header */}
        <div className="text-xl sticky top-14 bg-white z-10 p-3">
          {mainrout === "feed" ? (
            <div>
              <h1>Search Area-Based Report</h1>
              <div className="flex gap-6">
                <div>
                  <input
                    type="text"
                    placeholder="Search area reports"
                    className="input input-neutral"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Category"
                    className="input input-neutral"
                  />
                </div>
                <button className="btn bg-[#be171f] border-[#821a1f] text-white hover:from-[#9d171e] hover:to-[#be171f]">
                  Search
                </button>
              </div>
            </div>
          ) : (
            <div>
              <h1 className="text-red-600 font-bold">My Reports</h1>
            </div>
          )}
        </div>

        {/* Scrollable Reports */}
        {loading ? (
          <p>loading.....</p>
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
