import { useEffect, useState } from "react";
import {
  blockActionTeam,
  getAllActionTeams,
  softDeleteActionTeam,
  unblockActionTeam,
} from "../../Api/ActionTeamApi";
import { toast } from "react-toastify";

const ActionTeam = () => {
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    loadTeams();
  }, []);

  const loadTeams = async () => {
    try {
      const res = await getAllActionTeams();
      if (res.success) {
        setTeamMembers(res.data);
      } else {
        toast.error("❌ Failed to load teams");
      }
    } catch (err) {
      console.error(err);
      toast.error("⚠️ Error loading teams");
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await softDeleteActionTeam(id);
      if (res.success) {
        toast.success("🗑️ Team deleted successfully!");
        setTeamMembers((prev) => prev.filter((t) => t._id !== id));
      } else {
        toast.error(res.message || "❌ Failed to delete team");
      }
    } catch (err) {
      console.error(err);
      toast.error("⚠️ Error deleting team");
    }
  };

  // ✅ Block / Unblock handler (pass current blocked state)
  const handleBlock = async (id, currentlyBlocked) => {
    try {
      let res;
      if (currentlyBlocked) {
        // currently blocked -> call unblock
        res = await unblockActionTeam(id);
      } else {
        // currently not blocked -> call block
        res = await blockActionTeam(id);
      }

      if (res.success) {
        toast.success(currentlyBlocked ? "✅ Team unblocked!" : "🚫 Team blocked!");

        // Prefer updating from server response if returned updated object exists
        // many APIs return updated object in res.data — use it if available
        if (res.data && res.data._id) {
          setTeamMembers((prev) =>
            prev.map((t) => (t._id === id ? { ...t, ...res.data } : t))
          );
        } else {
          // fallback: toggle isBlocked locally
          setTeamMembers((prev) =>
            prev.map((t) => (t._id === id ? { ...t, isBlocked: !currentlyBlocked } : t))
          );
        }
      } else {
        toast.error(res.message || "❌ Failed to update block status");
      }
    } catch (err) {
      console.error(err);
      toast.error("⚠️ Error updating block status");
    }
  };

  return (
    <div className="w-full p-2">
       <ul className="list rounded-box shadow-md gap-2 w-full">
        <li className="p-4 pb-2 tracking-wide shadow-2xl text-2xl text-black">
          Your Connected People
        </li>

        {teamMembers.map((person) => (
          <li
            key={person?._id}
            className={`list-row border-b flex items-center p-2 ${
              person?.isBlocked ? "bg-gray-300" : "bg-red-100"
            }`}
          >
            <div className="flex items-center gap-3">
              <img
                className="w-12 h-12 rounded-full"
                src={person?.profileImage ? `http://localhost:5000${person.profileImage}` : "/default-avatar.png"}
                alt={person?.firstName}
              />
              <div>
                <div className="text-red-950 font-bold">
                  {person?.firstName} {person?.lastName}
                </div>
                <div className="text-xs uppercase font-semibold opacity-60">
                  {person?.activity}
                </div>
              </div>
            </div>

            <div className="flex gap-2 ml-auto">
              <button
                onClick={() => handleDelete(person?._id)}
                className="btn btn-sm bg-red-400 hover:bg-red-600 text-white"
              >
                Delete
              </button>

              {/* pass current blocked state as second arg */}
              <button
                onClick={() => handleBlock(person?._id, !!person?.isBlocked)}
                className={`btn btn-sm ${
                  person?.isBlocked
                    ? "bg-gray-700 hover:bg-gray-900 text-white"
                    : "bg-blue-400 hover:bg-blue-700 text-white"
                }`}
              >
                {person?.isBlocked ? "Unblock" : "Block"}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActionTeam;
