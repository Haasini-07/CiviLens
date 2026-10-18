import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type Tone = 'blue' | 'green' | 'amber' | 'red' | 'gray' | 'indigo';

const tones: Record<Tone, string> = {
  blue: 'bg-brand-50 text-brand-700 border-brand-200',
  green: 'bg-green-50 text-green-700 border-green-200',
  amber: 'bg-amber-50 text-amber-700 border-amber-200',
  red: 'bg-red-50 text-red-700 border-red-200',
  gray: 'bg-gray-100 text-gray-700 border-gray-200',
  indigo: 'bg-indigo-50 text-indigo-700 border-indigo-200',
};

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: Tone;
}

export function Badge({ className, tone = 'gray', ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-semibold',
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}
