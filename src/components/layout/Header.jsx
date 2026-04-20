import { useAuth } from '../../contexts/AuthContext';
import { getInitials } from '../../utils/helpers';
import { HiMenuAlt2, HiBell } from 'react-icons/hi';

export default function Header({ onMenuClick }) {
  const { userData, userRole } = useAuth();

  const roleBadge = {
    admin: { label: 'Administrator', color: 'bg-indigo-100 text-indigo-700 ring-indigo-200' },
    teacher: { label: 'Teacher', color: 'bg-emerald-100 text-emerald-700 ring-emerald-200' },
    student: { label: 'Student', color: 'bg-amber-100 text-amber-700 ring-amber-200' },
  };

  const badge = roleBadge[userRole] || roleBadge.admin;

  return (
    <header className="h-[72px] bg-white/80 backdrop-blur-xl border-b border-slate-200/60 flex items-center justify-between px-4 sm:px-6 lg:px-8 sticky top-0 z-20 shadow-sm transition-all">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100 hover:text-indigo-600 transition-all shadow-sm"
        >
          <HiMenuAlt2 size={22} />
        </button>
        <div className="hidden sm:block">
          <h2 className="text-lg font-bold text-slate-800">
            Welcome back, {userData?.name?.split(' ')[0] || 'User'} 👋
          </h2>
          <p className="text-sm text-slate-500 font-medium">
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-5">
        {/* Notification bell */}
        <button className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 transition-all shadow-sm relative">
          <HiBell size={20} />
          <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-rose-500 border-2 border-white rounded-full animate-pulse" />
        </button>

        <div className="h-8 w-px bg-slate-200 hidden sm:block"></div>

        <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-full pl-3 pr-1 py-1 shadow-sm">
          {/* Role badge */}
          <div className="hidden sm:flex flex-col items-end mr-2">
            <span className="text-sm font-bold text-slate-700 leading-tight">
              {userData?.name || 'User'}
            </span>
            <span className={`text-[0.65rem] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ring-1 mt-0.5 ${badge.color}`}>
              {badge.label}
            </span>
          </div>

          {/* Avatar */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center text-white text-sm font-bold shadow-md shadow-indigo-200 ring-2 ring-white cursor-pointer hover:scale-105 transition-transform">
            {getInitials(userData?.name)}
          </div>
        </div>
      </div>
    </header>
  );
}
