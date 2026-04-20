import { useState } from 'react';
import { sampleStudents, sampleMarks } from '../utils/seedData';
import { CLASSES, SUBJECTS, calculateGrade } from '../utils/helpers';
import { HiDocumentReport, HiPlus, HiPencil, HiTrash, HiAcademicCap } from 'react-icons/hi';
import DataTable from '../components/common/DataTable';
import Modal from '../components/common/Modal';
import ConfirmDialog from '../components/common/ConfirmDialog';
import toast from 'react-hot-toast';

export default function Marks() {
  const [activeTab, setActiveTab] = useState('results');
  const [marks, setMarks] = useState(sampleMarks);
  
  const [search, setSearch] = useState('');
  const [filterClass, setFilterClass] = useState('');
  const [filterExam, setFilterExam] = useState('');

  const [modalOpen, setModalOpen] = useState(false);
  const [editMark, setEditMark] = useState(null);
  const [form, setForm] = useState({
    studentId: '', examType: 'Mid Term', subject: '', marksObtained: '', totalMarks: '100', date: ''
  });
  const [errors, setErrors] = useState({});
  const [deleteConfirm, setDeleteConfirm] = useState({ open: false, id: null });

  const exams = ['Mid Term', 'Final Term', 'Unit Test 1', 'Unit Test 2'];
  const activeStudents = sampleStudents.filter(s => s.status === 'active');

  const filtered = marks.filter((m) => {
    const student = sampleStudents.find(s => s.id === m.studentId);
    if (!student) return false;
    const matchSearch = student.name.toLowerCase().includes(search.toLowerCase());
    const matchClass = filterClass ? student.class === filterClass : true;
    const matchExam = filterExam ? m.examType === filterExam : true;
    return matchSearch && matchClass && matchExam;
  });

  const enrichedData = filtered.map(m => {
    const student = sampleStudents.find(s => s.id === m.studentId);
    return { ...m, studentName: student?.name, class: student?.class, rollNo: student?.rollNo };
  });

  function openAdd() {
    setEditMark(null);
    setForm({ studentId: '', examType: 'Mid Term', subject: '', marksObtained: '', totalMarks: '100', date: new Date().toISOString().split('T')[0] });
    setErrors({});
    setModalOpen(true);
  }

  function openEdit(mark) {
    setEditMark(mark);
    setForm({ ...mark, marksObtained: String(mark.marksObtained), totalMarks: String(mark.totalMarks) });
    setErrors({});
    setModalOpen(true);
  }

  function validate() {
    const errs = {};
    if (!form.studentId) errs.studentId = 'Required';
    if (!form.subject) errs.subject = 'Required';
    if (!form.marksObtained || Number(form.marksObtained) > Number(form.totalMarks) || Number(form.marksObtained) < 0) {
      errs.marksObtained = 'Invalid marks';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleSave() {
    if (!validate()) return;
    if (editMark) {
      setMarks(prev => prev.map(m => m.id === editMark.id ? { ...m, ...form, marksObtained: Number(form.marksObtained), totalMarks: Number(form.totalMarks) } : m));
      toast.success('Mark updated');
    } else {
      setMarks(prev => [...prev, { ...form, id: 'M' + Date.now(), marksObtained: Number(form.marksObtained), totalMarks: Number(form.totalMarks) }]);
      toast.success('Mark added');
    }
    setModalOpen(false);
  }

  function handleDelete(id) {
    setMarks(prev => prev.filter(m => m.id !== id));
    toast.success('Record deleted');
  }

  const columns = [
    {
      key: 'student',
      label: 'Student Record',
      render: (row) => (
        <div className="flex items-center gap-4 py-1 group">
          <div className="avatar avatar-sm avatar-indigo group-hover:scale-110 transition-transform">
            {row.studentName?.split(' ').map(n => n[0]).join('').slice(0, 2)}
          </div>
          <div>
            <p className="font-bold text-slate-800 text-[0.95rem]">{row.studentName}</p>
            <p className="text-[0.75rem] font-medium text-slate-400">ID #{row.rollNo} • {row.class}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'examDetails',
      label: 'Assessment Specs',
      render: (row) => (
        <div>
          <p className="font-bold text-slate-700">{row.subject}</p>
          <p className="text-[0.75rem] font-medium text-indigo-500 bg-indigo-50 px-2 rounded w-fit mt-1">{row.examType}</p>
        </div>
      ),
    },
    {
      key: 'score',
      label: 'Performance Base',
      render: (row) => (
        <div className="flex items-end gap-1">
          <span className="font-extrabold text-slate-800 text-lg">{row.marksObtained}</span>
          <span className="text-sm font-medium text-slate-400 mb-0.5">/ {row.totalMarks}</span>
        </div>
      )
    },
    {
      key: 'metrics',
      label: 'Metrics',
      render: (row) => {
        const pct = Math.round((row.marksObtained / row.totalMarks) * 100);
        const { grade, color } = calculateGrade(pct);
        return (
          <div className="flex items-center gap-3">
            <span className="font-black text-[0.95rem] inline-block w-8 text-center" style={{ color }}>{grade}</span>
            <div className="w-16 h-2 rounded-full bg-slate-100 overflow-hidden relative">
              <div className="absolute top-0 left-0 h-full rounded-full transition-all duration-1000" style={{ width: `${pct}%`, backgroundColor: color }} />
            </div>
          </div>
        );
      }
    },
    {
      key: 'actions',
      label: 'Modify',
      render: (row) => (
        <div className="flex gap-2">
          <button onClick={() => openEdit(row)} className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-indigo-600 hover:border-indigo-300 shadow-sm transition-all">
            <HiPencil size={14} />
          </button>
          <button onClick={() => setDeleteConfirm({ open: true, id: row.id })} className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-rose-600 hover:border-rose-300 shadow-sm transition-all">
            <HiTrash size={14} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      <div className="page-header relative flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="absolute top-0 right-1/4 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl -z-10" />
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Academic Grading</h1>
          <p className="text-sm font-medium text-slate-500 mt-1">Manage institutional examination configurations and marks</p>
        </div>

        <div className="flex gap-2">
          <select className="form-select bg-white/60 shadow-sm text-sm py-1.5" value={filterClass} onChange={(e) => setFilterClass(e.target.value)}>
            <option value="">Any Class Level</option>
            {CLASSES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <select className="form-select bg-white/60 shadow-sm text-sm py-1.5" value={filterExam} onChange={(e) => setFilterExam(e.target.value)}>
            <option value="">Any Exam Sequence</option>
            {exams.map(e => <option key={e} value={e}>{e}</option>)}
          </select>
        </div>
      </div>

      <div className="tab-bar">
        <button className={`tab-btn ${activeTab === 'results' ? 'active' : ''}`} onClick={() => setActiveTab('results')}>
          <HiDocumentReport size={18} /> Performance Logs
        </button>
        <button className={`tab-btn ${activeTab === 'exams' ? 'active' : ''}`} onClick={() => setActiveTab('exams')}>
          <HiAcademicCap size={18} /> Examination Schemas
        </button>
      </div>

      {activeTab === 'results' ? (
        <div className="animate-fade-in-up">
          <DataTable
            columns={columns}
            data={enrichedData}
            searchValue={search}
            onSearchChange={setSearch}
            searchPlaceholder="Search performance metrics by student..."
            actions={
              <button onClick={openAdd} className="btn btn-primary shadow-md w-full sm:w-auto">
                <HiPlus size={18} /> Log Achievement
              </button>
            }
          />
        </div>
      ) : (
        <div className="card text-center py-20 animate-fade-in-up">
          <div className="w-20 h-20 bg-indigo-50 text-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-xl">
            <HiAcademicCap size={32} />
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-2">Examination Structures Database</h2>
          <p className="text-slate-500 max-w-md mx-auto mb-6">Create comprehensive test plans, set schedules, format rubrics, and align with central curricular directives.</p>
          <button className="btn btn-primary shadow-lg mx-auto">Design New Matrix Layout</button>
        </div>
      )}

      {/* Add/Edit Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editMark ? 'Revise Metric Data' : 'New Performance Log'}>
        <div className="space-y-5">
          {!editMark && (
            <div className="form-group">
              <label className="form-label">Student Identification Profile *</label>
              <select className={`form-select ${errors.studentId ? 'error' : ''}`} value={form.studentId} onChange={(e) => setForm({ ...form, studentId: e.target.value })}>
                <option value="">Select Primary Candidate</option>
                {activeStudents.map(s => (
                  <option key={s.id} value={s.id}>{s.name} ({s.class} - #{s.rollNo})</option>
                ))}
              </select>
              {errors.studentId && <p className="form-error">{errors.studentId}</p>}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="form-group">
              <label className="form-label">Assessment Archetype</label>
              <select className="form-select" value={form.examType} onChange={(e) => setForm({ ...form, examType: e.target.value })}>
                {exams.map(e => <option key={e} value={e}>{e}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Curricular Domain *</label>
              <select className={`form-select ${errors.subject ? 'error' : ''}`} value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}>
                <option value="">Selection List</option>
                {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="form-group">
              <label className="form-label">Procured Evaluation *</label>
              <input type="number" className={`form-input focus:bg-emerald-50 focus:border-emerald-300 font-extrabold text-lg text-emerald-700 ${errors.marksObtained ? 'error' : ''}`} value={form.marksObtained} onChange={(e) => setForm({ ...form, marksObtained: e.target.value })} placeholder="e.g. 85" />
              {errors.marksObtained && <p className="form-error">{errors.marksObtained}</p>}
            </div>
            <div className="form-group">
              <label className="form-label">Absolute Maximum</label>
              <input type="number" className="form-input text-lg font-bold" value={form.totalMarks} onChange={(e) => setForm({ ...form, totalMarks: e.target.value })} />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Log Generation Date</label>
            <input type="date" className="form-input" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
          </div>
        </div>

        <div className="modal-footer -mx-6 -mb-6 mt-8">
          <button onClick={() => setModalOpen(false)} className="btn btn-secondary">Discard Formulation</button>
          <button onClick={handleSave} className="btn btn-primary">{editMark ? 'Patch Assessment' : 'Solidify Assessment'}</button>
        </div>
      </Modal>

      <ConfirmDialog
        isOpen={deleteConfirm.open}
        onClose={() => setDeleteConfirm({ open: false, id: null })}
        onConfirm={() => handleDelete(deleteConfirm.id)}
        title="Burn Evaluation Data"
        message="Erasing this achievement log is permanent. Once completed, no restorative functions are capable of mitigating this destructive action."
      />
    </div>
  );
}
