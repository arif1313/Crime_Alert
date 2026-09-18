// Temporary mock data for the Dashboard UI.
// Replace with real API data (ReportApi, ActionTeamApi, etc.) when the
// backend endpoints for this page are wired up.

export const crimeMarkers = [
  { id: 1, type: "assault", top: "18%", left: "44%" },
  { id: 2, type: "vandalism", top: "16%", left: "54%" },
  { id: 3, type: "other", top: "22%", left: "82%" },
  { id: 4, type: "theft", top: "40%", left: "20%" },
  { id: 5, type: "assault", top: "60%", left: "38%" },
  { id: 6, type: "vandalism", top: "72%", left: "76%" },
];

export const legendTypes = [
  { type: "you", label: "You are here", color: "#3b82f6" },
  { type: "theft", label: "Theft", color: "#f97316" },
  { type: "assault", label: "Assault", color: "#ef4444" },
  { type: "vandalism", label: "Vandalism", color: "#a855f7" },
  { type: "other", label: "Other", color: "#9ca3af" },
];

export const recentCrimes = [
  {
    id: 1,
    type: "Burglary",
    severity: "High",
    title: "Burglary at Banani",
    location: "Road 12, Banani, Dhaka",
    description:
      "A burglary occurred at a residential home. The suspect broke in through a window and stole several electronics.",
    time: "Today, 9:00 PM",
    distance: "0.8 km away",
  },
  {
    id: 2,
    type: "Assault",
    severity: "Medium",
    title: "Street Fight in Mirpur",
    location: "Mirpur 10, Dhaka",
    description:
      "Two groups were involved in a street fight near Mirpur 10. Police were informed immediately.",
    time: "Today, 7:30 PM",
    distance: "1.2 km away",
  },
  {
    id: 3,
    type: "Vandalism",
    severity: "Low",
    title: "Vehicle Vandalism in Gulshan",
    location: "Gulshan 2, Dhaka",
    description:
      "Several parked vehicles were vandalized. Tires slashed and windows broken.",
    time: "Today, 2:15 AM",
    distance: "2.1 km away",
  },
  {
    id: 4,
    type: "Fraud",
    severity: "Medium",
    title: "Fraudulent Activity in Dhanmondi",
    location: "Dhanmondi 27, Dhaka",
    description:
      "An online fraud incident where a person lost money through mobile banking.",
    time: "Yesterday, 11:45 PM",
    distance: "0.5 km away",
  },
  {
    id: 5,
    type: "Murder",
    severity: "High",
    title: "Murder in Our Area",
    location: "Kalabagan, Dhaka",
    description:
      "A murder incident reported late at night. Police investigation ongoing.",
    time: "Yesterday, 10:30 PM",
    distance: "1.5 km away",
  },
];

// Colors + icon keys are read in RecentCrimeCard / CrimeSummaryChart
export const crimeTypeStyles = {
  Burglary: { badge: "bg-red-500/15 text-red-400 border-red-500/30" },
  Assault: { badge: "bg-orange-500/15 text-orange-400 border-orange-500/30" },
  Vandalism: { badge: "bg-purple-500/15 text-purple-400 border-purple-500/30" },
  Fraud: { badge: "bg-amber-500/15 text-amber-400 border-amber-500/30" },
  Murder: { badge: "bg-red-500/15 text-red-400 border-red-500/30" },
};

export const severityStyles = {
  High: "border-red-500 text-red-400",
  Medium: "border-orange-500 text-orange-400",
  Low: "border-purple-500 text-purple-400",
};

export const crimeSummary = [
  { name: "Burglary", value: 10, color: "#ef4444" },
  { name: "Assault", value: 7, color: "#f97316" },
  { name: "Vandalism", value: 5, color: "#a855f7" },
  { name: "Fraud", value: 4, color: "#f59e0b" },
  { name: "Other", value: 2, color: "#9ca3af" },
];

export const safetyTips = [
  "Avoid walking alone at night.",
  "Stay in well-lit areas.",
  "Report suspicious activities.",
  "Keep emergency numbers handy.",
];

export const nearbyPoliceStations = [
  { name: "Dhanmondi Police Station", distance: "1.2 km", phone: "01713-123456" },
  { name: "Shahbagh Police Station", distance: "1.8 km", phone: "01713-654321" },
  { name: "Lalbagh Police Station", distance: "2.3 km", phone: "01713-111222" },
];
