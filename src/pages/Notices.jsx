import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { sampleNotices } from '../utils/seedData';
import { formatDate } from '../utils/helpers';
import Modal from '../components/common/Modal';
import ConfirmDialog from '../components/common/ConfirmDialog';
import { HiPlus, HiPencil, HiTrash, HiSpeakerphone, HiFilter, HiSearch } from 'react-icons/hi';
import toast from 'react-hot-toast';

export default function Notices() {
  const { userRole } = useAuth();
  const [notices, setNotices] = useState(sampleNotices);
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  
  const [modalOpen, setModalOpen] = useState(false);
  const [editNotice, setEditNotice] = useState(null);
  const [form, setForm] = useState({ title: '', content: '', category: 'General', priority: 'low' });
  const [errors, setErrors] = useState({});
  const [deleteConfirm, setDeleteConfirm] = useState({ open: false, id: null });

  const categories = ['All', 'General', 'Academic', 'Holiday', 'Exam', 'Event', 'Emergency'];
  const priorities = [
    { value: 'low', label: 'Standard Notice', color: 'emerald' },
    { value: 'medium', label: 'Elevated Importance', color: 'amber' },
    { value: 'high', label: 'Critical Alert', color: 'rose' }
  ];

  const filtered = notices.filter(n => {
    const matchSearch = n.title.toLowerCase().includes(search.toLowerCase()) || n.content.toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCategory === 'All' ? true : n.category === filterCategory;
    return matchSearch && matchCat;
  });

  function openAdd() {
    setEditNotice(null);
    setForm({ title: '', content: '', category: 'General', priority: 'low' });
    setErrors({});
    setModalOpen(true);
  }

  function openEdit(notice) {
    setEditNotice(notice);
    setForm({ ...notice });
    setErrors({});
    setModalOpen(true);
  }

  function validate() {
    const errs = {};
    if (!form.title.trim()) errs.title = 'Required';
    if (!form.content.trim()) errs.content = 'Required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleSave() {
    if (!validate()) return;
    if (editNotice) {
      setNotices(prev => prev.map(n => n.id === editNotice.id ? { ...n, ...form } : n));
      toast.success('Broadcast transmission updated');
    } else {
      setNotices(prev => [{ ...form, id: 'N' + Date.now(), date: new Date().toISOString().split('T')[0], author: 'Central Administration' }, ...prev]);
      toast.success('Broadcast transmission initiated');
    }
    setModalOpen(false);
  }

  function handleDelete(id) {
    setNotices(prev => prev.filter(n => n.id !== id));
    toast.success('Broadcast purged');
  }

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      <div className="page-header relative">
        <div className="absolute top-0 right-1/4 w-32 h-32 bg-rose-500/10 rounded-full blur-3xl -z-10" />
        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Broadcast Control</h1>
        <p className="text-sm font-medium text-slate-500 mt-1">Platform-wide alert system and informational bulletins</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between z-10 relative">
        <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl w-full md:w-auto overflow-x-auto shadow-inner border border-slate-200/50">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`filter-chip flex-shrink-0 ${filterCategory === cat ? 'active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex w-full md:w-auto gap-4">
          <div className="relative flex-1 md:w-64">
            <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              placeholder="Search frequencies..."
              className="form-input pl-9 rounded-full bg-white/60 shadow-sm w-full"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          {userRole === 'admin' && (
            <button onClick={openAdd} className="btn btn-primary shadow-lg shadow-indigo-200 flex-shrink-0 rounded-full px-6">
              <HiPlus size={18} /> Cast
            </button>
          )}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="card text-center py-24 animate-fade-in-up border border-dashed border-slate-300">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
            <HiSpeakerphone size={32} />
          </div>
          <h2 className="text-xl font-bold text-slate-600 mb-2">Silent Frequency</h2>
          <p className="text-slate-400 max-w-sm mx-auto">No broadcast messages resonate in this channel currently.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 stagger-children">
          {filtered.map(notice => (
            <div key={notice.id} className="card p-0 overflow-hidden group notice-card flex flex-col h-full bg-white/70 hover:bg-white" style={{ borderLeftWidth: '4px', borderLeftColor: notice.priority === 'high' ? '#e11d48' : notice.priority === 'medium' ? '#d97706' : '#059669' }}>
              <div className="p-5 flex-1 relative z-10">
                <div className="absolute top-4 right-4 opactiy-50">
                   {notice.priority === 'high' && <span className="flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span></span>}
                </div>
                <div className="flex gap-2 items-center mb-3">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-[0.65rem] font-bold uppercase tracking-widest ${
                    notice.category === 'Emergency' ? 'bg-rose-100 text-rose-700' :
                    notice.category === 'Event' ? 'bg-violet-100 text-violet-700' :
                    notice.category === 'Academic' ? 'bg-indigo-100 text-indigo-700' :
                    'bg-slate-100 text-slate-600'
                  }`}>
                    {notice.category}
                  </span>
                  <p className="text-[0.7rem] font-medium text-slate-400">{formatDate(notice.date)}</p>
                </div>
                <h3 className="text-[1.1rem] font-extrabold text-slate-800 tracking-tight leading-snug mb-3 group-hover:text-indigo-600 transition-colors">
                  {notice.title}
                </h3>
                <p className="text-[0.9rem] text-slate-600 leading-relaxed font-medium">
                  {notice.content}
                </p>
              </div>
              <div className="bg-slate-50/80 px-5 py-3 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center shadow-inner">
                    <span className="text-[0.5rem] font-black tracking-tighter text-slate-500">ADM</span>
                  </div>
                  <p className="text-[0.75rem] font-bold text-slate-500">By {notice.author}</p>
                </div>
                {userRole === 'admin' && (
                  <div className="flex gap-1">
                    <button onClick={() => openEdit(notice)} className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:bg-white hover:text-indigo-600 shadow-sm transition-all bg-transparent">
                      <HiPencil size={14} />
                    </button>
                    <button onClick={() => setDeleteConfirm({ open: true, id: notice.id })} className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:bg-white hover:text-rose-600 shadow-sm transition-all bg-transparent">
                      <HiTrash size={14} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Admin Modals */}
      {userRole === 'admin' && (
        <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editNotice ? 'Amend Transmission' : 'Initiate Transmission'}>
          <div className="space-y-5">
            <div className="form-group">
              <label className="form-label">Transmission Header *</label>
              <input className={`form-input font-bold ${errors.title ? 'error' : ''}`} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Subject line..." />
              {errors.title && <p className="form-error">{errors.title}</p>}
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div className="form-group">
                <label className="form-label">Classification Band</label>
                <select className="form-select" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                  {categories.filter(c => c !== 'All').map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Priority Override Protocol</label>
                <select className="form-select" value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })}>
                  {priorities.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Payload Message Body *</label>
              <textarea
                className={`form-input min-h-[160px] resize-y ${errors.content ? 'error' : ''}`}
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                placeholder="Disseminate information here..."
              />
              {errors.content && <p className="form-error">{errors.content}</p>}
            </div>
          </div>
          
          <div className="modal-footer -mx-6 -mb-6 mt-8">
            <button onClick={() => setModalOpen(false)} className="btn btn-secondary">Abort Cast</button>
            <button onClick={handleSave} className="btn btn-primary">{editNotice ? 'Patch Record' : 'Launch Broadcast'}</button>
          </div>
        </Modal>
      )}

      {userRole === 'admin' && (
        <ConfirmDialog
          isOpen={deleteConfirm.open}
          onClose={() => setDeleteConfirm({ open: false, id: null })}
          onConfirm={() => handleDelete(deleteConfirm.id)}
          title="Scrub Broadcast"
          message="Retracting a broadcast cannot be stopped once in motion. Make sure this bulletin is safe to erase."
        />
      )}
    </div>
  );
}
