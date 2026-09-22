import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useAuth } from "../Auth/AuthContext";

const ProfileSidebar = ({ userId }) => {
  const [localUserdata, setLocalUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [backupData, setBackupData] = useState(null);
 const { user } = useAuth();
  useEffect(() => {
    const loadData = async () => {
      try {
        let url = "";
        if (user?.role === "actionTeam") {
            url = `http://localhost:5000/api/v1/actionteam/user/${userId}`;
        } else {
        
          url = `http://localhost:5000/api/v1/local-user/search/userId?userId=${userId}`;
        }
        const res = await fetch(url);
        const data = await res.json();
        if (data.success && data.data) setLocalUser(data.data);
      } catch (err) {
        console.error("❌ Error fetching profile:", err);
      } finally {
        setLoading(false);
      } 
    };

    if (userId) loadData();
  }, [userId, user?.role]);
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
    <div className="space-y-4">
      {!loading && localUserdata && (
        <div className="rounded-2xl border border-white/5 bg-[#0b0b12] p-5 text-center shadow-xl">
          {/* Profile Image */}
          <img
            src={`http://localhost:5000${localUserdata?.profileImage}` }
            alt="Profile"
            className="mx-auto mb-3 h-24 w-24 rounded-full border-4 border-red-500/40 object-cover shadow-lg"
          />

          {/* Name + UserId */}
          <h2 className="text-xl font-bold text-white">
            {localUserdata?.firstName} {localUserdata?.lastName}
          </h2>
           <span className="mt-2 inline-block rounded-full border border-red-500/20 bg-red-500/10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-red-400">{user?.role}</span>

          {/* Info Section */}
          <div className="mt-6 space-y-4 rounded-xl border border-white/5 bg-[#12121c] p-4 text-left">
            <h3 className="text-center text-sm font-bold uppercase tracking-wider text-gray-400">
              Information
            </h3>

            {/* Contact Number */}
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <span className="font-semibold text-gray-400">Contact</span>
              {isEditing ? (
                <input
                  name="contactNumber"
                  value={localUserdata?.contactNumber || ""}
                  onChange={handleChange}
                  className="w-1/2 rounded-lg border border-white/10 bg-[#0b0b12] px-2 py-1 text-white"
                />
              ) : (
                <span className="text-right text-sm text-gray-300">{localUserdata?.contactNumber || "Not set"}</span>
              )}
            </div>

            {/* Email */}
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <span className="font-semibold text-gray-400">Email</span>
              <span className="max-w-[150px] truncate text-right text-sm text-gray-300">{user?.email || "Not set"}</span>
       
            </div>

            {/* Location */}
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <span className="font-semibold text-gray-400">Location</span>
              {isEditing ? (
                <input
                  name="currentLocation"
                  value={localUserdata?.address || ""}
                  onChange={handleChange}
                  className="w-1/2 rounded-lg border border-white/10 bg-[#0b0b12] px-2 py-1 text-white"
                />
              ) : (
                <span className="text-right text-sm text-gray-300">{localUserdata?.address || "Not set"}</span>
              )}
            </div>

            {/* Date of Birth */}
            <div className="flex items-center justify-between">
              <span className="font-semibold text-gray-400">Date of birth</span>
              <span className="text-sm text-gray-300">
                {localUserdata?.dateOfBirth
                  ? new Date(localUserdata.dateOfBirth).toLocaleDateString()
                  : "Not available"}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex gap-3 justify-center">
            {!isEditing ? (
              <button
                onClick={handleUpdateClick}
                className="w-full rounded-lg bg-red-500 px-5 py-2 text-sm font-semibold text-white shadow-md hover:bg-red-600"
              >
                Update
              </button>
            ) : (
              <>
                <button
                  onClick={handleConfirmClick}
                  className="rounded-lg bg-emerald-500 px-5 py-2 text-sm font-semibold text-white shadow-md hover:bg-emerald-600"
                >
                  Confirm
                </button>
                <button
                  onClick={handleCancelClick}
                  className="rounded-lg bg-white/10 px-5 py-2 text-sm font-semibold text-gray-200 shadow-md hover:bg-white/20"
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

ProfileSidebar.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default ProfileSidebar;
