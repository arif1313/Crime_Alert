
import ReportChart from "./ReportChart";
import ReportStat from "./ReportStat";
import SingleReport from "./SingleReport";

const Reports = () => {
  const reports = Array(10).fill(0); // Dummy data for reports

  return (
    <div className="flex gap-10 pt-20 container justify-between w-full mx-auto">
      {/* Left Section */}
      <div className="w-1/3 p-5 flex flex-col gap-5"> {/* Ensure column layout */}
        <h1 className="text-3xl font-bold text-red-500">Area Crime Report</h1>
        <ReportStat /> 
        <ReportChart />
        {/* <ReportBarChart></ReportBarChart> */}
      </div>

      {/* Right Section */}
      <div className="w-2/3 p-5 flex flex-col gap-5">
        {/* Fixed Header */}
        <div className="text-xl sticky top-0 bg-white z-10 p-3">
          <h1>Search Area-Based Report</h1>
          <div className="flex justify-around">
            <input type="text" placeholder="Search area reports" className="input input-neutral" />
            <input type="text" placeholder="Category" className="input input-neutral" />
          <button className="btn bg-[#be171f] border-[#821a1f] text-white hover:from-[#9d171e] hover:to-[#be171f]">
  Search
</button>

          </div>
        </div>

        {/* Scrollable Reports */}
        <div className="overflow-auto max-h-[60vh] p-2 flex flex-col gap-5">
          {reports.map((_, index) => (
            <SingleReport key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reports;
