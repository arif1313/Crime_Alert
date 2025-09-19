import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { blockLocalUser, getAllLocalUsers, softDeleteLocalUser, unblockLocalUser } from "../../Api/LolacUserApi";

const AllUser = () => {
  const [localUsers, setLocalUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const res = await getAllLocalUsers();
      if (res.success) {
        setLocalUsers(res.data);
      } else {
        toast.error("❌ Failed to load users");
      }
    } catch (err) {
      console.error(err);
      toast.error("⚠️ Error loading users");
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await softDeleteLocalUser(id);
      if (res.success) {
        toast.success("🗑️ User deleted successfully!");
        setLocalUsers((prev) => prev.filter((u) => u._id !== id));
      } else {
        toast.error(res.message || "❌ Failed to delete user");
      }
    } catch (err) {
      console.error(err);
      toast.error("⚠️ Error deleting user");
    }
  };

  const handleBlock = async (id, currentlyBlocked) => {
    try {
      let res;
      if (currentlyBlocked) {
        res = await unblockLocalUser(id);
      } else {
        res = await blockLocalUser(id);
      }

      if (res.success) {
        toast.success(currentlyBlocked ? "✅ User unblocked!" : "🚫 User blocked!");
        if (res.data && res.data._id) {
          setLocalUsers((prev) =>
            prev.map((u) => (u._id === id ? { ...u, ...res.data } : u))
          );
        } else {
          setLocalUsers((prev) =>
            prev.map((u) => (u._id === id ? { ...u, isBlocked: !currentlyBlocked } : u))
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
          All Local Users
        </li>

        {localUsers.map((person) => (
          <li
            key={person?._id}
            className={`list-row border-b flex items-center p-2 ${
              person?.isBlocked ? "bg-gray-300" : "bg-red-100"
            }`}
          >
            <div className="flex items-center gap-3">
              <img
                className="w-12 h-12 rounded-full"
                src={
                  person?.profileImage
                    ? `http://localhost:5000${person.profileImage}`
                    : "/default-avatar.png"
                }
                alt={person?.firstName}
              />
              <div>
                <div className="text-red-950 font-bold">
                  {person?.firstName} {person?.lastName}
                </div>
                <div className="text-xs uppercase font-semibold opacity-60">
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

export default AllUser;
