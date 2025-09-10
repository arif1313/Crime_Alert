import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getReportById } from "../../Api/ReportApi";

const ReportDetails = () => {
  const { id } = useParams();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadReport = async () => {
      try {
        const res = await getReportById(id);
        if (res.success) setReport(res.data);
      } catch (err) {
        console.error("Error fetching report:", err);
      } finally {
        setLoading(false);
      }
    };
    loadReport();
  }, [id]);

  if (loading) return <p className="p-5">Loading...</p>;
  if (!report) return <p className="p-5">Report not found</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-xl mt-6">
      <h1 className="text-3xl font-bold text-red-700 mb-4">{report.reportTitle}</h1>
      <img
        src={report.reportImage || "https://via.placeholder.com/600"}
        alt={report.reportTitle}
        className="w-full h-96 object-cover rounded-md mb-6"
      />
      <p className="text-lg mb-4">{report.reportDescription}</p>
      <p className="text-sm text-gray-600">Location: {report.reportLocation}</p>
      <p className="text-sm text-gray-600">Type: {report.reportType}</p>
      <p className="text-sm text-gray-600">Date: {new Date(report.reportDate).toLocaleDateString()}</p>
    </div>
  );
};

export default ReportDetails;
