import { cn } from '@/lib/utils';

interface ProgressProps {
  value: number;
  max?: number;
  className?: string;
  tone?: 'blue' | 'green' | 'amber' | 'red';
}

const tones = {
  blue: 'bg-brand-600',
  green: 'bg-green-600',
  amber: 'bg-amber-500',
  red: 'bg-red-500',
};

export function Progress({ value, max = 100, className, tone = 'blue' }: ProgressProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div className={cn('h-2 w-full overflow-hidden rounded-full bg-gray-100', className)}>
      <div
        className={cn('h-full rounded-full transition-all duration-500', tones[tone])}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
