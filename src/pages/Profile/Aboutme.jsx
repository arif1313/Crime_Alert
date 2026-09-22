import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useAuth } from "../Auth/AuthContext";
import { searchByUserId, updateLocalUser } from "../../Api/LolacUserApi";

const Aboutme = () => {
  const [localUserdata, setLocalUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [backupData, setBackupData] = useState(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await searchByUserId(user._id);
        if (response.success && response.data) setLocalUser(response.data);
      } catch (err) {
        console.error("Error fetching local user:", err);
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
    const saveProfile = async () => {
      setSaving(true);
      setMessage("");
      const response = await updateLocalUser(localUserdata._id, {
        contactNumber: localUserdata.contactNumber,
        address: localUserdata.address,
      });
      if (response.success) {
        setLocalUser(response.data || localUserdata);
        setIsEditing(false);
        setMessage("Profile updated successfully.");
      } else {
        setMessage(response.message || "Profile update failed.");
      }
      setSaving(false);
    };
    saveProfile();
  };

  const handleCancelClick = () => {
    setLocalUser(backupData);
    setIsEditing(false);
  };

  return (
    <div className="min-h-full w-full bg-[#0b0b12] p-5 sm:p-8">
      {loading && <div className="rounded-2xl border border-white/5 bg-[#12121c] p-12 text-center text-sm text-gray-500">Loading profile details...</div>}
      {!loading && localUserdata && (
        <div className="w-full rounded-2xl border border-white/5 bg-[#12121c] p-6 shadow-xl sm:p-8">
          {/* Profile Header */}
          <div className="flex flex-col items-center border-b border-white/5 pb-6">
            <img
              src={`http://localhost:5000${localUserdata?.profileImage}`}
              alt="Profile"
              className="h-32 w-32 rounded-full border-4 border-red-500/30 object-cover shadow-lg"
            />
            <h2 className="mt-4 text-2xl font-bold text-white">
              {localUserdata?.firstName} {localUserdata?.lastName}
            </h2>
       
             <span className="mt-2 rounded-full border border-red-500/20 bg-red-500/10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-red-400">{user?.role}</span>
            <p className="mt-2 text-sm text-gray-500">{user?.email}</p>
          </div>

          {/* Information Section */}
          <div className="mt-8 space-y-6">
            <h3 className="border-b border-white/5 pb-2 text-lg font-bold text-white">
              Personal Information
            </h3>

            {/* Contact */}
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <span className="font-semibold text-gray-400">Contact</span>
              {isEditing ? (
                <input
                  name="contactNumber"
                  value={localUserdata?.contactNumber || ""}
                  onChange={handleChange}
                  className="w-1/2 rounded-lg border border-white/10 bg-[#0b0b12] px-3 py-2 text-white"
                />
              ) : (
                <span className="text-gray-300">{localUserdata?.contactNumber || "Not provided"}</span>
              )}
            </div>

            {/* Location */}
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <span className="font-semibold text-gray-400">Location</span>
              {isEditing ? (
                <input
                  name="address"
                  value={localUserdata?.address || ""}
                  onChange={handleChange}
                  className="w-1/2 rounded-lg border border-white/10 bg-[#0b0b12] px-3 py-2 text-white"
                />
              ) : (
                <span className="text-gray-300">{localUserdata?.address || "Not set"}</span>
              )}
            </div>

            {/* DOB */}
            <div className="flex items-center justify-between">
              <span className="font-semibold text-gray-400">Date of Birth</span>
              <span className="text-gray-300">
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
                className="rounded-lg bg-red-500 px-6 py-2 text-sm font-semibold text-white shadow-md hover:bg-red-600"
              >
                Edit Profile
              </button>
            ) : (
              <>
                <button
                  onClick={handleConfirmClick}
                  disabled={saving}
                  className="rounded-lg bg-emerald-500 px-6 py-2 text-sm font-semibold text-white shadow-md hover:bg-emerald-600"
                >
                  {saving ? "Saving..." : "Save"}
                </button>
                <button
                  onClick={handleCancelClick}
                  className="rounded-lg bg-white/10 px-6 py-2 text-sm font-semibold text-gray-200 shadow-md hover:bg-white/20"
                >
                  Cancel
                </button>
              </>
            )}
          </div>
          {message && <p className={`mt-4 text-center text-sm ${message.includes("successfully") ? "text-emerald-400" : "text-red-400"}`}>{message}</p>}
        </div>
      )}
      {!loading && !localUserdata && <div className="rounded-2xl border border-dashed border-white/10 bg-[#12121c] p-12 text-center"><h2 className="font-bold text-white">Profile details unavailable</h2><p className="mt-2 text-sm text-gray-500">We could not load your profile information right now.</p></div>}
    </div>
  );
};

Aboutme.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default Aboutme;
