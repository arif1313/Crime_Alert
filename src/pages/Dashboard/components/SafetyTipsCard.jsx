import { safetyTips } from "../mockData";

const SafetyTipsCard = () => {
  return (
    <div className="rounded-2xl border border-white/5 bg-[#12121c] p-5">
      <h3 className="text-white font-semibold text-base mb-3">Safety Tips</h3>
      <ul className="flex flex-col gap-2">
        {safetyTips.map((tip) => (
          <li key={tip} className="flex items-start gap-2 text-sm text-gray-400">
            <span className="mt-1.5 w-1 h-1 rounded-full bg-gray-500 shrink-0" />
            {tip}
          </li>
        ))}
      </ul>
      <button className="w-full mt-4 py-2.5 text-sm font-medium text-gray-300 border border-white/10 rounded-lg hover:bg-white/5">
        More Tips
      </button>
    </div>
  );
};

export default SafetyTipsCard;
