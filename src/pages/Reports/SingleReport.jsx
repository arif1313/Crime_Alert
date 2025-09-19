import { NavLink, useNavigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { useContext, useState, useEffect } from "react";
import SoftDeleteModal from "./SoftDeleteModal";
import RestoreModal from "./RestoreModal";
import { softDeleteReport, restoreReport, updateReport } from "../../Api/ReportApi";
import { AuthContext } from "../Auth/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAllActionTeams, updateActionTeam } from "../../Api/ActionTeamApi";

const SingleReport = ({ report, onDeleted }) => {
  const [showModal, setShowModal] = useState(false);
  const [showRestoreModal, setShowRestoreModal] = useState(false);
  const [showActionModal, setShowActionModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [restoring, setRestoring] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [actionTeams, setActionTeams] = useState([]);
  const [selectedTeams, setSelectedTeams] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(AuthContext);

  const fetchFreeTeams = async () => {
  try {
    const res = await getAllActionTeams();
    if (res.success) {
      setActionTeams(res.data.filter((t) => t.activity === "free"));
    }
  } catch (err) {
    console.error("Error fetching free teams:", err);
  }
};


useEffect(() => {
  if (showActionModal) {
    fetchFreeTeams();
  }
}, [showActionModal]);

  // useEffect(() => {
  //   if (showActionModal) {
  //     getAllActionTeams()
  //       .then((res) => {
  //         if (res.success) {
  //           setActionTeams(res.data);
  //         }
  //       })
  //       .catch((err) => console.error(err));
  //   }
  // }, [showActionModal]);

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

  // ✅ Handle Action selection
  const toggleTeamSelection = (teamId) => {
    setSelectedTeams((prev) =>
      prev.includes(teamId)
        ? prev.filter((id) => id !== teamId)
        : [...prev, teamId]
    );
  };

const handleAction = async () => {
  if (selectedTeams.length === 0) {
    toast.warning("⚠️ Please select at least one action team!");
    return;
  }

  try {
    const res = await fetch(
      `http://localhost:5000/api/v1/report/${report._id}/assign-action`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ actionTeams: selectedTeams }),
      }
    );

    const data = await res.json();
    if (data.success) {
      toast.success("🚓 Action assigned to teams successfully!");

      // ✅ এখন টিমগুলা "work" করে দাও
      await Promise.all(
        selectedTeams.map((teamId) =>
          updateActionTeam(teamId, { activity: "work" })
        )
      );

      // ✅ modal close করার আগে আবার free team reload করো
      await fetchFreeTeams();

      setShowActionModal(false);
      setSelectedTeams([]);
    } else {
      toast.error("❌ Failed to assign action");
    }
  } catch (err) {
    console.error("❌ Error assigning action:", err);
    toast.error("⚠️ Error assigning action");
  }
};



  // // ✅ Handle Action submit
  // const handleAction = async () => {
  //   if (selectedTeams.length === 0) {
  //     toast.warning("⚠️ Please select at least one action team!");
  //     return;
  //   }

  //   try {
  //     const res = await fetch(
  //       `http://localhost:5000/api/v1/report/${report._id}/assign-action`,
  //       {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({ actionTeams: selectedTeams }),
  //       }
  //     );

  //     const data = await res.json();
  //     if (data.success) {
  //       toast.success("🚓 Action assigned to teams successfully!");
  //       setShowActionModal(false);
  //       setSelectedTeams([]);
  //     } else {
  //       toast.error("❌ Failed to assign action");
  //     }
  //   } catch (err) {
  //     console.error("❌ Error assigning action:", err);
  //     toast.error("⚠️ Error assigning action");
  //   }
  // };

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
                
               {report?.ActionTaken.length > 0 ? (
  <button className="btn btn-xs bg-green-100 border-green-500 text-green-700">
    ✅ Action Taken
  </button>
) : (
  <button
    className="btn btn-xs bg-yellow-100 border-yellow-500 text-yellow-700"
    onClick={() => setShowActionModal(true)}
  >
    🚓 Take Action
  </button>
)}
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
          </div>

          {location.pathname === "/" && (
            <>
              <button
                className="btn btn-xs bg-[#ffe1e2] border-[#fc6d74] text-[#47080b]"
                onClick={handleVerify}
                disabled={verifying}
              >
                {verifying
                  ? "Verifying..."
                  : `Verify - ${report?.varifyNumber || 0}`}
              </button>

             <button
  className={`btn btn-xs border ${
    report?.ActionTaken.length>0? 
       "bg-green-200 border-green-600 text-green-800"
      : "bg-red-200 border-red-600 text-red-800"
  }`}
>
  Action {report?.ActionTaken.length>0? "on" : "off"}
</button>

            </>
          )}
          
{/* -------------------- */}

 {location.pathname === "/profile/myReport" && (
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

          <button
            className="btn btn-xs bg-[#ffe1e2] border-[#fc6d74] text-[#47080b]"
            onClick={() => navigate(`/profile/report/${report._id}`)}
          >
            See More
          </button>
         
        </div>
      </div>

      {/* SoftDelete & Restore Modals */}
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

      {/* ✅ Action Modal */}
      {showActionModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-lg font-bold mb-4">Select Action Teams</h2>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {actionTeams.map((team) => (
                <label
                  key={team._id}
                  className="flex items-center gap-2 border-b pb-1"
                >
                  <input
                    type="checkbox"
                    checked={selectedTeams.includes(team._id)}
                    onChange={() => toggleTeamSelection(team._id)}
                  />
                  {team.firstName} {team.lastName}
                </label>
              ))}
            </div>

            {/* Action Button */}
            {selectedTeams.length > 0 && (
              <button
                onClick={handleAction}
                className="mt-4 w-full bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600"
              >
                Take Action
              </button>
            )}

            <button
              onClick={() => setShowActionModal(false)}
              className="mt-2 w-full bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    </>
  );
};

SingleReport.propTypes = {
  report: PropTypes.object.isRequired,
  onDeleted: PropTypes.func.isRequired,
};

export default SingleReport;
