import { FiPlusCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Auth/AuthContext";

const ReportCrimeCard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleClick = () => navigate(user ? "/report" : "/login");

  return (
    <div className="rounded-2xl border border-white/5 bg-[#12121c] p-5">
      <h3 className="text-white font-semibold text-base">Report a Crime</h3>
      <p className="text-sm text-gray-500 mt-1 mb-4">
        Help your community by reporting incidents.
      </p>
      <button
        onClick={handleClick}
        className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 transition-colors text-white font-medium py-2.5 rounded-lg"
      >
        <FiPlusCircle /> Report Now
      </button>
    </div>
  );
};

export default ReportCrimeCard;
