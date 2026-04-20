import { getInitials } from '../../utils/helpers';

export default function StatsCard({ title, value, icon: Icon, color, trend, subtitle }) {
  const colorMap = {
    indigo: { bg: 'bg-indigo-50/80', text: 'text-indigo-600', icon: 'bg-indigo-100/80 text-indigo-600 shadow-indigo-200' },
    emerald: { bg: 'bg-emerald-50/80', text: 'text-emerald-600', icon: 'bg-emerald-100/80 text-emerald-600 shadow-emerald-200' },
    amber: { bg: 'bg-amber-50/80', text: 'text-amber-600', icon: 'bg-amber-100/80 text-amber-600 shadow-amber-200' },
    rose: { bg: 'bg-rose-50/80', text: 'text-rose-600', icon: 'bg-rose-100/80 text-rose-600 shadow-rose-200' },
    sky: { bg: 'bg-sky-50/80', text: 'text-sky-600', icon: 'bg-sky-100/80 text-sky-600 shadow-sky-200' },
    violet: { bg: 'bg-violet-50/80', text: 'text-violet-600', icon: 'bg-violet-100/80 text-violet-600 shadow-violet-200' },
  };

  const c = colorMap[color] || colorMap.indigo;

  return (
    <div className="stats-card group">
      <div className="flex items-start justify-between relative z-10">
        <div className="flex-1">
          <p className="text-[0.7rem] font-bold text-slate-500 uppercase tracking-[0.06em] mb-1">
            {title}
          </p>
          <p className="text-3xl font-extrabold text-slate-800 tracking-tight leading-none mt-2">
            {value}
          </p>
          {subtitle && (
            <p className="text-[0.75rem] font-medium text-slate-400 mt-2">{subtitle}</p>
          )}
        </div>
        <div
          className={`w-12 h-12 rounded-2xl ${c.icon} flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-sm`}
        >
          {Icon && <Icon size={24} />}
        </div>
      </div>
      {trend && (
        <div className="mt-4 flex items-center gap-1.5 relative z-10">
          <span
            className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded-md text-[0.7rem] font-bold ${
              trend.positive ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
            }`}
          >
            {trend.positive ? '↑' : '↓'} {trend.value}
          </span>
          <span className="text-[0.7rem] font-medium text-slate-400">vs {trend.label}</span>
        </div>
      )}
    </div>
  );
}
