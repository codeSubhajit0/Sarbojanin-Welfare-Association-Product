import { IconType } from "react-icons";

export type Stat = {
  icon: IconType;
  value: string;
  label: string;
};

export default function StatBar({ stats }: { stats: Stat[] }) {
  return (
    <div className="bg-forest text-white rounded-2xl">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-8 px-8 py-10">
        {stats.map((s, i) => (
          <div key={i} className="flex items-center gap-3">
            <span className="text-gold shrink-0">
              <s.icon size={26} />
            </span>
            <div>
              <p className="font-serif text-xl font-bold leading-none">{s.value}</p>
              <p className="text-xs text-white/70 mt-1.5 leading-snug">{s.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
