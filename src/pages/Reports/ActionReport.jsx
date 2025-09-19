import { useEffect, useState } from "react";

import Reports from "../Reports/Reports";
import { useLocation } from "react-router-dom";
import {  getReportsWithActionTaken} from "../../Api/ReportApi";

const ActionReport = () => {
  
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const loadData = async () => {
      try {
    const allReports = await getReportsWithActionTaken();


setReports(allReports?.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [ location.pathname]);

  return (
    <div className="">
<h1 className="text-3xl font-bold text-gray-800 mb-4 border-b-2 border-red-700 pb-2">
  Your Action
</h1>

      <Reports
        reports={reports}
        setReports={setReports}
        loading={loading}
        manageable={true}
        mainrout={location.pathname}
      />
    </div>
  );
};

export default ActionReport;
