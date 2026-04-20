import { useState } from 'react';
import DataTable from '../components/common/DataTable';
import Modal from '../components/common/Modal';
import ConfirmDialog from '../components/common/ConfirmDialog';
import { sampleTeachers } from '../utils/seedData';
import { CLASSES, SUBJECTS, getStatusBadge } from '../utils/helpers';
import { HiPlus, HiPencil, HiTrash, HiFilter } from 'react-icons/hi';
import toast from 'react-hot-toast';

export default function Teachers() {
  const [teachers, setTeachers] = useState(sampleTeachers);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editTeacher, setEditTeacher] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState({ open: false, id: null });

  const [form, setForm] = useState({
    name: '', email: '', phone: '', gender: 'Male',
    qualification: '', experience: '', subjects: [],
    assignedClasses: [], salary: '', joiningDate: '', status: 'active',
  });
  const [errors, setErrors] = useState({});

  const filtered = teachers.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.email.toLowerCase().includes(search.toLowerCase()) ||
    t.subjects.some((s) => s.toLowerCase().includes(search.toLowerCase()))
  );

  function openAdd() {
    setEditTeacher(null);
    setForm({
      name: '', email: '', phone: '', gender: 'Male',
      qualification: '', experience: '', subjects: [],
      assignedClasses: [], salary: '', joiningDate: '', status: 'active',
    });
    setErrors({});
    setModalOpen(true);
  }

  function openEdit(teacher) {
    setEditTeacher(teacher);
    setForm({ ...teacher, salary: String(teacher.salary) });
    setErrors({});
    setModalOpen(true);
  }

  function validate() {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    if (!form.phone.trim()) errs.phone = 'Phone is required';
    if (!form.qualification.trim()) errs.qualification = 'Qualification is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function toggleArrayItem(arr, item) {
    return arr.includes(item) ? arr.filter((i) => i !== item) : [...arr, item];
  }

  function handleSave() {
    if (!validate()) return;
    if (editTeacher) {
      setTeachers((prev) =>
        prev.map((t) =>
          t.id === editTeacher.id ? { ...t, ...form, salary: Number(form.salary) } : t
        )
      );
      toast.success('Teacher updated successfully');
    } else {
      const newTeacher = {
        ...form,
        id: 'TCH' + Date.now(),
        salary: Number(form.salary),
      };
      setTeachers((prev) => [...prev, newTeacher]);
      toast.success('Teacher added successfully');
    }
    setModalOpen(false);
  }

  function handleDelete(id) {
    setTeachers((prev) => prev.filter((t) => t.id !== id));
    toast.success('Teacher deleted successfully');
  }

  const columns = [
    {
      key: 'name',
      label: 'Staff Member',
      render: (row) => (
        <div className="flex items-center gap-4 py-1">
          <div className="avatar avatar-md avatar-emerald">
            {row.name.replace(/^(Prof\.|Dr\.|Mr\.|Mrs\.|Ms\.)\s*/i, '').split(' ').map((n) => n[0]).join('').slice(0, 2)}
          </div>
          <div>
            <p className="font-bold text-slate-800 text-[0.95rem] hover:text-emerald-600 transition-colors cursor-pointer">{row.name}</p>
            <p className="text-[0.75rem] font-medium text-slate-400">{row.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'subjects',
      label: 'Domain Subjects',
      render: (row) => (
        <div className="flex flex-wrap gap-1.5">
          {row.subjects.map((s) => (
            <span key={s} className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md text-[0.7rem] font-bold shadow-sm border border-slate-200">
              {s}
            </span>
          ))}
        </div>
      ),
    },
    {
      key: 'assignedClasses',
      label: 'Assigned Classes',
      render: (row) => (
        <div className="flex flex-wrap gap-1">
          {row.assignedClasses.map((ac) => (
             <span key={ac} className="text-[0.75rem] font-bold text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded">
               {ac}
             </span>
          ))}
        </div>
      ),
    },
    { 
      key: 'experience', 
      label: 'Experience',
      render: (row) => <span className="font-semibold text-slate-600 text-sm">{row.experience}</span>
    },
    {
      key: 'status',
      label: 'Status',
      render: (row) => (
        <span className={`badge ${getStatusBadge(row.status)} shadow-sm`}>{row.status}</span>
      ),
    },
    {
      key: 'actions',
      label: 'Manage',
      render: (row) => (
        <div className="flex items-center gap-2">
          <button onClick={() => openEdit(row)} className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-emerald-100 hover:text-emerald-600 transition-all">
            <HiPencil size={14} />
          </button>
          <button
            onClick={() => setDeleteConfirm({ open: true, id: row.id })}
            className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-rose-100 hover:text-rose-600 transition-all"
          >
            <HiTrash size={14} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      <div className="page-header relative">
        <div className="absolute top-0 right-1/4 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -z-10" />
        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Teaching Faculty</h1>
        <p className="text-sm font-medium text-slate-500 mt-1">Manage professorial staff directories and course assignments</p>
      </div>

      <div className="animate-fade-in-up">
        <DataTable
          columns={columns}
          data={filtered}
          searchValue={search}
          onSearchChange={setSearch}
          searchPlaceholder="Search by professor name, email, or subject expertise..."
          actions={
            <button onClick={openAdd} className="btn btn-primary shadow-md w-full sm:w-auto">
              <HiPlus size={18} /> Add Faculty
            </button>
          }
        />
      </div>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editTeacher ? 'Update Educator Record' : 'Enroll New Educator'}
        size="lg"
      >
        <div className="bg-slate-50/50 -mx-6 -mt-2 mb-6 px-6 py-4 border-b border-slate-100">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Professional Identity</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <div className="form-group">
            <label className="form-label">Full Name & Title *</label>
            <input
              className={`form-input ${errors.name ? 'error' : ''}`}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="e.g. Dr. Jane Smith"
            />
            {errors.name && <p className="form-error">{errors.name}</p>}
          </div>
          <div className="form-group">
            <label className="form-label">Institutional Email *</label>
            <input
              type="email"
              className={`form-input ${errors.email ? 'error' : ''}`}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="faculty@institution.edu"
            />
            {errors.email && <p className="form-error">{errors.email}</p>}
          </div>
          <div className="form-group">
            <label className="form-label">Contact Number *</label>
            <input
              className={`form-input ${errors.phone ? 'error' : ''}`}
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="e.g. 9876543210"
            />
            {errors.phone && <p className="form-error">{errors.phone}</p>}
          </div>
          <div className="form-group">
            <label className="form-label">Gender Identity</label>
            <select className="form-select" value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div className="bg-slate-50/50 -mx-6 mt-6 mb-6 px-6 py-4 border-y border-slate-100">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Academic & Financial Portfolio</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <div className="form-group">
            <label className="form-label">Highest Qualifications *</label>
            <input
              className={`form-input ${errors.qualification ? 'error' : ''}`}
              value={form.qualification}
              onChange={(e) => setForm({ ...form, qualification: e.target.value })}
              placeholder="e.g. Ph.D., M.Sc in Comp Sci"
            />
            {errors.qualification && <p className="form-error">{errors.qualification}</p>}
          </div>
          <div className="form-group">
            <label className="form-label">Pedagogical Experience</label>
            <input
              className="form-input"
              value={form.experience}
              onChange={(e) => setForm({ ...form, experience: e.target.value })}
              placeholder="e.g. 5 Years"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Monthly Remuneration (₹)</label>
            <input
              type="number"
              className="form-input"
              value={form.salary}
              onChange={(e) => setForm({ ...form, salary: e.target.value })}
              placeholder="e.g. 85000"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Induction Date</label>
            <input
              type="date"
              className="form-input"
              value={form.joiningDate}
              onChange={(e) => setForm({ ...form, joiningDate: e.target.value })}
            />
          </div>

          {/* Subjects Selection */}
          <div className="form-group sm:col-span-2 mt-2">
            <label className="form-label">Curriculum Domains (Subjects)</label>
            <div className="flex flex-wrap gap-2 mt-2 p-4 bg-slate-50/50 rounded-xl border border-slate-200/60">
              {SUBJECTS.map((sub) => (
                <button
                  key={sub}
                  type="button"
                  onClick={() => setForm({ ...form, subjects: toggleArrayItem(form.subjects, sub) })}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                    form.subjects.includes(sub)
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200 shadow-sm'
                      : 'bg-white text-slate-500 border-slate-200 hover:border-emerald-200 hover:text-emerald-600'
                  }`}
                >
                  {sub}
                </button>
              ))}
            </div>
          </div>

          {/* Assigned Classes */}
          <div className="form-group sm:col-span-2">
            <label className="form-label">Assigned Sections & Streams</label>
            <div className="flex flex-wrap gap-2 mt-2 p-4 bg-slate-50/50 rounded-xl border border-slate-200/60">
              {CLASSES.map((cls) => (
                <button
                  key={cls}
                  type="button"
                  onClick={() => setForm({ ...form, assignedClasses: toggleArrayItem(form.assignedClasses, cls) })}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                    form.assignedClasses.includes(cls)
                      ? 'bg-indigo-50 text-indigo-700 border-indigo-200 shadow-sm'
                      : 'bg-white text-slate-500 border-slate-200 hover:border-indigo-200 hover:text-indigo-600'
                  }`}
                >
                  {cls}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="modal-footer -mx-6 -mb-6 mt-8">
          <button onClick={() => setModalOpen(false)} className="btn btn-secondary">Cancel Edit</button>
          <button onClick={handleSave} className="btn btn-primary">
            {editTeacher ? 'Update Core Record' : 'Save Faculty Profile'}
          </button>
        </div>
      </Modal>

      <ConfirmDialog
        isOpen={deleteConfirm.open}
        onClose={() => setDeleteConfirm({ open: false, id: null })}
        onConfirm={() => handleDelete(deleteConfirm.id)}
        title="Remove Staff Access"
        message="Are you certain you wish to terminate this faculty profile? All historical academic linkages will be decoupled."
      />
    </div>
  );
}
