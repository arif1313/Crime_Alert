import { useContext, useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { AuthContext } from "../../Auth/AuthContext";
import { liveSearchByAddress } from "../../../Api/ReportApi";

const redShades = [
  "#ff4d4f",
  "#ff6b6b",
  "#ff7a7a",
  "#ff8787",
  "#ff9999",
  "#ffa3a3",
  "#ffb0b0",
];
const categories = ["murder", "robbery", "fraud", "assault", "theft", "arson"];

const ReportBarChart = () => {
  const [chartData, setChartData] = useState([]);
  const [totals, setTotals] = useState({});
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchReportsByAddress = async () => {
      try {
        const localUserRes = await fetch(
          `http://localhost:5000/api/v1/local-user/search/userId?userId=${user?._id}`
        );
        const localUserData = await localUserRes.json();
        if (!localUserData.success) return;

        const localUser = localUserData.data;
        const address = localUser.address;
        if (!address) return;

        const reportRes = await liveSearchByAddress(address);
        if (!reportRes.success) return;

        const fetchedReports = reportRes.data;
        const counts = categories.reduce((acc, cat) => {
          acc[cat] = 0;
          return acc;
        }, {});

        fetchedReports.forEach((report) => {
          const type = report.reportType || "other";
          counts[type] = (counts[type] || 0) + 1;
        });

        setChartData(
          categories.map((cat) => ({
            category: cat,
            count: counts[cat],
          }))
        );

        setTotals(counts);
      } catch (err) {
        console.error(err);
      }
    };

    if (user?._id) fetchReportsByAddress();
  }, [user?._id]);

  return (
    <div className="min-h-full space-y-6 bg-[#0b0b12] p-5 text-white sm:p-8">
      {/* 🟢 Big Heading */}
      <h1
        className="text-left text-3xl font-black tracking-tight text-white md:text-4xl"
        style={{
          color: "#ffffff",
        }}
      >
        Reports in Your Area
      </h1>

      {/* 🟢 Stats Section */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {categories.map((cat, i) => (
          <div
            key={cat}
            className="rounded-xl border border-white/5 bg-[#12121c] p-4 text-left shadow-lg transition hover:border-red-500/30"
          >
            <div className="text-xs font-medium capitalize text-gray-500">
              {cat}
            </div>
            <div
              className="text-lg font-bold"
              style={{ color: redShades[i % redShades.length] }}
            >
              {totals[cat] || 0}
            </div>
          </div>
        ))}
      </div>

      {/* 🟢 Chart Section */}
      <div className="rounded-2xl border border-white/5 bg-[#12121c] p-5 shadow-xl">
        <h2 className="mb-4 text-lg font-semibold text-white">
          Reports by Category
        </h2>
        {chartData.length > 0 && (
          <div style={{ width: "100%", height: 400 }}>
            <ResponsiveContainer>
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#292936" />
                <XAxis dataKey="category" tick={{ fill: "#9ca3af" }} />
                <YAxis allowDecimals={false} tick={{ fill: "#9ca3af" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#12121c",
                    borderRadius: "8px",
                    border: "1px solid #ffffff1a",
                    color: "#ffffff",
                  }}
                />
                <Bar dataKey="count" name="Reports" radius={[6, 6, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={redShades[index % redShades.length]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportBarChart;
