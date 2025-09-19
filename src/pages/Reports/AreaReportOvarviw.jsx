import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell } from "recharts";
import { getAllReports } from "../../Api/ReportApi";

// Generate red shades
const redShades = [
  "#ff4d4f",
  "#ff6b6b",
  "#ff7a7a",
  "#ff8787",
  "#ff9999",
  "#ffa3a3",
  "#ffb0b0",
];

const ReportCategoryBarChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true);
      try {
        const res = await getAllReports();
        if (res.success) {
          const counts = res.data.reduce((acc, report) => {
            const type = report.reportType || "other";
            acc[type] = (acc[type] || 0) + 1;
            return acc;
          }, {});

          const chartData = Object.keys(counts).map((key) => ({
            category: key,
            count: counts[key],
          }));

          setData(chartData);
        }
      } catch (err) {
        console.error("Failed to fetch reports:", err);
      }
      setLoading(false);
    };

    fetchReports();
  }, []);

  if (loading) return <p>Loading chart...</p>;

  return (
    <div style={{ width: "100%", height: 400 }}>
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="count"
            name="Reports"
            label={{ position: "top" }}
            isAnimationActive={true}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={redShades[index % redShades.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ReportCategoryBarChart;
