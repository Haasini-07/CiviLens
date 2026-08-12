import { useEffect, useRef, useState, type ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DropdownProps {
  trigger: ReactNode;
  children: ReactNode;
  align?: 'left' | 'right';
  className?: string;
}

export function Dropdown({ trigger, children, align = 'right', className }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button onClick={() => setOpen((o) => !o)} className="focus-ring rounded-lg" aria-haspopup="menu">
        {trigger}
      </button>
      {open && (
        <div
          className={cn(
            'absolute top-full mt-2 min-w-[200px] rounded-xl border border-line bg-white shadow-pop py-1.5 animate-scale-in z-30',
            align === 'right' ? 'right-0' : 'left-0',
            className,
          )}
          onClick={() => setOpen(false)}
        >
          {children}
        </div>
      )}
    </div>
  );
}

export function DropdownItem({
  children,
  onClick,
  className,
  ...props
}: React.HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex w-full items-center gap-2.5 px-3.5 py-2 text-sm text-ink hover:bg-silver transition-colors text-left',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function DropdownLabel({ children }: { children: ReactNode }) {
  return <div className="px-3.5 py-1.5 text-xs font-semibold text-ink-muted uppercase tracking-wide">{children}</div>;
}

export function DropdownSeparator() {
  return <div className="my-1 h-px bg-line" />;
}

export function DropdownTriggerChevron({ open }: { open?: boolean }) {
  return <ChevronDown className={cn('h-4 w-4 text-ink-muted transition-transform', open && 'rotate-180')} />;
}
