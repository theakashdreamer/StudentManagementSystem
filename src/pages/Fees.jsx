import { useState } from 'react';
import { sampleStudents, sampleMarks } from '../utils/seedData';
import { formatCurrency, formatDate, getStatusBadge } from '../utils/helpers';
import { HiCheck, HiX, HiCurrencyRupee, HiDocumentDownload, HiFilter } from 'react-icons/hi';
import DataTable from '../components/common/DataTable';
import Modal from '../components/common/Modal';
import toast from 'react-hot-toast';

export default function Fees() {
  const [fees, setFees] = useState([
    { id: 'F1', studentId: 'S1', name: 'Aarav Patel', class: '10-A', rollNo: '1001', month: 'April 2026', feeType: 'Tuition Fee', amount: 5000, dueDate: '2026-04-10', status: 'paid', paidDate: '2026-04-05' },
    { id: 'F2', studentId: 'S2', name: 'Ananya Sharma', class: '10-A', rollNo: '1002', month: 'April 2026', feeType: 'Tuition Fee', amount: 5000, dueDate: '2026-04-10', status: 'pending' },
    { id: 'F3', studentId: 'S3', name: 'Rohan Gupta', class: '10-A', rollNo: '1003', month: 'April 2026', feeType: 'Tuition Fee', amount: 5000, dueDate: '2026-04-10', status: 'paid', paidDate: '2026-04-08' },
    { id: 'F4', studentId: 'S4', name: 'Isha Desai', class: '10-A', rollNo: '1004', month: 'April 2026', feeType: 'Tuition Fee', amount: 5000, dueDate: '2026-04-10', status: 'overdue' },
    { id: 'F5', studentId: 'S5', name: 'Kabir Singh', class: '10-A', rollNo: '1005', month: 'April 2026', feeType: 'Tuition + Transport', amount: 6500, dueDate: '2026-04-10', status: 'paid', paidDate: '2026-04-02' },
  ]);

  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [paymentModal, setPaymentModal] = useState(false);
  const [selectedFee, setSelectedFee] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('Cash');

  // Stats
  const totalExpected = fees.reduce((sum, f) => sum + f.amount, 0);
  const totalCollected = fees.filter(f => f.status === 'paid').reduce((sum, f) => sum + f.amount, 0);
  const totalPending = fees.filter(f => f.status === 'pending').reduce((sum, f) => sum + f.amount, 0);
  const totalOverdue = fees.filter(f => f.status === 'overdue').reduce((sum, f) => sum + f.amount, 0);

  const filtered = fees.filter((f) => {
    const matchSearch = f.name.toLowerCase().includes(search.toLowerCase()) || f.rollNo.includes(search);
    const matchStatus = filterStatus === 'all' ? true : f.status === filterStatus;
    return matchSearch && matchStatus;
  });

  function openPayment(fee) {
    setSelectedFee(fee);
    setPaymentMethod('Cash');
    setPaymentModal(true);
  }

  function processPayment() {
    setFees(prev => prev.map(f => {
      if (f.id === selectedFee.id) {
        return {
          ...f,
          status: 'paid',
          paidDate: new Date().toISOString().split('T')[0],
        };
      }
      return f;
    }));
    toast.success('Payment recorded successfully');
    setPaymentModal(false);
  }

  const columns = [
    {
      key: 'student',
      label: 'Student Record',
      render: (row) => (
        <div className="flex items-center gap-4 py-1">
          <div className="avatar avatar-md avatar-amber">
            {row.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
          </div>
          <div>
            <p className="font-bold text-slate-800 text-[0.95rem]">{row.name}</p>
            <p className="text-[0.75rem] font-medium text-slate-400">ID #{row.rollNo} • Class {row.class}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'details',
      label: 'Invoice Details',
      render: (row) => (
        <div>
          <p className="font-bold text-slate-700">{row.feeType}</p>
          <p className="text-[0.75rem] text-slate-500">{row.month}</p>
        </div>
      ),
    },
    {
      key: 'amount',
      label: 'Financials',
      render: (row) => (
        <span className="font-extrabold text-slate-800">{formatCurrency(row.amount)}</span>
      ),
    },
    {
      key: 'dueDate',
      label: 'Chronology',
      render: (row) => (
        <span className="text-sm font-medium text-slate-600">{formatDate(row.dueDate)}</span>
      ),
    },
    {
      key: 'status',
      label: 'Settlement Status',
      render: (row) => (
        <span className={`badge ${getStatusBadge(row.status)} shadow-sm`}>{row.status}</span>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (row) => (
        <div className="flex gap-2">
          {row.status !== 'paid' ? (
            <button
              onClick={() => openPayment(row)}
              className="btn btn-sm btn-success shadow-sm"
            >
              <HiCheck size={14} /> Accept Payment
            </button>
          ) : (
            <button
              className="btn btn-sm btn-secondary shadow-sm"
            >
              <HiDocumentDownload size={14} /> View Receipt
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      <div className="page-header relative">
        <div className="absolute top-0 right-1/4 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl -z-10" />
        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Fee Treasury</h1>
        <p className="text-sm font-medium text-slate-500 mt-1">Accept payments and trace overdue accounts</p>
      </div>

      {/* Snapshot Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 animate-fade-in-up">
        {[{
            title: "Total Projection", amount: totalExpected, icon: HiCurrencyRupee, color: "text-indigo-600", bg: "bg-indigo-50", line: "border-indigo-400"
          }, {
            title: "Net Processed", amount: totalCollected, icon: HiCheck, color: "text-emerald-600", bg: "bg-emerald-50", line: "border-emerald-400"
          }, {
            title: "Operating Pending", amount: totalPending, icon: HiCurrencyRupee, color: "text-amber-600", bg: "bg-amber-50", line: "border-amber-400"
          }, {
            title: "Critical Overdue", amount: totalOverdue, icon: HiX, color: "text-rose-600", bg: "bg-rose-50", line: "border-rose-400"
          }
        ].map((s, idx) => (
          <div key={idx} className={`p-5 rounded-[1.25rem] bg-white border-t-4 shadow-sm relative overflow-hidden group ${s.line}`}>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[0.7rem] font-bold text-slate-400 uppercase tracking-widest">{s.title}</p>
                <p className="text-2xl font-black text-slate-800 tracking-tight mt-1">{formatCurrency(s.amount)}</p>
              </div>
              <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center ${s.color}`}>
                <s.icon size={20} />
              </div>
            </div>
            <div className={`absolute -right-6 -bottom-6 w-24 h-24 rounded-full opacity-10 group-hover:scale-150 transition-transform duration-500 ${s.bg}`} />
          </div>
        ))}
      </div>

      <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        <DataTable
          columns={columns}
          data={filtered}
          searchValue={search}
          onSearchChange={setSearch}
          searchPlaceholder="Search invoices by student name or roll ID..."
          actions={
            <div className="flex items-center gap-2 bg-slate-100 rounded-full p-1">
              {['all', 'paid', 'pending', 'overdue'].map(status => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold capitalize transition-all ${
                    filterStatus === status ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          }
        />
      </div>

      {/* Payment Modal */}
      <Modal isOpen={paymentModal} onClose={() => setPaymentModal(false)} title="Invoice Settlement Station">
        {selectedFee && (
          <div className="space-y-6">
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 mb-2">
              <div className="flex items-center gap-4 mb-4 pb-4 border-b border-slate-200/60">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-lg font-black shadow-md">
                  {selectedFee.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-800">{selectedFee.name}</h4>
                  <p className="text-sm font-medium text-slate-500">Roll: #{selectedFee.rollNo} • Class: {selectedFee.class}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[0.65rem] font-bold text-slate-400 uppercase tracking-widest">Statement Descriptor</p>
                  <p className="font-semibold text-slate-700">{selectedFee.feeType} ({selectedFee.month})</p>
                </div>
                <div>
                  <p className="text-[0.65rem] font-bold text-slate-400 uppercase tracking-widest">Amount Required</p>
                  <p className="font-extrabold text-indigo-600 text-lg">{formatCurrency(selectedFee.amount)}</p>
                </div>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Payment Channel</label>
              <div className="grid grid-cols-3 gap-3">
                {['Cash', 'Credit Card', 'Bank Transfer', 'UPI', 'Cheque'].map(method => (
                  <label key={method} className={`flex items-center justify-center p-3 rounded-xl border-2 cursor-pointer transition-all ${
                    paymentMethod === method ? 'border-primary bg-indigo-50/50 text-indigo-700 shadow-sm' : 'border-slate-100 hover:border-slate-300 text-slate-500'
                  }`}
                  onClick={() => setPaymentMethod(method)}
                  >
                    <span className="text-xs font-bold">{method}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Internal Memorandums / Ref</label>
              <input type="text" className="form-input" placeholder="e.g. Transaction ID, Cheque Number..." />
            </div>

            <div className="modal-footer -mx-6 -mb-6 mt-8">
              <button onClick={() => setPaymentModal(false)} className="btn btn-secondary">Terminate Auth</button>
              <button onClick={processPayment} className="btn btn-primary shadow-lg shadow-indigo-200">Execute Payment Finalization</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
