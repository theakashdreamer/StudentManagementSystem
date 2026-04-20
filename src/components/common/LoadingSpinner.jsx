export default function LoadingSpinner({ size = 'md', text = 'Loading...' }) {
  const sizes = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
  };

  return (
    <div className="flex flex-col items-center justify-center py-12 gap-4">
      <div className={`${sizes[size]} relative flex items-center justify-center`}>
        {/* Outer rotating ring */}
        <div className="absolute inset-0 rounded-full border-[3px] border-indigo-500/20" />
        <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-indigo-500 border-r-indigo-500 animate-spin" />
        
        {/* Inner pulsing dot */}
        <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
      </div>
      {text && <p className="text-[0.8rem] font-bold text-slate-400 tracking-wider uppercase">{text}</p>}
    </div>
  );
}
