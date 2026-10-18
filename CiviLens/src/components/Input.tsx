import { cn } from '@/lib/utils';
export function Logo({ className, showText = true }: { className?: string; showText?: boolean }) {
  return <div className={cn('flex items-center gap-2.5', className)}>
    <svg viewBox="0 0 38 38" fill="none" className="h-9 w-9 shrink-0" aria-hidden="true">
      <rect x="1" y="1" width="36" height="36" rx="9" fill="#1E3A8A"/>
      <path d="M19 7.5v23M7.5 19h23" stroke="#93C5FD" strokeWidth="1.4" opacity=".75"/>
      <circle cx="19" cy="19" r="9.2" stroke="#fff" strokeWidth="1.8"/>
      <circle cx="19" cy="19" r="4.2" fill="#2563EB" stroke="#DBEAFE" strokeWidth="1.5"/>
      <circle cx="19" cy="19" r="1.3" fill="white"/>
    </svg>
    {showText && <div><span className="block text-[19px] font-extrabold tracking-tight text-slate-900">Civi<span className="text-brand-600">Lens</span></span><span className="block text-[8px] font-bold uppercase tracking-[.14em] text-slate-400">Civic Information</span></div>}
  </div>;
}
