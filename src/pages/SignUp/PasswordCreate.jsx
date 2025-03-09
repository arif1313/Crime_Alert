import { useState } from "react";
import { useLocation } from "react-router-dom";
import { FaRegEyeSlash } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";

const PasswordCreate = () => {
  const location = useLocation();
  const formData = location.state?.formData || {};

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegistration = () => {
    if (!password || !confirmPassword) {
      setError("Please enter both password fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setError("");
    alert("Registration Successful!");
    console.log("User Data:", { ...formData, password });
  };

  return (
    <div className="p-6 col-span-full">
      {/* User Information Grid */}
      <div className="grid gap-4 grid-cols-2 bg-gray-100 p-4 rounded-lg shadow-md">
        <p><strong>Name:</strong> {formData.name || "N/A"}</p>
        <p><strong>Age:</strong> {formData.age || "N/A"}</p>
        <p><strong>Address:</strong> {formData.address || "N/A"}</p>
        <p><strong>Email:</strong> {formData.email || "N/A"}</p>
        <p><strong>Contact:</strong> {formData.contact || "N/A"}</p>
      </div>

      {/* Password Section - Below User Info */}
      <div className="mt-6 p-4 bg-gray-200 rounded-lg shadow-md w-full">
        <label className="fieldset-label">Password</label>
        <div className="flex items-center gap-2 w-full">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Type here"
            className="input w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={() => setShowPassword(!showPassword)} className="p-2">
            {showPassword ? <FaRegEyeSlash className="text-2xl" /> : <IoEyeOutline className="text-2xl" />}
          </button>
        </div>

        <label className="fieldset-label mt-4">Re-type Password</label>
        <div className="flex items-center gap-2 w-full">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Type here"
            className="input w-full"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="p-2">
            {showConfirmPassword ? <FaRegEyeSlash className="text-2xl" /> : <IoEyeOutline className="text-2xl" />}
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 mt-2">{error}</p>}

      {/* Registration Button */}
      <button onClick={handleRegistration} className="btn my-10 bg-red-500 text-white w-full">
        Register
      </button>
    </div>
  );
};

export default PasswordCreate;
