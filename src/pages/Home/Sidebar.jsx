import { useContext } from "react";
import { AuthContext } from "../Auth/AuthContext";
import { useNavigate } from "react-router-dom";
import Searchmap from "./CrimeHeatmap/Searchmap";

const Sidebar = () => {
  const { user } = useContext(AuthContext); 
  const navigate = useNavigate();

  const handleReportClick = () => {
    if (user) {
      navigate("/report"); // যদি লগইন থাকে report পেজে যাবে
    } else {
      navigate("/login"); // যদি লগইন না থাকে login পেজে যাবে
    }
  };

  return (
    <div className="w-full lg:w-1/4">
      <div className="shadow-md bg-[#fff0f0] text-red-800 p-6 rounded-xl">
        <div>
          <div className="bg-gradient-to-b from-[lightPink] shadow-md rounded-xl p-4 mb-4">
            <button
              onClick={handleReportClick}
              className="mt-2 w-full bg-[#cb3737] text-white py-2 px-4 rounded-lg hover:bg-[#a52a2a] transition"
            >
              Report
            </button>
          </div>
        </div>

        <h3 className="font-semibold mb-2">Select Area</h3>
        <div>
          <Searchmap />
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
