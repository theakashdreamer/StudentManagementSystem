import { useState } from 'react';
import Modal from '../components/common/Modal';
import ConfirmDialog from '../components/common/ConfirmDialog';
import { sampleClasses, sampleSubjects } from '../utils/seedData';
import { HiPlus, HiPencil, HiTrash, HiCollection, HiBookOpen, HiLocationMarker, HiUsers } from 'react-icons/hi';
import toast from 'react-hot-toast';

export default function Classes() {
  const [classes, setClasses] = useState(sampleClasses);
  const [subjects, setSubjects] = useState(sampleSubjects);
  const [activeTab, setActiveTab] = useState('classes');

  // Class Modal
  const [classModal, setClassModal] = useState(false);
  const [editClass, setEditClass] = useState(null);
  const [classForm, setClassForm] = useState({ name: '', section: '', grade: '', classTeacher: '', room: '', totalStudents: '' });
  const [classErrors, setClassErrors] = useState({});

  // Subject Modal
  const [subjectModal, setSubjectModal] = useState(false);
  const [editSubject, setEditSubject] = useState(null);
  const [subjectForm, setSubjectForm] = useState({ name: '', code: '', type: 'Core' });
  const [subjectErrors, setSubjectErrors] = useState({});

  const [deleteConfirm, setDeleteConfirm] = useState({ open: false, id: null, type: '' });

  // ── Class CRUD ──
  function openAddClass() {
    setEditClass(null);
    setClassForm({ name: '', section: '', grade: '', classTeacher: '', room: '', totalStudents: '' });
    setClassErrors({});
    setClassModal(true);
  }

  function openEditClass(cls) {
    setEditClass(cls);
    setClassForm({ ...cls, totalStudents: String(cls.totalStudents) });
    setClassErrors({});
    setClassModal(true);
  }

  function saveClass() {
    const errs = {};
    if (!classForm.name.trim()) errs.name = 'Required';
    if (!classForm.grade.trim()) errs.grade = 'Required';
    setClassErrors(errs);
    if (Object.keys(errs).length > 0) return;

    if (editClass) {
      setClasses((prev) => prev.map((c) => c.id === editClass.id ? { ...c, ...classForm, totalStudents: Number(classForm.totalStudents) } : c));
      toast.success('Class updated');
    } else {
      setClasses((prev) => [...prev, { ...classForm, id: 'CLS' + Date.now(), totalStudents: Number(classForm.totalStudents) || 0 }]);
      toast.success('Class added');
    }
    setClassModal(false);
  }

  // ── Subject CRUD ──
  function openAddSubject() {
    setEditSubject(null);
    setSubjectForm({ name: '', code: '', type: 'Core' });
    setSubjectErrors({});
    setSubjectModal(true);
  }

  function openEditSubject(sub) {
    setEditSubject(sub);
    setSubjectForm({ ...sub });
    setSubjectErrors({});
    setSubjectModal(true);
  }

  function saveSubject() {
    const errs = {};
    if (!subjectForm.name.trim()) errs.name = 'Required';
    if (!subjectForm.code.trim()) errs.code = 'Required';
    setSubjectErrors(errs);
    if (Object.keys(errs).length > 0) return;

    if (editSubject) {
      setSubjects((prev) => prev.map((s) => s.id === editSubject.id ? { ...s, ...subjectForm } : s));
      toast.success('Subject updated');
    } else {
      setSubjects((prev) => [...prev, { ...subjectForm, id: 'SUB' + Date.now() }]);
      toast.success('Subject added');
    }
    setSubjectModal(false);
  }

  function handleDelete(id) {
    if (deleteConfirm.type === 'class') {
      setClasses((prev) => prev.filter((c) => c.id !== id));
      toast.success('Class deleted');
    } else {
      setSubjects((prev) => prev.filter((s) => s.id !== id));
      toast.success('Subject deleted');
    }
  }

  const tabs = [
    { id: 'classes', label: 'Academic Sections', icon: HiCollection },
    { id: 'subjects', label: 'Curriculum Syllabi', icon: HiBookOpen },
  ];

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      <div className="page-header relative">
        <div className="absolute top-0 right-1/4 w-32 h-32 bg-violet-500/10 rounded-full blur-3xl -z-10" />
        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Classes & Curriculums</h1>
        <p className="text-sm font-medium text-slate-500 mt-1">Manage institutional divisions and academic catalogs</p>
      </div>

      {/* Modern Tabs */}
      <div className="tab-bar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
          >
            <tab.icon size={18} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Classes Tab */}
      {activeTab === 'classes' && (
        <div className="animate-fade-in-up">
          <div className="flex justify-between items-center mb-6 mt-4">
            <h2 className="text-lg font-bold text-slate-800 tracking-tight pl-2 border-l-4 border-indigo-500">Active Configurations</h2>
            <button onClick={openAddClass} className="btn btn-primary shadow-md">
              <HiPlus size={18} /> Configure Class
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 stagger-children">
            {classes.map((cls) => (
              <div key={cls.id} className="card p-0 overflow-hidden group">
                <div className="p-5 border-b border-slate-100 flex items-start justify-between bg-slate-50/50 group-hover:bg-indigo-50/30 transition-colors">
                  <div className="w-14 h-14 rounded-[1rem] bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-indigo-500/30 transform group-hover:-translate-y-1 transition-transform">
                    {cls.name}
                  </div>
                  <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => openEditClass(cls)} className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-indigo-600 hover:border-indigo-300 shadow-sm transition-all">
                      <HiPencil size={14} />
                    </button>
                    <button
                      onClick={() => setDeleteConfirm({ open: true, id: cls.id, type: 'class' })}
                      className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-rose-600 hover:border-rose-300 shadow-sm transition-all"
                    >
                      <HiTrash size={14} />
                    </button>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-[0.7rem] font-bold text-slate-400 uppercase tracking-widest mb-1">Academic Section</p>
                  <h3 className="font-extrabold text-slate-800 text-lg mb-4">Grade {cls.grade} — {cls.section}</h3>
                  <div className="space-y-3 pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-md bg-slate-100 flex items-center justify-center text-slate-400">
                        <span className="text-[0.7rem]">👨‍🏫</span>
                      </div>
                      <p className="text-[0.85rem] font-bold text-slate-600 truncate">{cls.classTeacher || 'No assigned mentor'}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-md bg-indigo-50 flex items-center justify-center text-indigo-400">
                        <HiLocationMarker size={14} />
                      </div>
                      <p className="text-[0.85rem] font-bold text-slate-600 truncate">{cls.room || 'Location TBD'}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-md bg-emerald-50 flex items-center justify-center text-emerald-500">
                        <HiUsers size={14} />
                      </div>
                      <p className="text-[0.85rem] font-bold text-slate-600 truncate">{cls.totalStudents} Enrolled Scholars</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Subjects Tab */}
      {activeTab === 'subjects' && (
        <div className="animate-fade-in-up">
          <div className="flex justify-between items-center mb-6 mt-4">
            <h2 className="text-lg font-bold text-slate-800 tracking-tight pl-2 border-l-4 border-violet-500">Curriculum Syllabus</h2>
            <button onClick={openAddSubject} className="btn btn-primary shadow-md">
              <HiPlus size={18} /> Register Subject
            </button>
          </div>
          <div className="card overflow-hidden">
            <table className="data-table">
              <thead>
                <tr className="bg-slate-50/80">
                  <th className="w-32">Index Code</th>
                  <th>Core Subject Designation</th>
                  <th className="w-48">Academic Type</th>
                  <th className="w-32 text-right">Modifiers</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {subjects.map((sub) => (
                  <tr key={sub.id} className="hover:bg-slate-50/50 group">
                    <td>
                      <span className="font-bold text-[0.75rem] tracking-widest text-indigo-600 bg-indigo-100/50 px-2.5 py-1 rounded-md border border-indigo-200">{sub.code}</span>
                    </td>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400">
                          <HiBookOpen size={16} />
                        </div>
                        <span className="font-extrabold text-slate-700">{sub.name}</span>
                      </div>
                    </td>
                    <td>
                      <span className={`badge shadow-sm ${sub.type === 'Core' ? 'badge-success' : sub.type === 'Elective' ? 'badge-info' : 'badge-warning'}`}>
                        {sub.type}
                      </span>
                    </td>
                    <td>
                      <div className="flex gap-2 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => openEditSubject(sub)} className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-indigo-600 hover:border-indigo-300 shadow-sm transition-all">
                          <HiPencil size={14} />
                        </button>
                        <button onClick={() => setDeleteConfirm({ open: true, id: sub.id, type: 'subject' })} className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-rose-600 hover:border-rose-300 shadow-sm transition-all">
                          <HiTrash size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Class Modal */}
      <Modal isOpen={classModal} onClose={() => setClassModal(false)} title={editClass ? 'Update Class Details' : 'Initialize New Class'}>
        <div className="grid grid-cols-2 gap-x-6 gap-y-4">
          <div className="form-group">
            <label className="form-label">Classification Code *</label>
            <input className={`form-input ${classErrors.name ? 'error' : ''}`} value={classForm.name} onChange={(e) => setClassForm({ ...classForm, name: e.target.value })} placeholder="e.g. 10-A" />
          </div>
          <div className="form-group">
            <label className="form-label">Grade / Standard *</label>
            <input className={`form-input ${classErrors.grade ? 'error' : ''}`} value={classForm.grade} onChange={(e) => setClassForm({ ...classForm, grade: e.target.value })} placeholder="e.g. 10" />
          </div>
          <div className="form-group">
            <label className="form-label">Division Section</label>
            <input className="form-input" value={classForm.section} onChange={(e) => setClassForm({ ...classForm, section: e.target.value })} placeholder="e.g. A" />
          </div>
          <div className="form-group">
            <label className="form-label">Physical Room allocation</label>
            <input className="form-input" value={classForm.room} onChange={(e) => setClassForm({ ...classForm, room: e.target.value })} placeholder="e.g. Room 401" />
          </div>
          <div className="form-group">
            <label className="form-label">Designated Homeroom Teacher</label>
            <input className="form-input" value={classForm.classTeacher} onChange={(e) => setClassForm({ ...classForm, classTeacher: e.target.value })} placeholder="Teacher Name" />
          </div>
          <div className="form-group">
            <label className="form-label">Max Student Capacity</label>
            <input type="number" className="form-input" value={classForm.totalStudents} onChange={(e) => setClassForm({ ...classForm, totalStudents: e.target.value })} placeholder="0" />
          </div>
        </div>
        <div className="modal-footer -mx-6 -mb-6 mt-8">
          <button onClick={() => setClassModal(false)} className="btn btn-secondary">Discard Rules</button>
          <button onClick={saveClass} className="btn btn-primary">{editClass ? 'Store Parameters' : 'Deploy Hierarchy'}</button>
        </div>
      </Modal>

      {/* Subject Modal */}
      <Modal isOpen={subjectModal} onClose={() => setSubjectModal(false)} title={editSubject ? 'Update Curricular Spec' : 'Add Curricular Spec'}>
        <div className="space-y-5">
          <div className="form-group">
            <label className="form-label">Official Nomenclature *</label>
            <input className={`form-input ${subjectErrors.name ? 'error' : ''}`} value={subjectForm.name} onChange={(e) => setSubjectForm({ ...subjectForm, name: e.target.value })} placeholder="Advanced Statistics" />
          </div>
          <div className="form-group">
            <label className="form-label">Registration Code *</label>
            <input className={`form-input ${subjectErrors.code ? 'error' : ''}`} value={subjectForm.code} onChange={(e) => setSubjectForm({ ...subjectForm, code: e.target.value })} placeholder="MATH-301" />
          </div>
          <div className="form-group">
            <label className="form-label">Academic Stream Category</label>
            <div className="flex gap-4 mt-2">
              {['Core', 'Elective', 'Optional'].map(type => (
                <label key={type} className={`flex-1 flex flex-col items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  subjectForm.type === type ? 'border-primary bg-indigo-50/50 text-indigo-700 shadow-sm' : 'border-slate-100 hover:border-slate-300 text-slate-500'
                }`}
                onClick={() => setSubjectForm({ ...subjectForm, type })}
                >
                  <span className="text-sm font-bold">{type}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
        <div className="modal-footer -mx-6 -mb-6 mt-8">
          <button onClick={() => setSubjectModal(false)} className="btn btn-secondary">Cancel</button>
          <button onClick={saveSubject} className="btn btn-primary">{editSubject ? 'Commit Edit' : 'Launch Syllabus'}</button>
        </div>
      </Modal>

      <ConfirmDialog
        isOpen={deleteConfirm.open}
        onClose={() => setDeleteConfirm({ open: false, id: null, type: '' })}
        onConfirm={() => handleDelete(deleteConfirm.id)}
        title={`Terminate ${deleteConfirm.type === 'class' ? 'Section Category' : 'Curriculum Subject'}`}
        message={`Are you fully confident you want to expunge this ${deleteConfirm.type}? Associated assignments might suffer cascading integrity failures.`}
      />
    </div>
  );
}
