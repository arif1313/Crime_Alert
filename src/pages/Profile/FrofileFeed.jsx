import { useEffect, useState } from "react";
import { useAuth } from "../Auth/AuthContext";
import Reports from "../Reports/Reports";
import { useLocation } from "react-router-dom";
import { searchByReporterId, searchDeletedByReporterId } from "../../Api/ReportApi";

const FrofileFeed = () => {
  const { user } = useAuth();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const loadData = async () => {
      try {
        if (!user?._id) {
          setLoading(false);
          return;
        }

        let res;
        if (location.pathname === "/profile/deleted") {
          res = await searchDeletedByReporterId(user._id);
        } else {
          res = await searchByReporterId(user._id);
        }

        if (res.success) setReports(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [user, location.pathname]);

  return (
    <div className="">
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

export default FrofileFeed;
