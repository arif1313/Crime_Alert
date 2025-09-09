import PropTypes from "prop-types";

// eslint-disable-next-line react/prop-types
const SingleReport = ({ report, manageMode = true }) => {
  return (
    <div className="hero flex flex-col shadow-2xl">
      <div className="flex w-full flex-col lg:flex-row bg-[#ffc8cb] text-[#47080b]">
        {/* Report Image */}
        <img
          src={report.reportImage || "https://via.placeholder.com/300"}
          alt={report.reportTitle}
          className="w-full lg:w-72 h-72 rounded-md shadow-2xl"
        />

        {/* Report Details */}
        <div className="p-5">
          <h1 className="text-2xl font-bold">{report.reportTitle}</h1>
          <p className="py-6">{report.reportDescription}</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between gap-5 w-full p-5">
        <div className="flex gap-6">
          {!manageMode ? (
            <>
              <button className="btn btn-xs bg-[#ffe1e2] border-[#fc6d74] text-[#47080b]">
                Save
              </button>
              <button className="btn btn-xs bg-[#ffe1e2] border-[#fc6d74] text-[#47080b]">
                Verify
              </button>
              <button className="btn btn-xs bg-[#ffe1e2] border-[#fc6d74] text-[#47080b]">
                Alert
              </button>
              <button className="btn btn-xs bg-[#ffe1e2] border-[#fc6d74] text-[#47080b]">
                Help
              </button>
            </>
          ) : (
            <>
              <button className="btn btn-xs bg-blue-100 border-blue-500 text-blue-700">
                Update
              </button>
              <button className="btn btn-xs bg-red-100 border-red-500 text-red-700">
                Delete
              </button>
            </>
          )}
        </div>
        <button className="btn btn-xs bg-[#ffe1e2] border-[#fc6d74] text-[#47080b]">
          See More
        </button>
      </div>
    </div>
  );
};

SingleReport.propTypes = {
  report: PropTypes.shape({
    reportTitle: PropTypes.string.isRequired,
    reportDescription: PropTypes.string,
    reportImage: PropTypes.string,
  }).isRequired,
  manageMode: PropTypes.bool, // নতুন prop
};

export default SingleReport;
