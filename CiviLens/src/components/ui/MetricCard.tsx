import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface MetricCardProps {
  label: string;
  value: ReactNode;
  sub?: ReactNode;
  icon?: ReactNode;
  tone?: 'blue' | 'green' | 'amber' | 'red' | 'gray';
  className?: string;
}

const iconTones = {
  blue: 'bg-brand-50 text-brand-600',
  green: 'bg-green-50 text-green-600',
  amber: 'bg-amber-50 text-amber-600',
  red: 'bg-red-50 text-red-600',
  gray: 'bg-gray-100 text-gray-600',
};

export function MetricCard({ label, value, sub, icon, tone = 'blue', className }: MetricCardProps) {
  return (
    <div className={cn('rounded-xl border border-line bg-white p-5 shadow-card', className)}>
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-medium text-ink-muted">{label}</p>
        {icon && (
          <div className={cn('flex h-9 w-9 items-center justify-center rounded-lg', iconTones[tone])}>
            {icon}
          </div>
        )}
      </div>
      <p className="mt-3 text-2xl font-bold text-ink tracking-tight">{value}</p>
      {sub && <p className="mt-1 text-xs text-ink-muted">{sub}</p>}
    </div>
  );
}
