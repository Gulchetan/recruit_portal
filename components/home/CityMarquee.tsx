const cities = [
  "Bengaluru",
  "Mumbai",
  "Chennai",
  "Hyderabad",
  "Delhi NCR",
  "Pune",
  "Kolkata",
  "Ahmedabad",
  "Jaipur",
  "Hosur",
];

export function CityMarquee() {
  const row = [...cities, ...cities];
  return (
    <div className="overflow-hidden border-y border-slate-200 bg-white py-4">
      <div className="tb-marquee flex w-max gap-10 whitespace-nowrap text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
        {row.map((c, i) => (
          <span key={`${c}-${i}`} className="flex items-center gap-10">
            {c}
            <span className="h-1 w-1 rounded-full bg-gold" />
          </span>
        ))}
      </div>
    </div>
  );
}
