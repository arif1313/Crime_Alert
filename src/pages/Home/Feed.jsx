import { useLocation } from "react-router-dom";
import Reports from "../Reports/Reports";
import { useEffect, useState } from "react";
import { getAllReports } from "../../Api/ReportApi";

const Feed = () => {
  const location = useLocation(); // ✅ React Router hook
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div
      className={`w-full p-2 ${
        location.pathname === "/profile/reports" ? "lg:w-full" : "lg:w-2/4"
      }`}
    >
      <Reports
        reports={reports}
        setReports={setReports}
        loading={loading}
        setLoading={setLoading}
        manageable={false}
        mainrout={location.pathname}
      />
    </div>
  );
};
export default Feed;
