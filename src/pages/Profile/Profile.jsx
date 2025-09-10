// Profile.js
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { searchByReporterId, searchDeletedByReporterId } from "../../Api/ReportApi";
import { useAuth } from "../Auth/AuthContext";
import ProfileSidebar from "./ProfileSidebar";
import Reports from "../Reports/Reports";
import { useLocation } from "react-router-dom";


const Profile = () => {
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
          // Deleted reports
          res = await searchDeletedByReporterId(user._id);
        } else {
          // Normal active reports
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

  if (!user) return <p className="p-5">Loading profile...</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-4">
        <div className="w-full lg:w-1/4">
          <ProfileSidebar userId={user._id} />
        </div>

        <div className="w-full lg:w-2/4">
          <Reports
            reports={reports}
            setReports={setReports}
            loading={loading}
            manageable={true}
            mainrout="profile"
          />
        </div>
<div className="bg-gradient-to-b from-pink-200 shadow-md rounded-xl p-4 lg:min-h-screen">
  <h3 className="font-bold text-xl mb-2">Reports Analysis</h3>
  <ul className="menu rounded-box w-full font-bold text-red-800">
    <li>
      <NavLink to="/profile" className="border-b-2">
        Your Reports
      </NavLink>
    </li>
    <li>
      <NavLink to="/profile/analysis" className="border-b-2">
        Analysis
      </NavLink>
    </li>
    <li>
      <NavLink to="/profile/deleted" className="border-b-2">
        Deleted reports
      </NavLink>
    </li>
  </ul>
</div>

      </div>
    </div>
  );
};

export default Profile;
