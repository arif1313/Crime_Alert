import { useEffect, useState } from "react";
import Reports from "../Reports/Reports";
import { getAllReports } from "../../Api/ReportApi";

const Feed = () => {
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
    <div className="w-full lg:w-2/4 p-2">
      
      <Reports
        reports={reports}
        setReports={setReports}
        loading={loading}
        setLoading={setLoading}
        manageable={false}
        mainrout={'feed'}

      />
    </div>
  );
};

export default Feed;
