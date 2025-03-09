import SingleReport from "./SingleReport";

const Reports = () => {
  const reports = Array(10).fill(0); // Dummy data for reports

  return (
    <div className="flex gap-10 pt-20 container justify-between  w-full  mx-auto">
      {/* Left Section */}
      <div className="w-1/2 p-5">
        This is the left section
      </div>

      {/* Right Section */}
      <div className=" w-1/2 p-5 flex flex-col gap-5">
        {/* Fixed Header */}
        <div className="text-xl text-red-400 sticky top-0 bg-white z-10 p-3 ">
          This is a fixed section
        </div>

        {/* Scrollable Reports */}
        <div className="overflow-auto max-h-[70vh] p-2">
          {reports.map((_, index) => (
            <SingleReport key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reports;
