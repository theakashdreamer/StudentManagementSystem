import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  HiHome,
  HiUserGroup,
  HiAcademicCap,
  HiCollection,
  HiClipboardCheck,
  HiDocumentText,
  HiCurrencyRupee,
  HiSpeakerphone,
  HiX,
  HiLogout,
} from 'react-icons/hi';

const allNavItems = [
  { path: '/dashboard', label: 'Dashboard', icon: HiHome, roles: ['admin', 'teacher', 'student'] },
  { path: '/students', label: 'Students', icon: HiUserGroup, roles: ['admin', 'teacher'] },
  { path: '/teachers', label: 'Teachers', icon: HiAcademicCap, roles: ['admin'] },
  { path: '/classes', label: 'Classes & Subjects', icon: HiCollection, roles: ['admin'] },
  { path: '/attendance', label: 'Attendance', icon: HiClipboardCheck, roles: ['admin', 'teacher'] },
  { path: '/marks', label: 'Marks & Results', icon: HiDocumentText, roles: ['admin', 'teacher', 'student'] },
  { path: '/fees', label: 'Fee Management', icon: HiCurrencyRupee, roles: ['admin'] },
  { path: '/notices', label: 'Notice Board', icon: HiSpeakerphone, roles: ['admin', 'teacher', 'student'] },
];

export default function Sidebar({ isOpen, onClose }) {
  const { userRole, demoLogout } = useAuth();
  const location = useLocation();

  const navItems = allNavItems.filter((item) =>
    item.roles.includes(userRole)
  );

  return (
    <>
      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-30 lg:hidden transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      <aside className={`sidebar flex flex-col ${isOpen ? 'open' : ''}`}>
        {/* Logo */}
        <div className="h-[72px] flex items-center justify-between px-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <HiAcademicCap className="text-white" size={22} />
            </div>
            <div>
              <h1 className="text-white font-bold text-lg tracking-tight">
                EduManager
              </h1>
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden w-8 h-8 rounded-lg flex items-center justify-center text-white/60 hover:bg-white/10 hover:text-white transition-colors"
          >
            <HiX size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 overflow-y-auto">
          <p className="px-4 mb-4 text-xs font-bold text-indigo-200/50 uppercase tracking-widest">
            Main Menu
          </p>
          <div className="space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `sidebar-link relative ${isActive ? 'active' : ''}`
                }
              >
                <item.icon size={20} className={({ isActive }) => isActive ? 'text-indigo-300' : 'text-slate-400'} />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </div>
        </nav>

        {/* Bottom section */}
        <div className="p-4 border-t border-white/10 bg-black/10">
          <button
            onClick={demoLogout}
            className="sidebar-link w-full text-rose-300 hover:text-white hover:bg-rose-500/20"
          >
            <HiLogout size={20} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
