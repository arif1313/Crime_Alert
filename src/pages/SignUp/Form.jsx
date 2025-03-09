import { useState } from "react";
import { Link } from "react-router-dom";

const Form = () => {
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
  const handleClear = () => {
    setFormData({
      name: "",
      age: "",
      address: "",
      dob: "",
      profile: null,
      email: "",
      contact: "",
    });

    // Clear file input manually
    document.getElementById("profile-input").value = "";
  };

  return (
    <>
      <label className="fieldset-label">Name</label>
      <input
      required
        type="text"
        name="name"
        placeholder="Type here"
        className="input"
        value={formData.name}
        onChange={handleChange}
      />

      <label className="fieldset-label">Age</label>
      <input
         required
        type="number"
        name="age"
        placeholder="Type here"
        className="input"
        value={formData.age}
        onChange={handleChange}
      />

      <label className="fieldset-label">Address</label>
      <input
         required
        type="text"
        name="address"
        placeholder="Type here"
        className="input"
        value={formData.address}
        onChange={handleChange}
      />

      <label className="fieldset-label">Date of Birth</label>
      <input
        type="date"
        name="dob"
        className="input"
        value={formData.dob}
        onChange={handleChange}
      />

      <label className="fieldset-label">Profile</label>
      <input
        type="file"
        name="profile"
        id="profile-input"
        className="input"
        onChange={handleChange}
      />

      <label className="fieldset-label">Email</label>
      <input
         required
        type="email"
        name="email"
        placeholder="Type here"
        className="input"
        value={formData.email}
        onChange={handleChange}
      />

      <label className="fieldset-label">Contact</label>
      <input
         required
        type="text"
        name="contact"
        placeholder="Type here"
        className="input"
        value={formData.contact}
        onChange={handleChange}
      />

      {/* Pass formData to PasswordCreate via state */}
      <Link to="/signup/pass" state={{ formData }} className="btn my-10 bg-red-500 text-white">
        Continue
      </Link>

      <button className="btn my-10 btn-primary text-white" onClick={handleClear}>
        Clear
      </button>
    </>
  );
};

export default Form;
