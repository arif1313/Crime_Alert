import { FiPhoneCall, FiShare2, FiShield, FiMapPin } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const actions = [
  {
    icon: FiPhoneCall,
    title: "Emergency Call",
    subtitle: "Call 999",
    tint: "text-red-500 bg-red-500/10",
    action: () => (window.location.href = "tel:999"),
  },
  {
    icon: FiShare2,
    title: "Share Location",
    subtitle: "Share Live",
    tint: "text-green-500 bg-green-500/10",
    action: async () => {
      if (!navigator.geolocation) {
        window.alert("Location sharing is not supported by this browser.");
        return;
      }

      navigator.geolocation.getCurrentPosition(async ({ coords }) => {
        const location = `https://maps.google.com/?q=${coords.latitude},${coords.longitude}`;
        if (navigator.share) {
          await navigator.share({ title: "My location", url: location });
        } else if (navigator.clipboard) {
          await navigator.clipboard.writeText(location);
          window.alert("Location link copied to clipboard.");
        } else {
          window.prompt("Copy your location link:", location);
        }
      }, () => window.alert("Unable to access your location."));
    },
  },
  {
    icon: FiShield,
    title: "Safety Tips",
    subtitle: "Stay Safe",
    tint: "text-amber-500 bg-amber-500/10",
    to: "/safety-tips",
  },
  {
    icon: FiMapPin,
    title: "Nearby Police",
    subtitle: "Find Stations",
    tint: "text-blue-500 bg-blue-500/10",
    to: "/map",
  },
];

const QuickActions = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h3 className="text-white font-semibold text-base mb-3">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-3">
        {actions.map(({ icon: Icon, title, subtitle, tint, to, action }) => (
          <button
            key={title}
            onClick={() => (to ? navigate(to) : action())}
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
