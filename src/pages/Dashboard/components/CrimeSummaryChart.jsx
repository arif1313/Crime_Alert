import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { FiChevronDown } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { crimeSummary } from "../mockData";

const total = crimeSummary.reduce((sum, c) => sum + c.value, 0);

const CrimeSummaryChart = () => {
  const navigate = useNavigate();
  return (
    <div className="rounded-2xl border border-white/5 bg-[#12121c] p-5">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-white font-semibold text-base">Crime Summary</h3>
        <button className="flex items-center gap-1 text-xs text-gray-400">
          This Week <FiChevronDown />
        </button>
      </div>

      <div className="relative h-44">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={crimeSummary}
              dataKey="value"
              nameKey="name"
              innerRadius="68%"
              outerRadius="95%"
              paddingAngle={2}
              stroke="none"
            >
              {crimeSummary.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-3xl font-bold text-white">{total}</span>
          <span className="text-xs text-gray-500">Total Crimes</span>
        </div>
      </div>

      <div className="flex flex-col gap-2 mt-2">
        {crimeSummary.map((c) => (
          <div key={c.name} className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 text-gray-300">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: c.color }}
              />
              {c.name}
            </span>
            <span className="text-gray-500">
              {c.value} ({Math.round((c.value / total) * 100)}%)
            </span>
          </div>
        ))}
      </div>

      <button onClick={() => navigate("/profile/analysis")} className="w-full mt-4 py-2.5 text-sm font-medium text-gray-300 border border-white/10 rounded-lg hover:bg-white/5">
        View Full Report
      </button>
    </div>
  );
};

export default CrimeSummaryChart;
