import { useEffect, useState } from "react";
import SingleReport from "./SingleReport";
import { getAllReports } from "../../Api/ReportApi";


const Reports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadReports = async () => {
      try {
        const res = await getAllReports();
        if (res.success) {
          setReports(res.data);
        }
      } catch (err) {
        console.error("Error fetching reports:", err);
      } finally {
        setLoading(false);
      }
    };
    loadReports();
  }, []);

  return (
    <div className="flex gap-10 container justify-between w-full mx-auto">
      {/* Left Section */}
     
       
      {/* Right Section */}
      <div className="  flex flex-col gap-5">
        {/* Fixed Header */}
        <div className="text-xl sticky top-12 bg-white z-10 p-3">
          <h1>Search Area-Based Report</h1>
          <div className="flex justify-around">
            <input
              type="text"
              placeholder="Search area reports"
              className="input input-neutral"
            />
            <input
              type="text"
              placeholder="Category"
              className="input input-neutral"
            />
            <button className="btn bg-[#be171f] border-[#821a1f] text-white hover:from-[#9d171e] hover:to-[#be171f]">
              Search
            </button>
          </div>
        </div>

        {/* Scrollable Reports */}
        <div className="overflow-auto  p-2 flex flex-col gap-5">
          {loading ? (
            <p>Loading reports...</p>
          ) : reports.length === 0 ? (
            <p>No reports found</p>
          ) : (
            reports.map((report) => (
              <SingleReport key={report._id} report={report} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Reports;
