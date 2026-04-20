import { HiExclamation } from 'react-icons/hi';
import { useEffect } from 'react';

export default function ConfirmDialog({ isOpen, onClose, onConfirm, title, message }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content max-w-sm !p-0 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-8 text-center relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-rose-50 to-transparent -z-10" />
          
          <div className="w-16 h-16 rounded-full bg-rose-100 flex items-center justify-center mx-auto mb-5 shadow-inner shadow-rose-200/50 relative">
            <HiExclamation className="text-rose-600" size={32} />
            <div className="absolute inset-0 rounded-full border border-rose-200/60 animate-ping opacity-20" />
          </div>
          
          <h3 className="text-xl font-extrabold text-slate-800 mb-2 tracking-tight">
            {title || 'Confirm Action'}
          </h3>
          <p className="text-[0.9rem] font-medium text-slate-500 mb-8 leading-relaxed">
            {message || 'Are you sure you want to proceed? This action cannot be undone.'}
          </p>
          
          <div className="flex gap-3 justify-center">
            <button onClick={onClose} className="btn btn-secondary flex-1">
              Cancel
            </button>
            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className="btn btn-danger flex-1"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
