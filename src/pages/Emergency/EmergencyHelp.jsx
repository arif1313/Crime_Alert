import { FiAlertTriangle, FiHeart, FiMapPin, FiPhoneCall, FiShield } from "react-icons/fi";

const helplines = [
  { label: "National emergency", number: "999", note: "Police, fire and ambulance", accent: "bg-red-600" },
  { label: "Women and child support", number: "109", note: "Confidential assistance", accent: "bg-rose-500" },
  { label: "Disaster helpline", number: "16123", note: "Weather and disaster support", accent: "bg-blue-600" },
];

const EmergencyHelp = () => (
  <main className="min-h-screen bg-[#f6f7f9] px-4 py-8 text-slate-900 sm:px-8 lg:px-12">
    <div className="mx-auto max-w-6xl">
      <section className="relative overflow-hidden rounded-3xl bg-slate-950 p-7 text-white shadow-2xl sm:p-10">
        <div className="relative z-10 max-w-2xl"><span className="inline-flex items-center gap-2 rounded-full border border-red-400/30 bg-red-500/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-red-300"><FiAlertTriangle /> Emergency centre</span><h1 className="mt-5 text-4xl font-black tracking-tight sm:text-5xl">Help is closer than you think.</h1><p className="mt-4 max-w-lg leading-7 text-slate-300">Call the right service immediately, share your location with someone you trust, and move to a visible, populated place.</p></div><FiShield className="absolute -right-4 -top-8 h-64 w-64 text-white/[0.04]" />
      </section>
      <div className="mt-7 grid gap-5 md:grid-cols-3">{helplines.map((item) => <a key={item.number} href={`tel:${item.number}`} className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"><div className={`mb-7 flex h-12 w-12 items-center justify-center rounded-xl text-white ${item.accent}`}><FiPhoneCall className="text-xl" /></div><p className="text-sm font-semibold text-slate-500">{item.label}</p><p className="mt-1 text-3xl font-black text-slate-950">{item.number}</p><p className="mt-2 text-sm text-slate-500">{item.note}</p><span className="mt-5 inline-flex text-sm font-bold text-red-600 group-hover:underline">Call now</span></a>)}</div>
      <section className="mt-7 grid gap-5 md:grid-cols-2"><div className="rounded-2xl border border-slate-200 bg-white p-6"><FiMapPin className="text-2xl text-red-600" /><h2 className="mt-4 text-xl font-bold">Share your location</h2><p className="mt-2 text-sm leading-6 text-slate-500">Use the Share Location action on your dashboard to send a live map link to a trusted contact.</p></div><div className="rounded-2xl border border-slate-200 bg-white p-6"><FiHeart className="text-2xl text-red-600" /><h2 className="mt-4 text-xl font-bold">When you are unsafe</h2><p className="mt-2 text-sm leading-6 text-slate-500">Stay in a well-lit public place, keep your phone charged, and avoid confronting a suspected offender.</p></div></section>
    </div>
  </main>
);

export default EmergencyHelp;
