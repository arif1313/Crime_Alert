import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useAuth } from "../Auth/AuthContext";

const Aboutme = () => {
  const [localUserdata, setLocalUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [backupData, setBackupData] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/v1/local-user/search/userId?userId=${user?._id}`
        );
        const data = await res.json();
        if (data.success && data.data) {
          setLocalUser(data.data);
        }
      } catch (err) {
        console.error("❌ Error fetching local user:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user?._id) loadData();
  }, [user?._id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateClick = () => {
    setBackupData(localUserdata);
    setIsEditing(true);
  };

  const handleConfirmClick = () => {
    console.log("✅ Update API call here:", localUserdata);
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setLocalUser(backupData);
    setIsEditing(false);
  };

  return (
    <div className="w-full flex justify-center bg-gradient-to-br from-pink-100 via-white to-pink-50 min-h-screen">
      {!loading && localUserdata && (
        <div className="w-full  bg-white rounded-2xl shadow-xl p-8 ">
          {/* Profile Header */}
          <div className="flex flex-col items-center border-b pb-6">
            <img
              src={`http://localhost:5000${localUserdata?.profileImage}`}
              alt="Profile"
              className="w-50 h-50  border-4 border-pink-300 shadow-lg object-cover"
            />
            <h2 className="mt-4 font-bold text-2xl text-gray-800">
              {localUserdata?.firstName} {localUserdata?.lastName}
            </h2>
       
             <span className="indicator-item badge badge-secondary">{user?.role}</span>
            <p className="text-gray-500 text-sm">@{user?.email}</p>
          </div>

          {/* Information Section */}
          <div className="mt-8 space-y-6">
            <h3 className="font-bold text-xl text-gray-700 border-b pb-2">
              Personal Information
            </h3>

            {/* Contact */}
            <div className="flex justify-between items-center">
              <span className="font-semibold">📞 Contact</span>
              {isEditing ? (
                <input
                  name="contactNumber"
                  value={localUserdata?.contactNumber || ""}
                  onChange={handleChange}
                  className="border px-3 py-1 rounded w-1/2"
                />
              ) : (
                <span>{localUserdata?.contactNumber || "Not provided"}</span>
              )}
            </div>

            {/* Location */}
            <div className="flex justify-between items-center">
              <span className="font-semibold">📍 Location</span>
              {isEditing ? (
                <input
                  name="address"
                  value={localUserdata?.address || ""}
                  onChange={handleChange}
                  className="border px-3 py-1 rounded w-1/2"
                />
              ) : (
                <span>{localUserdata?.address || "Not set"}</span>
              )}
            </div>

            {/* DOB */}
            <div className="flex justify-between items-center">
              <span className="font-semibold">🎂 Date of Birth</span>
              <span>
                {localUserdata?.dateOfBirth
                  ? new Date(localUserdata.dateOfBirth).toLocaleDateString()
                  : "Not available"}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-10 flex gap-4 justify-center">
            {!isEditing ? (
              <button
                onClick={handleUpdateClick}
                className="px-6 py-2 bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-lg shadow-md"
              >
                Edit Profile
              </button>
            ) : (
              <>
                <button
                  onClick={handleConfirmClick}
                  className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-md"
                >
                  Save
                </button>
                <button
                  onClick={handleCancelClick}
                  className="px-6 py-2 bg-gray-400 hover:bg-gray-500 text-white font-semibold rounded-lg shadow-md"
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

Aboutme.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default Aboutme;
