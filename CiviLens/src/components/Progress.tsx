import { cn } from '@/lib/utils';

export interface TimelineItem {
  label: string;
  date?: string;
  done: boolean;
  current?: boolean;
}

interface TimelineProps {
  items: TimelineItem[];
  className?: string;
}

export function Timeline({ items, className }: TimelineProps) {
  return (
    <ol className={cn('space-y-0', className)}>
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <li key={i} className="relative pl-8 pb-6 last:pb-0">
            {!isLast && (
              <span
                className={cn(
                  'absolute left-[11px] top-6 bottom-0 w-px',
                  item.done ? 'bg-brand-300' : 'bg-line',
                )}
              />
            )}
            <span
              className={cn(
                'absolute left-0 top-0.5 flex h-6 w-6 items-center justify-center rounded-full border-2 text-[10px] font-bold',
                item.done && 'border-brand-600 bg-brand-600 text-white',
                item.current && !item.done && 'border-brand-600 bg-white text-brand-600',
                !item.done && !item.current && 'border-line bg-white text-gray-400',
              )}
            >
              {item.done ? '✓' : i + 1}
            </span>
            <div className="pt-0.5">
              <p
                className={cn(
                  'text-sm font-semibold',
                  item.done || item.current ? 'text-ink' : 'text-gray-400',
                )}
              >
                {item.label}
              </p>
              {item.date && (
                <p className="text-xs text-ink-muted mt-0.5">{item.date}</p>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
