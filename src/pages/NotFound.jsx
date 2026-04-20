import { Link } from 'react-router-dom';
import { HiHome } from 'react-icons/hi';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="text-center animate-fade-in">
        <h1 className="text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-violet-500 mb-4">
          404
        </h1>
        <h2 className="text-2xl font-bold text-slate-700 mb-2">
          Page Not Found
        </h2>
        <p className="text-sm text-slate-400 mb-8 max-w-md mx-auto">
          The page you are looking for doesn't exist or has been moved to another location.
        </p>
        <Link to="/dashboard" className="btn btn-primary btn-lg">
          <HiHome size={18} /> Go to Dashboard
        </Link>
      </div>
    </div>
  );
}
