import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Pencil } from "lucide-react";
import { searchByReporterId } from "../../Api/ReportApi";
import SingleReport from "../Reports/SingleReport";

import {  searchByUserId } from "../../Api/LolacUserApi";
import { useAuth } from "../Auth/AuthContext";

const Profile = () => {
  const { user } = useAuth(); 

  const [isEditing, setIsEditing] = useState({});
  const [localUser, setLocalUser] = useState(null);

  const [reports, setReports] = useState([]); 
  const [loading, setLoading] = useState(true);

  const handleEditToggle = (field) => {
    setIsEditing((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalUser((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Reporter ID দিয়ে রিপোর্ট + LocalUser load
  useEffect(() => {
    const loadData = async () => {
      try {
        if (!user?._id) {
          console.warn("User not logged in or missing _id");
          setLoading(false);
          return;
        }

        // Load reports
        const res = await searchByReporterId(user._id);
        if (res.success) setReports(res.data);

        // Load localUser info
        const localUserRes = await searchByUserId(user._id);
        if (localUserRes.success) {
          setLocalUser(localUserRes.data);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [user]);

  if (!user) {
    return <p className="p-5">Loading profile...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row">
        {/* LEFT SIDEBAR */}
        <div className="w-full lg:w-1/4 p-2 space-y-4 lg:fixed ">
          <div className="bg-gradient-to-b from-pink-200 shadow-md rounded-xl p-4 text-center lg:min-h-screen">
            {isEditing.profileImage ? (
              <input
                type="file"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    const file = URL.createObjectURL(e.target.files[0]);
                    setLocalUser((prev) => ({ ...prev, profileImage: file }));
                    handleEditToggle("profileImage");
                  }
                }}
              />
            ) : (
              <>
                <img
                  src={localUser?.profileImage || "/profile.jpg"}
                  alt="Profile"
                  className="w-24 h-24 mx-auto rounded-full mb-2"
                />
                <button onClick={() => handleEditToggle("profileImage")}>
                  <Pencil size={16} />
                </button>
              </>
            )}

            <h2 className="font-bold">
              {localUser?.firstName} {localUser?.middleName} {localUser?.lastName}
            </h2>
            <p className="text-sm text-gray-500">{localUser?.status}</p>

            <div className="space-y-2 text-left mt-4">
              <h1 className="font-bold text-lg text-center">Information</h1>

              {/* Contact */}
              <div className="flex justify-between items-center">
                {isEditing.contactNumber ? (
                  <input
                    name="contactNumber"
                    value={localUser?.contactNumber}
                    onChange={handleChange}
                    onBlur={() => handleEditToggle("contactNumber")}
                  />
                ) : (
                  <p>Contact: {localUser?.contactNumber}</p>
                )}
                <button onClick={() => handleEditToggle("contactNumber")}>
                  <Pencil size={16} />
                </button>
              </div>

              {/* Email */}
              <div className="flex justify-between items-center">
                <p>Email: {localUser?.email || "Not available"}</p>
              </div>

              {/* Location */}
              <div className="flex justify-between items-center">
                {isEditing.currentLocation ? (
                  <input
                    name="currentLocation"
                    value={localUser?.currentLocation}
                    onChange={handleChange}
                    onBlur={() => handleEditToggle("currentLocation")}
                  />
                ) : (
                  <p>Location: {localUser?.currentLocation}</p>
                )}
                <button onClick={() => handleEditToggle("currentLocation")}>
                  <Pencil size={16} />
                </button>
              </div>

              {/* DOB */}
              <div className="flex justify-between items-center">
                <p>
                  Date of Birth:{" "}
                  {new Date(localUser?.dateOfBirth).toLocaleDateString()}
                </p>
              </div>

              {/* Address */}
              <div className="flex justify-between items-center">
                {isEditing.address ? (
                  <input
                    name="address"
                    value={localUser?.address}
                    onChange={handleChange}
                    onBlur={() => handleEditToggle("address")}
                  />
                ) : (
                  <p>Address: {localUser?.address}</p>
                )}
                <button onClick={() => handleEditToggle("address")}>
                  <Pencil size={16} />
                </button>
              </div>

              {/* Emergency Contact */}
              <div className="flex justify-between items-center">
                <p>Emergency: {localUser?.emergencyContact}</p>
              </div>

              {/* Gender & Age */}
              <div className="flex justify-between items-center">
                <p>Gender: {localUser?.gender}</p>
                <p>Age: {localUser?.age}</p>
              </div>
            </div>
          </div>
        </div>

        {/* SPACER */}
        <div className="w-full lg:w-1/4 p-2 space-y-4"></div>

        {/* CENTER REPORTS */}
        <div className="w-full lg:w-2/4 p-2 ml-0 lg:ml-3 ">
          <div className="flex flex-col gap-5">
            <div className="text-xl sticky top-12 bg-white z-10 p-3">
              <h1 className="p-3">My reports</h1>
            </div>

            <div className="overflow-auto p-2 flex flex-col gap-5">
              {loading ? (
                <p>Loading reports...</p>
              ) : reports.length === 0 ? (
                <p>No reports found</p>
              ) : (
                reports.map((report) => (
                  <SingleReport key={report._id} report={report} />
                ))
              )}
            </div>
          </div>
        </div>

        {/* RIGHT MENU */}
        <div className="w-full lg:w-1/4 p-2 lg:fixed right-0">
          <div className="bg-gradient-to-b from-pink-200 shadow-md rounded-xl p-4 lg:min-h-screen">
            <h3 className="font-bold text-xl mb-2">Reports Analysis</h3>
            <ul className="menu rounded-box w-56 font-bold text-red-800 ">
              <li>
                <NavLink className="border-b-2 ">Your Reports</NavLink>
              </li>
              <li>
                <NavLink to="/profile/analysis" className="border-b-2 ">
                  Analysis
                </NavLink>
              </li>
              <li>
                <NavLink className="border-b-2 ">Earning</NavLink>
              </li>
              <li>
                <NavLink to="/profile/manage" className="border-b-2 ">
                  Manage Report
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
