import { useState, useMemo } from 'react';
import { sampleStudents, sampleAttendance } from '../utils/seedData';
import { CLASSES, getStatusBadge } from '../utils/helpers';
import { HiClipboardCheck, HiDownload, HiCalendar } from 'react-icons/hi';
import toast from 'react-hot-toast';

export default function Attendance() {
  const [attendance, setAttendance] = useState(sampleAttendance);
  const [selectedClass, setSelectedClass] = useState('10-A');
  const [selectedDate, setSelectedDate] = useState('2026-04-18');
  const [markingMode, setMarkingMode] = useState(false);
  const [tempAttendance, setTempAttendance] = useState({});

  const classStudents = sampleStudents.filter((s) => s.class === selectedClass && s.status === 'active');

  const dayAttendance = useMemo(() => {
    return attendance.filter((a) => a.class === selectedClass && a.date === selectedDate);
  }, [attendance, selectedClass, selectedDate]);

  // Stats
  const presentCount = dayAttendance.filter((a) => a.status === 'present').length;
  const absentCount = dayAttendance.filter((a) => a.status === 'absent').length;
  const lateCount = dayAttendance.filter((a) => a.status === 'late').length;
  const totalMarked = dayAttendance.length;
  const attendanceRate = totalMarked > 0 ? Math.round((presentCount / totalMarked) * 100) : 0;

  function startMarking() {
    const existing = {};
    dayAttendance.forEach((a) => {
      existing[a.studentId] = a.status;
    });
    classStudents.forEach((s) => {
      if (!existing[s.id]) existing[s.id] = 'present';
    });
    setTempAttendance(existing);
    setMarkingMode(true);
  }

  function saveAttendance() {
    const newRecords = [];
    const existingIds = new Set(dayAttendance.map((a) => a.studentId));

    Object.entries(tempAttendance).forEach(([studentId, status]) => {
      const student = sampleStudents.find((s) => s.id === studentId);
      if (!student) return;

      if (existingIds.has(studentId)) {
        // Update existing
        setAttendance((prev) =>
          prev.map((a) =>
            a.studentId === studentId && a.date === selectedDate && a.class === selectedClass
              ? { ...a, status }
              : a
          )
        );
      } else {
        newRecords.push({
          id: 'ATT' + Date.now() + studentId,
          studentId,
          studentName: student.name,
          class: selectedClass,
          date: selectedDate,
          status,
        });
      }
    });

    if (newRecords.length > 0) {
      setAttendance((prev) => [...prev, ...newRecords]);
    }

    setMarkingMode(false);
    toast.success('Attendance saved successfully');
  }

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      {/* Page Title */}
      <div className="page-header relative">
        <div className="absolute top-0 right-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -z-10" />
        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
          Daily Attendance
        </h1>
        <p className="text-sm font-medium text-slate-500 mt-1">
          Monitor and record student presence efficiently
        </p>
      </div>

      {/* Control Panel */}
      <div className="card p-5 relative overflow-hidden z-10">
        <div className="absolute top-0 right-0 w-64 h-full bg-gradient-to-l from-indigo-50/50 to-transparent -z-10" />
        
        <div className="flex flex-col sm:flex-row gap-5 items-end justify-between">
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <div className="form-group mb-0 w-full sm:w-48">
              <label className="form-label">Select Class</label>
              <select
                className="form-select bg-white/60 shadow-sm"
                value={selectedClass}
                onChange={(e) => { setSelectedClass(e.target.value); setMarkingMode(false); }}
              >
                {CLASSES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            
            <div className="form-group mb-0 w-full sm:w-48">
              <label className="form-label">Date</label>
              <div className="relative">
                <input
                  type="date"
                  className="form-input bg-white/60 shadow-sm pl-10"
                  value={selectedDate}
                  onChange={(e) => { setSelectedDate(e.target.value); setMarkingMode(false); }}
                />
                <HiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              </div>
            </div>
          </div>
          
          <div className="flex gap-3 w-full sm:w-auto mt-4 sm:mt-0">
            {!markingMode ? (
              <>
                <button className="btn btn-secondary w-full sm:w-auto">
                  <HiDownload size={16} /> Export
                </button>
                <button onClick={startMarking} className="btn btn-primary w-full sm:w-auto shadow-md">
                  <HiClipboardCheck size={18} /> Mark Register
                </button>
              </>
            ) : (
              <>
                <button onClick={() => setMarkingMode(false)} className="btn btn-secondary w-full sm:w-auto">
                  Cancel
                </button>
                <button onClick={saveAttendance} className="btn btn-success w-full sm:w-auto shadow-md">
                  <HiClipboardCheck size={18} /> Save Records
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Snapshot Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in-up">
        {[
          { label: 'Present Today', value: presentCount, raw: totalMarked, color: 'emerald', bg: 'from-emerald-50 to-emerald-100/50', text: 'text-emerald-700' },
          { label: 'Absent Today', value: absentCount, raw: totalMarked, color: 'rose', bg: 'from-rose-50 to-rose-100/50', text: 'text-rose-700' },
          { label: 'Late Arrivals', value: lateCount, raw: totalMarked, color: 'amber', bg: 'from-amber-50 to-amber-100/50', text: 'text-amber-700' },
          { label: 'Overall Rate', value: `${attendanceRate}%`, raw: false, color: 'indigo', bg: 'from-indigo-50 to-indigo-100/50', text: 'text-indigo-700' },
        ].map((stat) => (
          <div key={stat.label} className={`p-5 rounded-2xl bg-gradient-to-br ${stat.bg} border border-white shadow-sm relative overflow-hidden group`}>
            <div className={`absolute -right-4 -top-4 w-16 h-16 rounded-full bg-${stat.color}-500/10 group-hover:scale-150 transition-transform duration-500`} />
            <p className="text-[0.7rem] font-bold text-slate-500 uppercase tracking-widest relative z-10">{stat.label}</p>
            <div className="flex items-end gap-2 mt-1 relative z-10">
              <p className={`text-3xl font-extrabold tracking-tight ${stat.text}`}>{stat.value}</p>
              {stat.raw !== false && (
                <p className="text-sm font-medium text-slate-400 mb-1">/ {stat.raw}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Roster Table */}
      <div className="card overflow-visible relative animate-fade-in-up z-0">
        <div className="overflow-x-auto rounded-xl">
          <table className="data-table min-w-full">
            <thead>
              <tr className="bg-slate-50/80">
                <th className="w-24">Roll No</th>
                <th>Student Roster</th>
                <th className="w-32">Status</th>
                {markingMode && <th className="w-64">Action</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {classStudents.map((student) => {
                const record = dayAttendance.find((a) => a.studentId === student.id);
                const currentStatus = markingMode
                  ? tempAttendance[student.id] || 'present'
                  : record?.status || '—';

                return (
                  <tr key={student.id} className="hover:bg-slate-50/50 group">
                    <td className="font-bold text-slate-500 text-sm">
                      #{student.rollNo}
                    </td>
                    <td>
                      <div className="flex items-center gap-4 py-1">
                        <div className="avatar avatar-md avatar-indigo">
                          {student.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                        </div>
                        <div>
                          <span className="font-bold text-slate-800 text-[0.95rem] group-hover:text-indigo-600 transition-colors">
                            {student.name}
                          </span>
                          {/* Could add parent contact or something here if we wanted */}
                        </div>
                      </div>
                    </td>
                    <td>
                      {currentStatus === '—' ? (
                        <div className="flex items-center gap-1.5 text-slate-300">
                          <div className="w-2 h-2 rounded-full bg-slate-200" />
                          <span className="text-[0.75rem] font-medium uppercase tracking-wider">Unmarked</span>
                        </div>
                      ) : (
                        <span className={`badge ${getStatusBadge(currentStatus)} shadow-sm`}>
                          {currentStatus}
                        </span>
                      )}
                    </td>
                    {markingMode && (
                      <td>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setTempAttendance(prev => ({ ...prev, [student.id]: 'present' }))}
                            className={`attendance-btn w-full ${tempAttendance[student.id] === 'present' ? 'selected-present' : 'unselected'}`}
                          >
                            Present
                          </button>
                          <button
                            onClick={() => setTempAttendance(prev => ({ ...prev, [student.id]: 'absent' }))}
                            className={`attendance-btn w-full ${tempAttendance[student.id] === 'absent' ? 'selected-absent' : 'unselected'}`}
                          >
                            Absent
                          </button>
                          <button
                            onClick={() => setTempAttendance(prev => ({ ...prev, [student.id]: 'late' }))}
                            className={`attendance-btn w-full ${tempAttendance[student.id] === 'late' ? 'selected-late' : 'unselected'}`}
                          >
                            Late
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                );
              })}
              {classStudents.length === 0 && (
                <tr>
                  <td colSpan={markingMode ? 4 : 3} className="text-center py-20">
                    <div className="flex flex-col items-center opacity-40">
                      <HiClipboardCheck size={48} className="mb-3" />
                      <p className="text-lg font-bold">No students found</p>
                      <p className="text-sm">There are no active students in {selectedClass}.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
