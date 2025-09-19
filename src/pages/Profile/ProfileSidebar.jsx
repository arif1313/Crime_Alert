import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useAuth } from "../Auth/AuthContext";

const ProfileSidebar = ({ userId }) => {
  const [localUserdata, setLocalUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [backupData, setBackupData] = useState(null);
 const { user } = useAuth();
 console.log('user',user)
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
    <div className=" p-2 space-y-4 ">
      {!loading && localUserdata && (
        <div className="bg-gradient-to-b from-pink-200 to-pink-100 shadow-lg rounded-2xl p-6 text-center lg:min-h-screen">
          {/* Profile Image */}
          <img
            src={`http://localhost:5000${localUserdata?.profileImage}` }
            alt="Profile"
            className="w-28 h-28 mx-auto rounded-full border-4 border-white shadow-md mb-3"
          />

          {/* Name + UserId */}
          <h2 className="font-bold text-xl text-gray-800">
            {localUserdata?.firstName} {localUserdata?.lastName}
          </h2>
           <span className="indicator-item badge badge-secondary text-black">{user?.role}</span>

          {/* Info Section */}
          <div className="mt-6 space-y-4 text-left bg-white/60 p-4 rounded-lg shadow-inner">
            <h3 className="font-bold text-lg text-center text-gray-700">
              Information
            </h3>

            {/* Contact Number */}
            <div className="flex justify-between items-center border-b pb-2">
              <span className="font-semibold">📞 Contact:</span>
              {isEditing ? (
                <input
                  name="contactNumber"
                  value={localUserdata?.contactNumber || ""}
                  onChange={handleChange}
                  className="border px-2 py-1 rounded"
                />
              ) : (
                <span>{localUserdata?.contactNumber}</span>
              )}
            </div>

            {/* Email */}
            <div className="flex justify-between items-center border-b pb-2">
              <span className="font-semibold">📧 Email:{user?.email}</span>
       
            </div>

            {/* Location */}
            <div className="flex justify-between items-center border-b pb-2">
              <span className="font-semibold">📍 Location:</span>
              {isEditing ? (
                <input
                  name="currentLocation"
                  value={localUserdata?.address || ""}
                  onChange={handleChange}
                  className="border px-2 py-1 rounded"
                />
              ) : (
                <span>{localUserdata?.address || "Not set"}</span>
              )}
            </div>

            {/* Date of Birth */}
            <div className="flex justify-between items-center">
              <span className="font-semibold">🎂 Date of Birth:</span>
              <span>
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
                className="px-5 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md"
              >
                Update
              </button>
            ) : (
              <>
                <button
                  onClick={handleConfirmClick}
                  className="px-5 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-md"
                >
                  Confirm
                </button>
                <button
                  onClick={handleCancelClick}
                  className="px-5 py-2 bg-gray-400 hover:bg-gray-500 text-white font-semibold rounded-lg shadow-md"
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
