import { FiPhoneCall, FiShare2, FiShield, FiMapPin } from "react-icons/fi";

const actions = [
  {
    icon: FiPhoneCall,
    title: "Emergency Call",
    subtitle: "Call 999",
    tint: "text-red-500 bg-red-500/10",
  },
  {
    icon: FiShare2,
    title: "Share Location",
    subtitle: "Share Live",
    tint: "text-green-500 bg-green-500/10",
  },
  {
    icon: FiShield,
    title: "Safety Tips",
    subtitle: "Stay Safe",
    tint: "text-amber-500 bg-amber-500/10",
  },
  {
    icon: FiMapPin,
    title: "Nearby Police",
    subtitle: "Find Stations",
    tint: "text-blue-500 bg-blue-500/10",
  },
];

const QuickActions = () => {
  return (
    <div>
      <h3 className="text-white font-semibold text-base mb-3">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-3">
        {actions.map(({ icon: Icon, title, subtitle, tint }) => (
          <button
            key={title}
            className="flex flex-col items-start gap-2 rounded-xl border border-white/5 bg-[#12121c] hover:bg-[#161622] p-3.5 text-left"
          >
            <span className={`w-9 h-9 flex items-center justify-center rounded-lg ${tint}`}>
              <Icon className="text-lg" />
            </span>
            <span className="text-sm font-medium text-white">{title}</span>
            <span className="text-xs text-gray-500 -mt-1.5">{subtitle}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
