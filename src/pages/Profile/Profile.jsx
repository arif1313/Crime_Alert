import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { searchByReporterId } from "../../Api/ReportApi";
import SingleReport from "../Reports/SingleReport";
import { useAuth } from "../Auth/AuthContext";
import ProfileSidebar from "./ProfileSidebar";

const Profile = () => {
  const { user } = useAuth();
  const location = useLocation();

  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const isManageMode = location.pathname.includes("/profile/manage");

  useEffect(() => {
    const loadData = async () => {
      try {
        if (!user?._id) {
          console.warn("User not logged in or missing _id");
          setLoading(false);
          return;
        }

        // reports
        const res = await searchByReporterId(user._id);
        if (res.success) setReports(res.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [user]);

  if (!user) {
    return <p className="p-5">Loading profile...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row">
        {/* LEFT SIDEBAR */}
        <ProfileSidebar userId={user?._id}></ProfileSidebar>

        {/* SPACER */}
        <div className="w-full lg:w-1/4 p-2 space-y-4"></div>

        {/* CENTER REPORTS */}
        <div className="w-full lg:w-2/4 p-2 ml-0 lg:ml-3 ">
          <div className="flex flex-col gap-5">
            <div className="text-xl sticky top-12 bg-white z-10 p-3">
              <h1 className="p-3">
                {isManageMode ? "Manage Reports" : "My Reports"}
              </h1>
            </div>

            <div className="overflow-auto p-2 flex flex-col gap-5">
              {loading ? (
                <p>Loading reports...</p>
              ) : reports.length === 0 ? (
                <p>No reports found</p>
              ) : (
                reports.map((report) => (
                  <SingleReport
                    key={report._id}
                    report={report}
                    manageMode={isManageMode} // এখানে manageMode পাঠালাম
                  />
                ))
              )}
            </div>
          </div>
        </div>

        {/* RIGHT MENU */}
        <div className="w-full lg:w-1/4 p-2 lg:fixed right-0">
          <div className="bg-gradient-to-b from-pink-200 shadow-md rounded-xl p-4 lg:min-h-screen">
            <h3 className="font-bold text-xl mb-2">Reports Analysis</h3>
            <ul className="menu rounded-box w-56 font-bold text-red-800 ">
              <li>
                <NavLink to="/profile" className="border-b-2 ">
                  Your Reports
                </NavLink>
              </li>
              <li>
                <NavLink to="/profile/analysis" className="border-b-2 ">
                  Analysis
                </NavLink>
              </li>
              <li>
                <NavLink className="border-b-2 ">Earning</NavLink>
              </li>
              <li>
                <NavLink to="/profile/manage" className="border-b-2 ">
                  Manage Report
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
