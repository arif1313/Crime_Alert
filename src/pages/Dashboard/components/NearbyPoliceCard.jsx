import { FiPhoneCall } from "react-icons/fi";
import { nearbyPoliceStations } from "../mockData";

const NearbyPoliceCard = () => {
  return (
    <div className="rounded-2xl border border-white/5 bg-[#12121c] p-5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-white font-semibold text-base">Nearby Police Stations</h3>
        <button className="text-xs text-gray-400 hover:text-white">View All</button>
      </div>
      <ul className="flex flex-col gap-4">
        {nearbyPoliceStations.map((s) => (
          <li key={s.name}>
            <p className="text-sm font-medium text-white">{s.name}</p>
            <p className="text-xs text-gray-500 mt-0.5">{s.distance}</p>
            <a
              href={`tel:${s.phone}`}
              className="flex items-center gap-1.5 text-xs text-red-400 mt-1 hover:text-red-300"
            >
              <FiPhoneCall /> {s.phone}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NearbyPoliceCard;
