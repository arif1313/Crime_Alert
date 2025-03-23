
// import { Link } from "react-router-dom";
import ReportCreate from "./ReportCreate";
import { useState } from "react";

const ReportPost = () => {

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    address: "",
    dob: "",
    profile: null,
    email: "",
    contact: "",
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    });
  };

  // Function to clear form data
  // const handleClear = () => {
  //   setFormData({
  //     name: "",
  //     age: "",
  //     address: "",
  //     dob: "",
  //     profile: null,
  //     email: "",
  //     contact: "",
  //   });

  //   // Clear file input manually
  //   document.getElementById("profile-input").value = "";
  // };


  // Function to clear form data

  return (
    <div className="flex  bg-gray-50">
      {/* Sidebar with form elements */}
      <div className="w-1/2 my-24 px-6 grid grid-cols-2 gap-y-3 gap-x-0">
     
  <>
    <label className="fieldset-label">Crime Type</label>
    <select
      defaultValue="Select a Crime Type"
      className="select select-error"
      required
      name="crimeType"
      value={formData.crimeType}
      onChange={handleChange}
    >
      <option disabled>Select a Crime Type</option>
      <option>Assault</option>
      <option>Burglary</option>
      <option>Fraud</option>
      <option>Theft</option>
    </select>

    <label className="fieldset-label">Crime Location</label>
    <select
      defaultValue="Select a Location"
      className="select select-error"
      required
      name="crimeLocation"
      value={formData.crimeLocation}
      onChange={handleChange}
    >
      <option disabled>Select a Crime Location</option>
      <option>Downtown</option>
      <option>Suburbs</option>
      <option>Rural Area</option>
      <option>Other</option>
    </select>

    <label className="fieldset-label">Date of Crime</label>
    <input
      type="date"
      name="crimeDate"
      className="input"
      value={formData.crimeDate}
      onChange={handleChange}
    />

    <label className="fieldset-label">Emergency Contact</label>
    <input
      required
      type="text"
      name="emergencyContact"
      placeholder="Type here"
      className="input"
      value={formData.emergencyContact}
      onChange={handleChange}
    />

    <label className="fieldset-label">Crime Time</label>
    <input
      required
      type="time"
      name="crimeTime"
      className="input"
      value={formData.crimeTime}
      onChange={handleChange}
    />

    <fieldset className="p-4 bg-base-100 border border-base-300 rounded-lg">
      <legend className="font-semibold text-gray-700">Security Option</legend>
      <label className="flex items-center space-x-2">
        <input type="checkbox" defaultChecked className="checkbox checkbox-primary" />
        <span className="text-gray-700">Hide me (Private Report)</span>
      </label>
    </fieldset>

    {/* Optional buttons for navigation */}
    {/* <Link to="/next-page" state={{ formData }} className="btn my-10 bg-red-500 text-white">
      Continue
    </Link>

    <button className="btn my-10 btn-primary text-white" onClick={handleClear}>
      Clear
    </button> */}
  </>
</div>



      {/* Report Create Section (Main content) */}
      <div className="w-1/2 px-8 py-6 bg-white shadow-md rounded-md">
        <ReportCreate />
      </div>
    </div>
  );
};

export default ReportPost;
