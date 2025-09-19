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
  const [reports, setReports] = useState([]);
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
        setReports(fetchedReports);

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
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* 🟢 Big Heading */}
      <h1
        className="text-3xl md:text-4xl font-extrabold text-center"
        style={{
          background: "linear-gradient(90deg, #ff4d4f, #ff7a7a)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Reports in Your Area
      </h1>

      {/* 🟢 Stats Section */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((cat, i) => (
          <div
            key={cat}
            className="rounded-lg shadow p-3 text-center transition hover:scale-105"
            style={{ backgroundColor: `${redShades[i % redShades.length]}20` }}
          >
            <div className="text-xs font-medium text-gray-700 capitalize">
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
      <div className="bg-white shadow-lg rounded-xl p-4">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">
          Reports by Category
        </h2>
        {chartData.length > 0 && (
          <div style={{ width: "100%", height: 400 }}>
            <ResponsiveContainer>
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="category" tick={{ fill: "#374151" }} />
                <YAxis allowDecimals={false} tick={{ fill: "#374151" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    borderRadius: "8px",
                    border: "1px solid #e5e7eb",
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
