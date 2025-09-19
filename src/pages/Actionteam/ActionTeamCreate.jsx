import { useState } from "react";
import { FaRegEyeSlash } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import axios from "axios";

const ActionTeamRegister = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    teamName: "",
    age: "",
    address: "",
    dob: "",
    profile: null,
    email: "",
    contact: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState(""); // "error" | "success"
  const [loading, setLoading] = useState(false);

  // Input Change Handler
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  // Register API Call
  const handleRegister = async () => {
    if (!formData.password || !formData.confirmPassword) {
      setModalType("error");
      setModalMessage("Please enter both password fields.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setModalType("error");
      setModalMessage("Passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      const data = new FormData();
      data.append("firstName", formData.firstName);
      data.append("middleName", formData.middleName);
      data.append("lastName", formData.lastName);
      data.append("teamName", formData.teamName);
      data.append("age", formData.age);
      data.append("address", formData.address);
      data.append("dateOfBirth", formData.dob);
      data.append("email", formData.email);
      data.append("contactNumber", formData.contact);
      data.append("password", formData.password);

      if (formData.profile) {
        data.append("profileImage", formData.profile); // Multer field name === "profileImage"
      }

      const response = await axios.post(
        "http://localhost:5000/api/v1/actionTeam/create", // ✅ Backend ActionTeam Route
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        setModalType("success");
        setModalMessage("Action Team Registration Successful!");
      }
    } catch (err) {
      if (err.response?.data?.details) {
        setModalType("error");
        setModalMessage(err.response.data.details.join(", "));
      } else {
        setModalType("error");
        setModalMessage(err.response?.data?.message || "Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">
        Action Team Register
      </h2>

      {/* Form Fields */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">First Name</label>
          <input
            type="text"
            name="firstName"
            className="input input-bordered w-full"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Middle Name</label>
          <input
            type="text"
            name="middleName"
            className="input input-bordered w-full"
            value={formData.middleName}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Last Name</label>
          <input
            type="text"
            name="lastName"
            className="input input-bordered w-full"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Team Name</label>
          <input
            type="text"
            name="teamName"
            className="input input-bordered w-full"
            value={formData.teamName}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Age</label>
          <input
            type="number"
            name="age"
            className="input input-bordered w-full"
            value={formData.age}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Date of Birth</label>
          <input
            type="date"
            name="dob"
            className="input input-bordered w-full"
            value={formData.dob}
            onChange={handleChange}
          />
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium">Address</label>
          <input
            type="text"
            name="address"
            className="input input-bordered w-full"
            value={formData.address}
            onChange={handleChange}
          />
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            className="input input-bordered w-full"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium">Contact Number</label>
          <input
            type="text"
            name="contact"
            className="input input-bordered w-full"
            value={formData.contact}
            onChange={handleChange}
          />
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium">Profile Image</label>
          <input
            type="file"
            name="profile"
            className="file-input w-full"
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Password Section */}
      <div className="mt-6">
        <label className="block text-sm font-medium">Password</label>
        <div className="flex items-center gap-2 w-full">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter password"
            className="input input-bordered w-full"
            value={formData.password}
            onChange={handleChange}
          />
          <button
            onClick={() => setShowPassword(!showPassword)}
            className="p-2"
          >
            {showPassword ? (
              <FaRegEyeSlash className="text-2xl" />
            ) : (
              <IoEyeOutline className="text-2xl" />
            )}
          </button>
        </div>

        <label className="block text-sm font-medium mt-4">
          Confirm Password
        </label>
        <div className="flex items-center gap-2 w-full">
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Re-type password"
            className="input input-bordered w-full"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <button
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="p-2"
          >
            {showConfirmPassword ? (
              <FaRegEyeSlash className="text-2xl" />
            ) : (
              <IoEyeOutline className="text-2xl" />
            )}
          </button>
        </div>
      </div>

      {/* Register Button */}
      <button
        onClick={handleRegister}
        className="btn bg-blue-700 hover:bg-blue-900 mt-6 w-full text-white"
        disabled={loading}
      >
        {loading ? "Registering..." : "Register"}
      </button>

      {/* Modal */}
      {modalMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div
            className={`bg-white rounded-xl shadow-xl p-6 w-96 text-center ${
              modalType === "error" ? "border-red-500" : "border-green-500"
            } border-2`}
          >
            <h2
              className={`text-xl font-bold mb-4 ${
                modalType === "error" ? "text-red-600" : "text-green-600"
              }`}
            >
              {modalType === "error" ? "Error" : "Success"}
            </h2>
            <p className="mb-4">{modalMessage}</p>
            <button
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
              onClick={() => setModalMessage("")}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActionTeamRegister;
