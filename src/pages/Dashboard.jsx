import { useMemo } from 'react';
import { useAuth } from '../contexts/AuthContext';
import StatsCard from '../components/common/StatsCard';
import { sampleStudents, sampleTeachers, sampleClasses, sampleFees, sampleAttendance, sampleNotices } from '../utils/seedData';
import { formatCurrency, formatDate } from '../utils/helpers';
import {
  HiUserGroup,
  HiAcademicCap,
  HiCollection,
  HiCurrencyRupee,
  HiClipboardCheck,
  HiTrendingUp,
  HiClock,
} from 'react-icons/hi';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
  AreaChart, Area,
} from 'recharts';

export default function Dashboard() {
  const { userRole, userData } = useAuth();

  const stats = useMemo(() => {
    const totalStudents = sampleStudents.filter((s) => s.status === 'active').length;
    const totalTeachers = sampleTeachers.filter((t) => t.status === 'active').length;
    const totalClasses = sampleClasses.length;
    const totalFees = sampleFees.reduce((sum, f) => sum + f.amount, 0);
    const paidFees = sampleFees.filter((f) => f.status === 'paid').reduce((sum, f) => sum + f.amount, 0);
    const pendingFees = totalFees - paidFees;

    const todayAttendance = sampleAttendance.filter((a) => a.date === '2026-04-18');
    const presentCount = todayAttendance.filter((a) => a.status === 'present').length;
    const attendanceRate = todayAttendance.length > 0
      ? Math.round((presentCount / todayAttendance.length) * 100)
      : 0;

    return { totalStudents, totalTeachers, totalClasses, totalFees, paidFees, pendingFees, attendanceRate };
  }, []);

  // Chart data
  const attendanceChartData = [
    { day: 'Mon', present: 85, absent: 15 },
    { day: 'Tue', present: 90, absent: 10 },
    { day: 'Wed', present: 78, absent: 22 },
    { day: 'Thu', present: 92, absent: 8 },
    { day: 'Fri', present: 88, absent: 12 },
  ];

  const feeChartData = [
    { name: 'Paid', value: stats.paidFees, color: '#10b981' },
    { name: 'Pending', value: stats.pendingFees - 25000, color: '#f59e0b' },
    { name: 'Overdue', value: 25000, color: '#ef4444' },
  ];

  const enrollmentData = [
    { month: 'Jan', students: 280 },
    { month: 'Feb', students: 290 },
    { month: 'Mar', students: 295 },
    { month: 'Apr', students: 298 },
  ];

  const classDistribution = [
    { class: '8-A', students: 35 },
    { class: '8-B', students: 32 },
    { class: '9-A', students: 38 },
    { class: '9-B', students: 36 },
    { class: '10-A', students: 40 },
    { class: '10-B', students: 37 },
    { class: '11-Sci', students: 42 },
    { class: '11-Com', students: 38 },
  ];

  const CustomChartTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/90 backdrop-blur-md border border-slate-200/60 p-3 rounded-xl shadow-xl">
          <p className="text-[0.75rem] font-bold text-slate-800 mb-1">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-[0.8rem] font-medium" style={{ color: entry.color || entry.fill }}>
              {entry.name}: {entry.name === 'Paid' || entry.name === 'Pending' || entry.name === 'Overdue' 
                ? formatCurrency(entry.value) 
                : entry.name.includes('%') ? `${entry.value}%` : entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8 animate-fade-in pb-10">
      {/* Page Title */}
      <div className="page-header relative">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl -z-10" />
        <h1 className="gradient-text bg-gradient-to-r from-slate-800 to-indigo-800">
          Dashboard Overview
        </h1>
        <p>
          {userRole === 'admin'
            ? 'Complete analytical overview of institution metrics'
            : userRole === 'teacher'
            ? 'Your teaching & class analytical overview'
            : 'Your academic summary & performance'}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 stagger-children">
        <StatsCard
          title="Total Students"
          value={stats.totalStudents}
          icon={HiUserGroup}
          color="indigo"
          trend={{ positive: true, value: '+3.2%', label: 'last month' }}
        />
        <StatsCard
          title="Total Teachers"
          value={stats.totalTeachers}
          icon={HiAcademicCap}
          color="emerald"
          subtitle="7 active staff members"
        />
        <StatsCard
          title="Total Classes"
          value={stats.totalClasses}
          icon={HiCollection}
          color="violet"
          subtitle="Across all grades"
        />
        <StatsCard
          title="Attendance Rate"
          value={`${stats.attendanceRate}%`}
          icon={HiClipboardCheck}
          color="amber"
          trend={{ positive: stats.attendanceRate >= 80, value: `${stats.attendanceRate}%`, label: 'today' }}
        />
      </div>

      {/* Financial Stats (Admin only) */}
      {userRole === 'admin' && (
        <div className="card-gradient p-1 mb-8 animate-fade-in-up">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 bg-white/50 backdrop-blur-md rounded-[15px] p-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center">
                <HiCurrencyRupee className="text-indigo-600" size={24} />
              </div>
              <div>
                <p className="text-[0.7rem] font-bold text-slate-500 uppercase tracking-widest">Total Revenue</p>
                <p className="text-xl font-extrabold text-slate-800 mt-0.5">{formatCurrency(stats.totalFees)}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center">
                <HiTrendingUp className="text-emerald-600" size={24} />
              </div>
              <div>
                <p className="text-[0.7rem] font-bold text-slate-500 uppercase tracking-widest">Collected</p>
                <p className="text-xl font-extrabold text-slate-800 mt-0.5">{formatCurrency(stats.paidFees)}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 flex items-center justify-center">
                <HiClock className="text-rose-600" size={24} />
              </div>
              <div>
                <p className="text-[0.7rem] font-bold text-slate-500 uppercase tracking-widest">Pending</p>
                <p className="text-xl font-extrabold text-slate-800 mt-0.5">{formatCurrency(stats.pendingFees)}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        {/* Attendance Chart */}
        <div className="card p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-[1.05rem] font-extrabold text-slate-800">Attendance Overview</h3>
              <p className="text-xs font-medium text-slate-400 mt-1">Weekly student presence vs absence</p>
            </div>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={attendanceChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#94a3b8', fontWeight: 600 }} axisLine={false} tickLine={false} dy={10} />
                <YAxis tick={{ fontSize: 12, fill: '#94a3b8', fontWeight: 600 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomChartTooltip />} cursor={{ fill: 'rgba(241, 245, 249, 0.4)' }} />
                <Bar dataKey="present" fill="#6366f1" radius={[6, 6, 6, 6]} name="Present %" barSize={32} />
                <Bar dataKey="absent" fill="#e2e8f0" radius={[6, 6, 6, 6]} name="Absent %" barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Fee Distribution or Enrollment Trend */}
        {userRole === 'admin' ? (
          <div className="card p-6 relative overflow-hidden">
            <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="mb-2">
              <h3 className="text-[1.05rem] font-extrabold text-slate-800">Fee Collection Status</h3>
              <p className="text-xs font-medium text-slate-400 mt-1">Distribution of overall institution fees</p>
            </div>
            <div className="h-72 w-full relative z-10">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                  <Pie
                    data={feeChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={75}
                    outerRadius={105}
                    paddingAngle={6}
                    dataKey="value"
                    stroke="none"
                    cornerRadius={8}
                  >
                    {feeChartData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomChartTooltip />} />
                  <Legend 
                    wrapperStyle={{ fontSize: '12px', fontWeight: 600, color: '#64748b' }} 
                    iconType="circle"
                    verticalAlign="bottom"
                    height={36}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        ) : (
          <div className="card p-6">
            <div className="mb-6">
              <h3 className="text-[1.05rem] font-extrabold text-slate-800">Enrollment Trend</h3>
              <p className="text-xs font-medium text-slate-400 mt-1">Monthly student enrollment trajectory</p>
            </div>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={enrollmentData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="enrollmentGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8', fontWeight: 600 }} axisLine={false} tickLine={false} dy={10} />
                  <YAxis tick={{ fontSize: 12, fill: '#94a3b8', fontWeight: 600 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomChartTooltip />} />
                  <Area type="monotone" dataKey="students" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#enrollmentGrad)" name="Students" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        {/* Class Distribution */}
        <div className="card p-6">
          <div className="mb-6">
            <h3 className="text-[1.05rem] font-extrabold text-slate-800">Capacity by Class</h3>
            <p className="text-xs font-medium text-slate-400 mt-1">Number of enrolled students per section</p>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={classDistribution} layout="vertical" margin={{ top: 0, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 12, fill: '#94a3b8', fontWeight: 600 }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="class" tick={{ fontSize: 12, fill: '#64748b', fontWeight: 700 }} axisLine={false} tickLine={false} width={60} />
                <Tooltip content={<CustomChartTooltip />} cursor={{ fill: 'rgba(241, 245, 249, 0.4)' }} />
                <Bar dataKey="students" fill="url(#classDistributionGrad)" radius={[0, 6, 6, 0]} barSize={20} name="Students">
                  {classDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#8b5cf6' : '#a78bfa'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Notices */}
        <div className="card p-0 overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="text-[1.05rem] font-extrabold text-slate-800">Notice Board</h3>
              <p className="text-xs font-medium text-slate-400 mt-1">Latest announcements</p>
            </div>
            <button className="text-xs font-bold text-indigo-600 hover:text-indigo-800 uppercase tracking-widest transition-colors">
              View All
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">
            <div className="divide-y divide-slate-100">
              {sampleNotices.slice(0, 4).map((notice) => (
                <div
                  key={notice.id}
                  className="p-5 flex gap-4 hover:bg-slate-50/80 transition-colors group cursor-pointer"
                >
                  <div className={`w-1.5 rounded-full flex-shrink-0 transition-all group-hover:h-full h-8 mt-1 ${
                    notice.priority === 'high' ? 'bg-rose-500' : 
                    notice.priority === 'medium' ? 'bg-amber-500' : 'bg-emerald-500'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-[0.95rem] font-bold text-slate-800 truncate mb-1 group-hover:text-indigo-600 transition-colors">
                      {notice.title}
                    </h4>
                    <p className="text-[0.8rem] text-slate-500 line-clamp-1 mb-2">
                      {notice.content}
                    </p>
                    <div className="flex items-center gap-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[0.65rem] font-bold uppercase tracking-wider ${
                        notice.priority === 'high' ? 'bg-rose-100 text-rose-700' : 
                        notice.priority === 'medium' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                      }`}>
                        {notice.category}
                      </span>
                      <span className="text-[0.7rem] font-medium text-slate-400 flex items-center gap-1">
                        📅 {formatDate(notice.date)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
