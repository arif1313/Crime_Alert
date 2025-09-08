import { useContext, useState } from "react";
import { AuthContext } from "../Auth/AuthContext";
import { createReport } from "../../Api/ReportApi";

const ReportPost = () => {
  const { user } = useContext(AuthContext);

  const [isTitleEditing, setIsTitleEditing] = useState(false);
  const [isTextEditing, setIsTextEditing] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    reportTitle: "",
    reportDescription: "",
    reportImage: "", // single image as base64
    reportImagePreview: "", // preview URL
    reportLocation: "",
    reportType: "other",
    informPerson: false,
    informLocalPolice: false,
    crimeDate: "",
    crimeTime: "",
    status: "pending",
  });

  // // Convert file to base64
  // const fileToBase64 = (file) => {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = () => resolve(reader.result);
  //     reader.onerror = (error) => reject(error);
  //   });
  // };

const handleChange = async (e) => {
  const { name, type, files, value, checked } = e.target;

  if (type === "file" && name === "reportImage" && files[0]) {
    const file = files[0];

    // Preview এর জন্য লোকাল URL
    const previewUrl = URL.createObjectURL(file);
    setFormData({ ...formData, reportImagePreview: previewUrl });

    // === Upload to ImgBB ===
    const formDataImg = new FormData();
    formDataImg.append("image", file);

    try {
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=e0ce6946d1f76fe9c8a4a3d506dca386`,
        {
          method: "POST",
          body: formDataImg,
        }
      );
      const data = await res.json();

      if (data.success) {
        // ImgBB থেকে লিঙ্ক নিয়ে reportImage এ সেট করা
        setFormData((prev) => ({
          ...prev,
          reportImage: data.data.url, // ImgBB Image URL
        }));
      } else {
        console.error("Image upload failed:", data);
      }
    } catch (error) {
      console.error("Error uploading to ImgBB:", error);
    }
  } else {
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  }
};


const handleSubmit = async () => {
  if (!user) {
    setError("You must be logged in to post a report!");
    document.getElementById("error_modal").showModal();
    return;
  }

  setLoading(true);
  setError(null);
  setSuccess(null);

  try {
    // Only send fields backend expects
    const payload = {
      reportTitle: formData.reportTitle,
      reportDescription: formData.reportDescription,
      reportImage: formData.reportImage,
      reporterId: user._id,
      reportLocation: formData.reportLocation,
      reportType: formData.reportType,
      informPerson: formData.informPerson,
      informLocalPolice: formData.informLocalPolice,
      crimeDate: formData.crimeDate || null,
      crimeTime: formData.crimeTime || null,
      status: formData.status,
      isBlocked: false,
      isDeleted: false,
    };

    await createReport(payload);

    setSuccess("✅ Report Created Successfully!");
    document.getElementById("success_modal").showModal();

    // Reset form
    setFormData({
      reportTitle: "",
      reportDescription: "",
      reportImage: "",
      reportImagePreview: "",
      reportLocation: "",
      reportType: "other",
      informPerson: false,
      informLocalPolice: false,
      crimeDate: "",
      crimeTime: "",
      status: "pending",
    });
  } catch (err) {
    setError(err.response?.data?.message || "Something went wrong!");
    document.getElementById("error_modal").showModal();
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="flex bg-gray-50">
      <div className="w-full max-w-4xl mx-auto my-10 p-6 bg-white shadow-md rounded-md space-y-6">
        <div className="px-8 py-6 bg-white shadow-md rounded-md">
          <div className="w-full max-w-3xl mx-auto space-y-6">
            <div className="flex flex-col lg:flex-row bg-[#ffc8cb] p-5 rounded-md shadow-md w-full text-[#47080b]">
              {/* Image Section */}
              <div className="relative w-full lg:w-72 h-72 bg-gray-300 rounded-md shadow-2xl flex items-center justify-center overflow-hidden">
                {formData.reportImagePreview ? (
                  <img
                    src={formData.reportImagePreview}
                    alt="preview"
                    className="w-full h-full object-cover rounded-md"
                  />
                ) : (
                  <label className="cursor-pointer flex flex-col items-center justify-center w-full h-full">
                    <span className="bg-gray-800 text-white px-4 py-2 rounded">
                      Upload Image
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      name="reportImage"
                      onChange={handleChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              {/* Content Section */}
              <div className="p-5 w-full">
                <div className="w-full max-w-[400px]">
                  {isTitleEditing ? (
                    <input
                      type="text"
                      name="reportTitle"
                      value={formData.reportTitle}
                      onChange={handleChange}
                      onBlur={() => setIsTitleEditing(false)}
                      className="input input-bordered text-xl font-bold min-w-0 w-full"
                      placeholder="Write a Headline"
                      autoFocus
                    />
                  ) : (
                    <h1
                      className={`text-2xl font-bold cursor-pointer ${
                        formData.reportTitle ? "" : "text-gray-400"
                      }`}
                      onClick={() => setIsTitleEditing(true)}
                    >
                      {formData.reportTitle || "Crime Headline"}
                    </h1>
                  )}
                </div>

                <div className="w-full">
                  {isTextEditing ? (
                    <textarea
                      name="reportDescription"
                      value={formData.reportDescription}
                      onChange={handleChange}
                      onBlur={() => setIsTextEditing(false)}
                      className="textarea textarea-bordered w-full mt-2"
                      placeholder="Write description"
                      autoFocus
                    />
                  ) : (
                    <p
                      className={`py-6 cursor-pointer ${
                        formData.reportDescription ? "" : "text-gray-400"
                      }`}
                      onClick={() => setIsTextEditing(true)}
                    >
                      {formData.reportDescription || "Crime Description"}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Other Inputs */}
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="reportLocation"
                placeholder="Location"
                value={formData.reportLocation}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
              <select
                name="reportType"
                value={formData.reportType}
                onChange={handleChange}
                className="select select-bordered w-full"
              >
                <option value="murder">Murder</option>
                <option value="robbery">Robbery</option>
                <option value="fraud">Fraud</option>
                <option value="assault">Assault</option>
                <option value="theft">Theft</option>
                <option value="arson">Arson</option>
                <option value="other">Other</option>
              </select>
              <input
                type="date"
                name="crimeDate"
                value={formData.crimeDate}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
              <input
                type="time"
                name="crimeTime"
                value={formData.crimeTime}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </div>

            {/* Inform Options */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label>Inform Person</label>
                <div className="flex gap-3">
                  <label>
                    <input
                      type="radio"
                      name="informPerson"
                      checked={formData.informPerson === true}
                      onChange={() =>
                        setFormData({ ...formData, informPerson: true })
                      }
                    />{" "}
                    Yes
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="informPerson"
                      checked={formData.informPerson === false}
                      onChange={() =>
                        setFormData({ ...formData, informPerson: false })
                      }
                    />{" "}
                    No
                  </label>
                </div>
              </div>
              <div>
                <label>Inform Local Police</label>
                <div className="flex gap-3">
                  <label>
                    <input
                      type="radio"
                      name="informLocalPolice"
                      checked={formData.informLocalPolice === true}
                      onChange={() =>
                        setFormData({ ...formData, informLocalPolice: true })
                      }
                    />{" "}
                    Yes
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="informLocalPolice"
                      checked={formData.informLocalPolice === false}
                      onChange={() =>
                        setFormData({ ...formData, informLocalPolice: false })
                      }
                    />{" "}
                    No
                  </label>
                </div>
              </div>
            </div>

            {/* Submit */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="btn bg-red-500 text-white mt-4"
            >
              {loading ? "Posting..." : "Post"}
            </button>
          </div>
        </div>

        {/* Modals */}
        <dialog id="error_modal" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg text-red-600">Error</h3>
            <p className="py-4">{error}</p>
            <div className="modal-action">
              <form method="dialog">
                <button className="btn bg-red-500 text-white">Close</button>
              </form>
            </div>
          </div>
        </dialog>

        <dialog id="success_modal" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg text-green-600">Success</h3>
            <p className="py-4">{success}</p>
            <div className="modal-action">
              <form method="dialog">
                <button className="btn bg-green-500 text-white">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default ReportPost;
