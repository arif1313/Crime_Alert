import { useState } from "react";

const initialConnections = [
  { id: 1, name: "Emma Watson", reason: "Work Colleague", img: "https://randomuser.me/api/portraits/women/1.jpg" },
  { id: 2, name: "Chris Evans", reason: "Old Friend", img: "https://randomuser.me/api/portraits/men/2.jpg" },
  { id: 3, name: "Sophia Turner", reason: "College Mate", img: "https://randomuser.me/api/portraits/women/3.jpg" },
  { id: 4, name: "Michael Jordan", reason: "Sports Club", img: "https://randomuser.me/api/portraits/men/4.jpg" },
  { id: 5, name: "Isabella Brown", reason: "Neighbor", img: "https://randomuser.me/api/portraits/women/5.jpg" },
  { id: 6, name: "David Beckham", reason: "Business Partner", img: "https://randomuser.me/api/portraits/men/6.jpg" },
  { id: 7, name: "Olivia Green", reason: "Childhood Friend", img: "https://randomuser.me/api/portraits/women/7.jpg" },
  { id: 8, name: "Robert Downey", reason: "Club Member", img: "https://randomuser.me/api/portraits/men/8.jpg" },
  { id: 9, name: "Mia Johnson", reason: "Family Friend", img: "https://randomuser.me/api/portraits/women/9.jpg" },
  { id: 10, name: "Tom Holland", reason: "School Friend", img: "https://randomuser.me/api/portraits/men/10.jpg" },
];

const Connection = () => {
  const [connections, setConnections] = useState(initialConnections);

  const handleDelete = (id) => {
    setConnections(connections.filter((c) => c.id !== id));
  };

  const handleBlock = (id) => {
    setConnections(
      connections.map((c) =>
        c.id === id ? { ...c, blocked: !c.blocked } : c
      )
    );
  };

  return (
    <div className="w-full lg:w-2/4 p-2">
      <ul className="list rounded-box shadow-md gap-2 w-full">
        <li className="p-4 pb-2 tracking-wide shadow-2xl text-2xl text-black">
          Your Connected People
        </li>

        {connections.map((person) => (
          <li
            key={person.id}
            className={`list-row border-b flex items-center p-2 ${
              person.blocked ? "bg-gray-300" : "bg-red-100"
            }`}
          >
            {/* Left side: image + text */}
            <div className="flex items-center gap-3">
              <img
                className="w-12 h-12 rounded-full"
                src={person.img}
                alt={person.name}
              />
              <div>
                <div className="text-red-950 font-bold">{person.name}</div>
                <div className="text-xs uppercase font-semibold opacity-60">
                  {person.reason}
                </div>
              </div>
            </div>

            {/* Right side: buttons */}
            <div className="flex gap-2 ml-auto">
              <button
                onClick={() => handleDelete(person.id)}
                className="btn btn-sm bg-red-400 hover:bg-red-600 text-white"
              >
                Delete
              </button>
              <button
                onClick={() => handleBlock(person.id)}
                className={`btn btn-sm ${
                  person.blocked
                    ? "bg-gray-700 hover:bg-gray-900 text-white"
                    : "bg-blue-400 hover:bg-blue-700 text-white"
                }`}
              >
                {person.blocked ? "Unblock" : "Block"}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Connection;
