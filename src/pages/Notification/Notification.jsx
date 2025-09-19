import { useState, useEffect } from "react";
import axios from "axios";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:5000/api/notifications");
        setNotifications(res.data.data || []);
      } catch (err) {
        console.error("Failed to fetch notifications:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  const handleMarkRead = async (id) => {
    try {
      await axios.patch(`http://localhost:5000/api/notifications/read/${id}`, { isRead: true });
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
      );
    } catch (err) {
      console.error("Failed to mark as read:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/notifications/${id}`);
      setNotifications((prev) => prev.filter((n) => n._id !== id));
    } catch (err) {
      console.error("Failed to delete notification:", err);
    }
  };

  if (loading) return <p className="text-center text-gray-500 mt-4">Loading notifications...</p>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center text-red-600">Notifications</h2>
      {notifications.length === 0 ? (
        <p className="text-center text-gray-500">No notifications</p>
      ) : (
        <div className="space-y-4">
          {notifications.map((n) => (
            <div
              key={n._id}
              className={`p-4 rounded-lg shadow-md transition-all duration-300 
                ${n.isRead ? "bg-red-100" : "bg-white border-l-4 border-red-500"}`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium text-gray-800">{n.message}</p>
                  <p className={`mt-1 text-sm ${n.isRead ? "text-red-400" : "text-red-600"}`}>
                    {n.isRead ? "Read" : "Unread"}
                  </p>
                </div>
                <div className="flex space-x-2">
                  {!n.isRead && (
                    <button
                      onClick={() => handleMarkRead(n._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                    >
                      Mark as Read
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(n._id)}
                    className="bg-red-400 text-white px-3 py-1 rounded hover:bg-red-500 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notification;
