import  { useEffect, useState } from "react";
import SingleReport from "./SingleReport";
import { getAllReports, combinedSearch } from "../../Api/ReportApi";

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const [reportType, setReportType] = useState("");
  const [reportTitle, setReportTitle] = useState("");
  const [reportLocation, setReportLocation] = useState("");

  useEffect(() => {
    const loadReports = async () => {
      try {
        const res = await getAllReports();
        if (res.success) setReports(res.data);
      } catch (err) {
        console.error("Error fetching reports:", err);
      } finally {
        setLoading(false);
      }
    };
    loadReports();
  }, []);

  // Combined search function
  const handleSearch = async () => {
    setLoading(true);
    try {
      const res = await combinedSearch({
        reportType: reportType || undefined,
        reportTitle: reportTitle || undefined,
        reportLocation: reportLocation || undefined,
      });
      if (res.success) setReports(res.data);
    } catch (err) {
      console.error("Error searching reports:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-10 container justify-between w-full mx-auto">
      <div className="flex flex-col gap-5">
        {/* Fixed Header */}
        <div className="text-xl sticky top-12 bg-white z-10 p-3">
          <h1 className="p-3">Search Area-Based Report</h1>
          <div className="flex justify-around gap-2">
            <input
              type="text"
              placeholder="Search by title"
              value={reportTitle}
              onChange={(e) => setReportTitle(e.target.value)}
              className="input input-neutral"
            />
            <input
              type="text"
              placeholder="Search by area"
              value={reportLocation}
              onChange={(e) => setReportLocation(e.target.value)}
              className="input input-neutral"
            />
            <select
              name="reportType"
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="select select-neutral w-full"
            >
              <option value="">All Types</option>
              <option value="murder">Murder</option>
              <option value="robbery">Robbery</option>
              <option value="fraud">Fraud</option>
              <option value="assault">Assault</option>
              <option value="theft">Theft</option>
              <option value="arson">Arson</option>
              <option value="other">Other</option>
            </select>
            <button
              className="btn bg-[#be171f] border-[#821a1f] text-white"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>

        {/* Scrollable Reports */}
        <div className="overflow-auto p-2 flex flex-col gap-5">
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
