import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from '../components/common/DataTable';
import Modal from '../components/common/Modal';
import ConfirmDialog from '../components/common/ConfirmDialog';
import { sampleStudents } from '../utils/seedData';
import { CLASSES, getStatusBadge } from '../utils/helpers';
import { HiPlus, HiPencil, HiTrash, HiEye, HiFilter } from 'react-icons/hi';
import toast from 'react-hot-toast';

export default function Students() {
  const navigate = useNavigate();
  const [students, setStudents] = useState(sampleStudents);
  const [search, setSearch] = useState('');
  const [filterClass, setFilterClass] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editStudent, setEditStudent] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState({ open: false, id: null });

  const [form, setForm] = useState({
    name: '', email: '', phone: '', class: '', rollNo: '',
    gender: 'Male', dob: '', address: '', parentName: '',
    parentPhone: '', bloodGroup: '', status: 'active',
  });
  const [errors, setErrors] = useState({});

  const filtered = students.filter((s) => {
    const matchSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase()) ||
      s.rollNo.toLowerCase().includes(search.toLowerCase());
    const matchClass = filterClass ? s.class === filterClass : true;
    return matchSearch && matchClass;
  });

  function openAdd() {
    setEditStudent(null);
    setForm({
      name: '', email: '', phone: '', class: '', rollNo: '',
      gender: 'Male', dob: '', address: '', parentName: '',
      parentPhone: '', bloodGroup: '', status: 'active',
    });
    setErrors({});
    setModalOpen(true);
  }

  function openEdit(student) {
    setEditStudent(student);
    setForm({ ...student });
    setErrors({});
    setModalOpen(true);
  }

  function validate() {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    if (!form.class) errs.class = 'Class is required';
    if (!form.rollNo.trim()) errs.rollNo = 'Roll No is required';
    if (!form.phone.trim()) errs.phone = 'Phone is required';
    if (form.phone && !/^[6-9]\d{9}$/.test(form.phone)) errs.phone = 'Invalid phone number';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleSave() {
    if (!validate()) return;
    if (editStudent) {
      setStudents((prev) =>
        prev.map((s) => (s.id === editStudent.id ? { ...s, ...form } : s))
      );
      toast.success('Student updated successfully');
    } else {
      const newStudent = {
        ...form,
        id: 'STU' + Date.now(),
        admissionDate: new Date().toISOString().split('T')[0],
      };
      setStudents((prev) => [...prev, newStudent]);
      toast.success('Student added successfully');
    }
    setModalOpen(false);
  }

  function handleDelete(id) {
    setStudents((prev) => prev.filter((s) => s.id !== id));
    toast.success('Student deleted successfully');
  }

  const columns = [
    {
      key: 'name',
      label: 'Student Details',
      render: (row) => (
        <div className="flex items-center gap-4 py-1">
          <div className="avatar avatar-md avatar-indigo">
            {row.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
          </div>
          <div>
            <p className="font-bold text-slate-800 text-[0.95rem] hover:text-indigo-600 transition-colors cursor-pointer" onClick={() => navigate(`/students/${row.id}`)}>{row.name}</p>
            <p className="text-[0.75rem] font-medium text-slate-400">{row.email}</p>
          </div>
        </div>
      ),
    },
    { 
      key: 'rollNo', 
      label: 'Roll No',
      render: (row) => <span className="font-bold text-slate-500">#{row.rollNo}</span>
    },
    { 
      key: 'class', 
      label: 'Class',
      render: (row) => <span className="font-bold text-slate-700 bg-slate-100 px-2 py-1 rounded-md text-[0.8rem]">{row.class}</span>
    },
    { key: 'phone', label: 'Contact', render: (row) => <span className="font-medium text-slate-600 text-sm">{row.phone}</span> },
    {
      key: 'status',
      label: 'Status',
      render: (row) => (
        <span className={`badge ${getStatusBadge(row.status)} shadow-sm`}>
          {row.status}
        </span>
      ),
    },
    {
      key: 'actions',
      label: 'Manage',
      render: (row) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(`/students/${row.id}`)}
            className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-indigo-100 hover:text-indigo-600 transition-all"
            title="View Profile"
          >
            <HiEye size={16} />
          </button>
          <button
            onClick={() => openEdit(row)}
            className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-indigo-100 hover:text-indigo-600 transition-all"
            title="Edit"
          >
            <HiPencil size={14} />
          </button>
          <button
            onClick={() => setDeleteConfirm({ open: true, id: row.id })}
            className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-rose-100 hover:text-rose-600 transition-all"
            title="Delete"
          >
            <HiTrash size={14} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      <div className="page-header relative flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="absolute top-0 right-1/4 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl -z-10" />
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Student Directory</h1>
          <p className="text-sm font-medium text-slate-500 mt-1">
            Manage comprehensive student profiles and records
          </p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-40">
            <select
              className="form-select bg-white/60 shadow-sm"
              value={filterClass}
              onChange={(e) => setFilterClass(e.target.value)}
            >
              <option value="">All Classes</option>
              {CLASSES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="animate-fade-in-up">
        <DataTable
          columns={columns}
          data={filtered}
          searchValue={search}
          onSearchChange={setSearch}
          searchPlaceholder="Search by name, email, or roll no..."
          actions={
            <button onClick={openAdd} className="btn btn-primary shadow-md w-full sm:w-auto">
              <HiPlus size={18} /> New Admission
            </button>
          }
        />
      </div>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editStudent ? 'Edit Student Details' : 'New Admission Form'}
        size="lg"
      >
        <div className="bg-slate-50/50 -mx-6 -mt-2 mb-6 px-6 py-4 border-b border-slate-100">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Academic Details</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <div className="form-group">
            <label className="form-label">Full Name *</label>
            <input
              className={`form-input ${errors.name ? 'error' : ''}`}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="e.g. John Doe"
            />
            {errors.name && <p className="form-error">{errors.name}</p>}
          </div>
          <div className="form-group">
            <label className="form-label">Email Address *</label>
            <input
              type="email"
              className={`form-input ${errors.email ? 'error' : ''}`}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="student@school.com"
            />
            {errors.email && <p className="form-error">{errors.email}</p>}
          </div>
          <div className="form-group">
            <label className="form-label">Primary Assigned Class *</label>
            <select
              className={`form-select ${errors.class ? 'error' : ''}`}
              value={form.class}
              onChange={(e) => setForm({ ...form, class: e.target.value })}
            >
              <option value="">Select Class</option>
              {CLASSES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            {errors.class && <p className="form-error">{errors.class}</p>}
          </div>
          <div className="form-group">
            <label className="form-label">Roll No / ID *</label>
            <input
              className={`form-input ${errors.rollNo ? 'error' : ''}`}
              value={form.rollNo}
              onChange={(e) => setForm({ ...form, rollNo: e.target.value })}
              placeholder="1001"
            />
            {errors.rollNo && <p className="form-error">{errors.rollNo}</p>}
          </div>
        </div>

        <div className="bg-slate-50/50 -mx-6 mt-2 mb-6 px-6 py-4 border-y border-slate-100">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Personal & Contact</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <div className="form-group">
            <label className="form-label">Contact Phone *</label>
            <input
              className={`form-input ${errors.phone ? 'error' : ''}`}
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="9876543210"
            />
            {errors.phone && <p className="form-error">{errors.phone}</p>}
          </div>
          <div className="form-group">
            <label className="form-label">Date of Birth</label>
            <input
              type="date"
              className="form-input"
              value={form.dob}
              onChange={(e) => setForm({ ...form, dob: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Gender</label>
            <select
              className="form-select"
              value={form.gender}
              onChange={(e) => setForm({ ...form, gender: e.target.value })}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Blood Group</label>
            <select
              className="form-select"
              value={form.bloodGroup}
              onChange={(e) => setForm({ ...form, bloodGroup: e.target.value })}
            >
              <option value="">Select</option>
              {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((bg) => (
                <option key={bg} value={bg}>{bg}</option>
              ))}
            </select>
          </div>
          <div className="form-group sm:col-span-2">
            <label className="form-label">Residential Address</label>
            <input
              className="form-input"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              placeholder="Enter complete address"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Parent / Guardian Name</label>
            <input
              className="form-input"
              value={form.parentName}
              onChange={(e) => setForm({ ...form, parentName: e.target.value })}
              placeholder="Father / Mother / Guardian"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Parent Emergency Phone</label>
            <input
              className="form-input"
              value={form.parentPhone}
              onChange={(e) => setForm({ ...form, parentPhone: e.target.value })}
              placeholder="9876543200"
            />
          </div>
        </div>

        <div className="modal-footer -mx-6 -mb-6 mt-8">
          <button onClick={() => setModalOpen(false)} className="btn btn-secondary">
            Discard Changes
          </button>
          <button onClick={handleSave} className="btn btn-primary">
            {editStudent ? 'Save Modifications' : 'Create Student Record'}
          </button>
        </div>
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={deleteConfirm.open}
        onClose={() => setDeleteConfirm({ open: false, id: null })}
        onConfirm={() => handleDelete(deleteConfirm.id)}
        title="Delete Student Record"
        message="Are you completely sure you want to delete this student? All associated academic, attendance, and fee files will be permanently purged."
      />
    </div>
  );
}
