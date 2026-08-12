import { cn } from '@/lib/utils';

export function Logo({ className, showText = true }: { className?: string; showText?: boolean }) {
  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <svg viewBox="0 0 32 32" fill="none" className="h-8 w-8 shrink-0">
        <rect width="32" height="32" rx="7" fill="#1E3A8A" />
        <circle cx="16" cy="16" r="9" stroke="#60A5FA" strokeWidth="2.2" />
        <circle cx="16" cy="16" r="4" fill="#2563EB" />
        <path d="M16 4v3M16 25v3M4 16h3M25 16h3" stroke="#93C5FD" strokeWidth="2" strokeLinecap="round" />
      </svg>
      {showText && (
        <span className="text-lg font-bold text-ink tracking-tight leading-none">
          Civi<span className="text-brand-600">Lens</span>
        </span>
      )}
    </div>
  );
}
