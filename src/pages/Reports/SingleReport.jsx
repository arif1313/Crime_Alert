import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useState } from "react";
import SoftDeleteModal from "./SoftDeleteModal";
import { softDeleteReport } from "../../Api/ReportApi";

const SingleReport = ({ report, manageable, onDeleted }) => {
  const [showModal, setShowModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const res = await softDeleteReport(report._id);
      if (res.success) {
        onDeleted(report._id);
      } else {
        alert("Failed to delete report");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting report");
    } finally {
      setDeleting(false);
      setShowModal(false);
    }
  };

  return (
    <>
      <div className="hero flex flex-col shadow-2xl rounded-md overflow-hidden">
        <div className="flex w-full flex-col lg:flex-row bg-[#ffc8cb] text-[#47080b]">
          <img
            src={report.reportImage || "https://via.placeholder.com/300"}
            alt={report.reportTitle}
            className="w-full lg:w-72 h-72 object-cover"
          />
          <div className="p-5 flex-1">
            <h1 className="text-2xl font-bold">{report.reportTitle}</h1>
            <p className="py-6">{report.reportDescription}</p>
          </div>
        </div>

        <div className="flex flex-wrap justify-between gap-3 p-5">
          <div className="flex gap-3 flex-wrap">
            {!manageable ? (
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
                <button
                  className="btn btn-xs bg-red-100 border-red-500 text-red-700"
                  onClick={() => setShowModal(true)}
                  disabled={deleting}
                >
                  {deleting ? "Deleting..." : "Delete"}
                </button>
              </>
            )}
          </div>
          <button
            className="btn btn-xs bg-[#ffe1e2] border-[#fc6d74] text-[#47080b]"
            onClick={() => navigate(`/report/${report._id}`)}
          >
            See More
          </button>
        </div>
      </div>

      <SoftDeleteModal
        show={showModal}
        onCancel={() => setShowModal(false)}
        onConfirm={handleDelete}
      />
    </>
  );
};

SingleReport.propTypes = {
  report: PropTypes.object.isRequired,
  manageable: PropTypes.bool,
  onDeleted: PropTypes.func.isRequired,
};

export default SingleReport;
