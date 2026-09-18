import {
  FiFilter,
  FiPlus,
  FiMinus,
  FiNavigation,
} from "react-icons/fi";
import { crimeMarkers, legendTypes } from "../mockData";

const markerColor = {
  theft: "bg-orange-500",
  assault: "bg-red-500",
  vandalism: "bg-purple-500",
  other: "bg-gray-400",
};

// Static placeholder map. Swap the background + markers for the real
// Google Maps / Leaflet integration (see CrimeHeatmap folder) later.
const CrimeMapPanel = () => {
  return (
    <div className="relative w-full h-[340px] sm:h-[420px] rounded-2xl overflow-hidden border border-white/5 bg-[#0e0e18]">
      {/* fake map grid background */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-[#101020]/40 via-transparent to-[#0e0e18]" />

      {/* street label flourishes */}
      <span className="absolute top-6 left-10 text-[11px] text-gray-500">
        Dhanmondi Lake
      </span>
      <span className="absolute top-24 right-24 text-[11px] text-gray-500">
        Dhanmondi 32
      </span>
      <span className="absolute bottom-20 left-16 text-[11px] text-gray-500">
        Dhanmondi 27
      </span>
      <span className="absolute bottom-10 right-32 text-[11px] text-gray-500">
        Kalabagan
      </span>

      {/* you are here */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <span className="absolute inset-0 -m-10 rounded-full bg-blue-500/10 animate-pulse" />
        <span className="absolute inset-0 -m-24 rounded-full bg-blue-500/5" />
        <span className="relative block w-4 h-4 rounded-full bg-blue-500 ring-4 ring-blue-500/30" />
      </div>

      {/* crime markers */}
      {crimeMarkers.map((m) => (
        <span
          key={m.id}
          style={{ top: m.top, left: m.left }}
          className={`absolute -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full ring-2 ring-black/40 ${markerColor[m.type]}`}
        />
      ))}

      {/* controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <button className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#14141f]/90 border border-white/10 text-gray-300 hover:text-white">
          <FiFilter />
        </button>
      </div>
      <div className="absolute right-4 bottom-16 flex flex-col rounded-lg overflow-hidden border border-white/10">
        <button className="w-9 h-9 flex items-center justify-center bg-[#14141f]/90 text-gray-300 hover:text-white border-b border-white/10">
          <FiPlus />
        </button>
        <button className="w-9 h-9 flex items-center justify-center bg-[#14141f]/90 text-gray-300 hover:text-white">
          <FiMinus />
        </button>
      </div>
      <button className="absolute right-4 bottom-4 w-9 h-9 flex items-center justify-center rounded-lg bg-[#14141f]/90 border border-white/10 text-gray-300 hover:text-white">
        <FiNavigation />
      </button>

      {/* legend */}
      <div className="absolute bottom-0 left-0 right-0 flex flex-wrap items-center gap-x-5 gap-y-2 px-4 py-3 bg-[#0b0b12]/90 border-t border-white/5">
        {legendTypes.map((l) => (
          <div key={l.type} className="flex items-center gap-1.5 text-xs text-gray-400">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: l.color }}
            />
            {l.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CrimeMapPanel;
