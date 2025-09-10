import SingleReport from "./SingleReport";

const Report2 = ({ reports, loading }) => {
  return (
    <div className="flex gap-10 container justify-between w-full mx-auto">
      {/* Right Section */}
      <div className="flex flex-col gap-5 w-full">
        {/* Fixed Header */}
        <div className="text-xl sticky top-14 bg-white z-10 p-3">
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

        {/* Scrollable Reports */}
        {/* <div className="overflow-auto p-2 flex flex-col gap-5">
          {loading ? (
            <p>Loading reports...</p>
          ) : reports.length === 0 ? (
            <p>No reports found</p>
          ) : (
            reports.map((report) => (
              <SingleReport key={report._id} report={report} />
            ))
          )}
        </div> */}
      </div>
    </div>
  );
};

export default Report2;
