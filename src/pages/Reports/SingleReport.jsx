

import { NavLink, useNavigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { useContext, useState } from "react";
import SoftDeleteModal from "./SoftDeleteModal";
import RestoreModal from "./RestoreModal";
import { softDeleteReport, restoreReport, updateReport } from "../../Api/ReportApi";
import { AuthContext } from "../Auth/AuthContext";

// ✅ import toast
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SingleReport = ({ report, onDeleted }) => {
  const [showModal, setShowModal] = useState(false);
  const [showRestoreModal, setShowRestoreModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [restoring, setRestoring] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const { user } = useContext(AuthContext);

  const handleVerify = async () => {
    if (!user) {
      toast.error("⚠️ You must be logged in to verify!");
      return;
    }

    if (report?.reporterId?._id === user._id) {
      toast.warning("🚫 You cannot verify your own report!");
      return;
    }

    if (report?.verifiedBy?.includes(user._id)) {
      toast.info("ℹ️ You have already verified this report!");
      return;
    }

    setVerifying(true);
    try {
      const res = await updateReport(report._id, {
        varifyNumber: (report?.varifyNumber || 0) + 1,
        verifiedBy: [...(report?.verifiedBy || []), user._id],
      });

      if (res.success) {
        report.varifyNumber = res.data.varifyNumber;
        report.verifiedBy = res.data.verifiedBy;
        toast.success("✅ Report verified successfully!");
      } else {
        toast.error("❌ Failed to verify report");
      }
    } catch (err) {
      console.error(err);
      toast.error("⚠️ Error verifying report");
    } finally {
      setVerifying(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const res = await softDeleteReport(report._id);
      if (res.success) {
        onDeleted(report._id);
        toast.success("🗑️ Report deleted successfully!");
      } else {
        toast.error("❌ Failed to delete report");
      }
    } catch (err) {
      console.error(err);
      toast.error("⚠️ Error deleting report");
    } finally {
      setDeleting(false);
      setShowModal(false);
    }
  };

  const handleRestore = async () => {
    setRestoring(true);
    try {
      const res = await restoreReport(report._id);
      if (res.success) {
        onDeleted(report._id);
        toast.success("♻️ Report restored successfully!");
      } else {
        toast.error("❌ Failed to restore report");
      }
    } catch (err) {
      console.error(err);
      toast.error("⚠️ Error restoring report");
    } finally {
      setRestoring(false);
      setShowRestoreModal(false);
    }
  };

  return (
    <>
      <div className="hero flex flex-col shadow-2xl rounded-md overflow-hidden">
        {/* ✅ existing code ... */}
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
            {/* ✅ Button logic based on location.pathname */}
            {location.pathname === "/profile/reports" && (
              <>
                <NavLink
                  to={`/update/${report._id}`}
                  className="btn btn-xs bg-blue-100 border-blue-500 text-blue-700"
                >
                  Update
                </NavLink>
                <button
                  className="btn btn-xs bg-red-100 border-red-500 text-red-700"
                  onClick={() => setShowModal(true)}
                  disabled={deleting}
                >
                  {deleting ? "Deleting..." : "Delete"}
                </button>
              </>
            )}

            {(location.pathname === "/profile/delete" ||
              location.pathname === "/profile/alldelete") && (
              <button
                className="btn btn-xs bg-green-100 border-green-500 text-green-700"
                onClick={() => setShowRestoreModal(true)}
                disabled={restoring}
              >
                {restoring ? "Restoring..." : "Restore"}
              </button>
            )}

            {location.pathname === "/profile/usermanage" && (
              <>
                <button
                  className="btn btn-xs bg-red-100 border-red-500 text-red-700"
                  onClick={() => setShowModal(true)}
                  disabled={deleting}
                >
                  {deleting ? "Deleting..." : "Delete"}
                </button>
                <button className="btn btn-xs bg-yellow-100 border-yellow-500 text-yellow-700">
                  Block
                </button>
              </>
            )}
          </div>
           {location.pathname === "/" && (
  <>
<button
  className="btn btn-xs bg-[#ffe1e2] border-[#fc6d74] text-[#47080b]"
  onClick={handleVerify}
  disabled={verifying}
>
  {verifying ? "Verifying..." : `Verify - ${report?.varifyNumber || 0}`}
</button>

    <button className="btn btn-xs bg-[#ffe1e2] border-[#fc6d74] text-[#47080b]">
      Action off
    </button>
  </>
)}

          {/* See More button always */}
          <button
            className="btn btn-xs bg-[#ffe1e2] border-[#fc6d74] text-[#47080b]"
            onClick={() => navigate(`/profile/report/${report._id}`)}
          >
            See More
          </button>
        </div>
      </div>

      {/* Modals */}
      <SoftDeleteModal
        show={showModal}
        onCancel={() => setShowModal(false)}
        onConfirm={handleDelete}
      />
      <RestoreModal
        show={showRestoreModal}
        onCancel={() => setShowRestoreModal(false)}
        onConfirm={handleRestore}
      />

      {/* ✅ Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    </>
  );
};

SingleReport.propTypes = {
  report: PropTypes.object.isRequired,
  onDeleted: PropTypes.func.isRequired,
};

export default SingleReport;




