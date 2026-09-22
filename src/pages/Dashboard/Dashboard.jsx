import { FiMapPin } from "react-icons/fi";
import { useEffect, useState } from "react";
import { useAuth } from "../Auth/AuthContext";
import { getAllReports } from "../../Api/ReportApi";
import DashboardSidebar from "./components/DashboardSidebar";
import DashboardTopbar from "./components/DashboardTopbar";
import CrimeMapPanel from "./components/CrimeMapPanel";
import RecentCrimesList from "./components/RecentCrimesList";
import ReportCrimeCard from "./components/ReportCrimeCard";
import QuickActions from "./components/QuickActions";
import CrimeSummaryChart from "./components/CrimeSummaryChart";
import SafetyTipsCard from "./components/SafetyTipsCard";
import NearbyPoliceCard from "./components/NearbyPoliceCard";

const Dashboard = () => {
  const { user } = useAuth();
  const firstName = user?.name?.split(" ")[0] || "there";
  const [reports, setReports] = useState([]);
  const [visibleReports, setVisibleReports] = useState([]);
  const [reportsLoading, setReportsLoading] = useState(true);
  const [reportsError, setReportsError] = useState(false);

  useEffect(() => {
    const loadReports = async () => {
      try {
        const response = await getAllReports();
        if (response.success) {
          setReports(response.data || []);
          setVisibleReports(response.data || []);
        } else {
          setReportsError(true);
        }
      } catch (error) {
        console.error("Error fetching dashboard reports:", error);
        setReportsError(true);
      } finally {
        setReportsLoading(false);
      }
    };

    loadReports();
  }, []);

  return (
    <div className="flex min-h-screen bg-[#08080d]">
      <DashboardSidebar />

      <div className="flex-1 min-w-0">
        <DashboardTopbar reports={reports} onSearchResults={setVisibleReports} />

        <div className="p-5 sm:p-8 grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-6">
          {/* Main column */}
          <div className="min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
              <div>
                <h1 className="text-2xl font-bold text-white">
                  Hello, {firstName} 👋
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                  Stay informed. Stay safe. Report and track crime in your area.
                </p>
              </div>

              <div className="flex items-center gap-2 rounded-xl border border-white/5 bg-[#12121c] px-4 py-2.5 shrink-0">
                <FiMapPin className="text-red-500" />
                <div className="leading-tight">
                  <p className="text-sm text-white font-medium">
                    Dhanmondi, Dhaka
                  </p>
                  <p className="text-xs text-green-500">Current Location</p>
                </div>
              </div>
            </div>

            <CrimeMapPanel />

            <div className="mt-6">
              <RecentCrimesList
                reports={visibleReports}
                loading={reportsLoading}
                hasError={reportsError}
              />
            </div>
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-6">
            <ReportCrimeCard />
            <QuickActions />
            <CrimeSummaryChart />
            <SafetyTipsCard />
            <NearbyPoliceCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
