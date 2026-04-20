import { useParams, useNavigate } from 'react-router-dom';
import { sampleStudents, sampleMarks, sampleAttendance, sampleFees } from '../utils/seedData';
import { formatCurrency, formatDate, calculateGrade, getStatusBadge } from '../utils/helpers';
import { HiArrowLeft, HiMail, HiPhone, HiLocationMarker, HiCalendar, HiUser, HiIdentification, HiAcademicCap } from 'react-icons/hi';

export default function StudentProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const student = sampleStudents.find((s) => s.id === id);

  if (!student) {
    return (
      <div className="flex flex-col items-center justify-center py-32 animate-fade-in">
        <div className="w-24 h-24 rounded-full bg-slate-100 flex items-center justify-center mb-6">
          <HiUser className="text-slate-300" size={48} />
        </div>
        <h2 className="text-2xl font-extrabold text-slate-800 mb-2">Student Not Found</h2>
        <p className="text-slate-500 font-medium mb-8">The profile you requested does not exist or was deleted.</p>
        <button onClick={() => navigate('/students')} className="btn btn-primary shadow-lg shadow-indigo-200">
          <HiArrowLeft size={16} /> Return to Directory
        </button>
      </div>
    );
  }

  const studentMarks = sampleMarks.filter((m) => m.studentId === id);
  const studentAttendance = sampleAttendance.filter((a) => a.studentId === id);
  const studentFees = sampleFees.filter((f) => f.studentId === id);

  const totalMarks = studentMarks.reduce((sum, m) => sum + m.marksObtained, 0);
  const totalMax = studentMarks.reduce((sum, m) => sum + m.totalMarks, 0);
  const percentage = totalMax > 0 ? Math.round((totalMarks / totalMax) * 100) : 0;
  const { grade, color: gradeColor } = calculateGrade(percentage);

  const presentDays = studentAttendance.filter((a) => a.status === 'present').length;
  const totalDays = studentAttendance.length;
  const attendanceRate = totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 0;

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      {/* Navigation */}
      <div>
        <button
          onClick={() => navigate('/students')}
          className="btn btn-secondary bg-white/60 hover:bg-white text-xs font-bold"
        >
          <HiArrowLeft size={16} /> Back to Directory
        </button>
      </div>

      {/* Hero Profile Card */}
      <div className="card overflow-hidden shadow-xl shadow-indigo-900/5 border-none relative">
        <div className="h-44 bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50 mix-blend-overlay" />
        </div>

        <div className="px-6 pb-8 relative">
          <div className="flex flex-col md:flex-row gap-6 md:items-end -mt-16 mb-4">
            <div className="w-32 h-32 rounded-[2rem] bg-white shadow-2xl flex items-center justify-center text-4xl font-extrabold text-indigo-600 border-[6px] border-white z-10 flex-shrink-0">
              {student.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
            </div>
            <div className="flex-1 pb-2">
              <div className="flex flex-wrap items-center gap-3 mb-1">
                <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">{student.name}</h1>
                <span className={`badge ${getStatusBadge(student.status)} text-[0.7rem] px-3 shadow-sm`}>
                  {student.status}
                </span>
              </div>
              <p className="text-[0.95rem] font-bold text-slate-500">
                Identifier: #{student.rollNo} <span className="mx-2 text-slate-300">•</span> Class: {student.class}
              </p>
            </div>

            {/* Quick Stats Grid */}
            <div className="flex gap-4 pb-2 w-full md:w-auto overflow-x-auto">
              <div className="text-center px-6 py-3 rounded-2xl bg-gradient-to-br from-indigo-50 to-indigo-100/50 border border-indigo-100 shadow-sm flex-1 md:flex-none">
                <p className="text-2xl font-black text-indigo-700">{percentage}%</p>
                <p className="text-[0.7rem] text-indigo-500/70 font-bold uppercase tracking-widest mt-1">Average</p>
              </div>
              <div className="text-center px-6 py-3 rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100/50 border border-emerald-100 shadow-sm flex-1 md:flex-none">
                <p className="text-2xl font-black" style={{ color: gradeColor }}>{grade}</p>
                <p className="text-[0.7rem] text-emerald-500/70 font-bold uppercase tracking-widest mt-1">Grade</p>
              </div>
              <div className="text-center px-6 py-3 rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100/50 border border-amber-100 shadow-sm flex-1 md:flex-none">
                <p className="text-2xl font-black text-amber-600">{attendanceRate}%</p>
                <p className="text-[0.7rem] text-amber-500/70 font-bold uppercase tracking-widest mt-1">Presence</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Personal Details Panel */}
        <div className="card p-6 lg:col-span-1 border-t-4 border-t-indigo-400">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
              <HiIdentification className="text-indigo-600" size={24} />
            </div>
            <h3 className="text-[1.1rem] font-extrabold text-slate-800 tracking-tight">Identity Details</h3>
          </div>
          <div className="space-y-4">
            {[
              { icon: HiMail, label: 'Email Communication', value: student.email },
              { icon: HiPhone, label: 'Primary Contact', value: student.phone },
              { icon: HiUser, label: 'Gender', value: student.gender },
              { icon: HiCalendar, label: 'Date of Birth', value: formatDate(student.dob) },
              { icon: HiLocationMarker, label: 'Residential Address', value: student.address },
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0">
                  <item.icon className="text-slate-400" size={16} />
                </div>
                <div>
                  <p className="text-[0.7rem] font-bold text-slate-400 uppercase tracking-widest mb-0.5">{item.label}</p>
                  <p className="text-[0.95rem] font-semibold text-slate-800">{item.value || 'Not Disclosed'}</p>
                </div>
              </div>
            ))}

            <div className="mt-8 pt-6 border-t border-slate-100">
              <p className="text-[0.75rem] font-bold text-slate-400 uppercase tracking-widest mb-4">Guardian Information</p>
              <div className="bg-indigo-50/50 p-4 rounded-xl border border-indigo-100/50">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                    <HiUser className="text-indigo-600" size={16} />
                  </div>
                  <div>
                    <p className="text-[0.95rem] font-bold text-indigo-900">{student.parentName || 'Name unlisted'}</p>
                    <p className="text-[0.75rem] font-medium text-indigo-500/70">Legal Guardian</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 mt-3 pl-11">
                  <HiPhone className="text-indigo-400" size={14} />
                  <p className="text-sm font-semibold text-indigo-800">{student.parentPhone || 'No contact saved'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          {/* Academic Report Card */}
          <div className="card p-6 border-t-4 border-t-emerald-400">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                <HiAcademicCap className="text-emerald-600" size={24} />
              </div>
              <div>
                <h3 className="text-[1.1rem] font-extrabold text-slate-800 tracking-tight">Academic Performance</h3>
                <p className="text-[0.75rem] font-medium text-slate-400">Term examinations and cumulative score record</p>
              </div>
            </div>
            
            {studentMarks.length === 0 ? (
              <div className="bg-slate-50 border border-dashed border-slate-200 rounded-2xl py-12 text-center">
                <p className="text-slate-400 font-semibold">No performance data recorded yet</p>
              </div>
            ) : (
              <div className="overflow-x-auto rounded-xl border border-slate-100 shadow-sm">
                <table className="data-table w-full relative z-0">
                  <thead className="bg-slate-50/80">
                    <tr>
                      <th className="font-bold">Subject Module</th>
                      <th className="font-bold text-center">Procured</th>
                      <th className="font-bold text-center">Assay Max</th>
                      <th className="font-bold text-center">Score %</th>
                      <th className="font-bold text-center">Band</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {studentMarks.map((m) => {
                      const pct = Math.round((m.marksObtained / m.totalMarks) * 100);
                      const g = calculateGrade(pct);
                      return (
                        <tr key={m.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="font-bold text-slate-700">{m.subject}</td>
                          <td className="text-center font-bold text-slate-600">{m.marksObtained}</td>
                          <td className="text-center font-medium text-slate-400">{m.totalMarks}</td>
                          <td className="text-center">
                            <span className="font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md text-[0.8rem]">
                              {pct}%
                            </span>
                          </td>
                          <td className="text-center">
                            <span className={`font-black text-[0.95rem] inline-block px-3 py-0.5 rounded-md`} style={{ color: g.color, backgroundColor: `${g.color}15` }}>
                              {g.grade}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Ledger */}
          <div className="card p-6 border-t-4 border-t-amber-400">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
                <HiCalendar className="text-amber-600" size={24} />
              </div>
              <div>
                <h3 className="text-[1.1rem] font-extrabold text-slate-800 tracking-tight">Financial Ledger</h3>
                <p className="text-[0.75rem] font-medium text-slate-400">Transaction history and due balances</p>
              </div>
            </div>

            {studentFees.length === 0 ? (
              <div className="bg-slate-50 border border-dashed border-slate-200 rounded-2xl py-12 text-center">
                <p className="text-slate-400 font-semibold">No fiscal records present</p>
              </div>
            ) : (
              <div className="overflow-x-auto rounded-xl border border-slate-100 shadow-sm">
                <table className="data-table w-full">
                  <thead className="bg-slate-50/80">
                    <tr>
                      <th className="font-bold">Period</th>
                      <th className="font-bold">Description</th>
                      <th className="font-bold">Invoice Amt</th>
                      <th className="font-bold">Deadline</th>
                      <th className="font-bold text-right">Clearance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {studentFees.map((f) => (
                      <tr key={f.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="font-bold text-slate-700 text-sm whitespace-nowrap">{f.month}</td>
                        <td className="font-semibold text-slate-600 text-sm">{f.feeType}</td>
                        <td className="font-bold text-slate-800">{formatCurrency(f.amount)}</td>
                        <td className="font-medium text-slate-500 text-sm">{formatDate(f.dueDate)}</td>
                        <td className="text-right">
                          {f.status === 'paid' ? (
                            <div>
                              <span className="badge badge-success shadow-sm mb-1">{f.status}</span>
                              <p className="text-[0.65rem] font-bold text-slate-400">on {formatDate(f.paidDate)}</p>
                            </div>
                          ) : (
                            <span className={`badge ${getStatusBadge(f.status)} shadow-sm`}>
                              {f.status}
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
