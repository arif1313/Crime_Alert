import { useEffect, useState } from "react";
import SingleReport from "./SingleReport";
import { getAllReports } from "../api/reportApi"; // ✅ import your API service

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
    <div className="flex gap-10 pt-20 container justify-between w-full mx-auto">
      {/* Left Section */}
      <div className="w-1/3 p-5 flex flex-col gap-5">
        <h1 className="text-3xl font-bold text-red-500">Area Crime Report</h1>
        {/* <ReportBarChart></ReportBarChart> */}
      </div>

      {/* Right Section */}
      <div className="w-2/3 p-5 flex flex-col gap-5 ">
        {/* Fixed Header */}
        <div className="text-xl sticky top-0 bg-white z-10 p-3 ">
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
        <div className="overflow-auto max-h-[60vh] p-2 flex flex-col gap-5">
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
