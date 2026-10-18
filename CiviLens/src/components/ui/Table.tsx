import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface Column<T> {
  key: string;
  header: string;
  render: (row: T) => ReactNode;
  className?: string;
  hideOnMobile?: boolean;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (row: T) => void;
  rowKey: (row: T) => string;
}

export function Table<T>({ columns, data, onRowClick, rowKey }: TableProps<T>) {
  return (
    <>
      <div className="hidden md:block overflow-x-auto scrollbar-thin">
        <table className="w-full">
          <thead>
            <tr className="border-b border-line">
              {columns.map((c) => (
                <th
                  key={c.key}
                  className={cn(
                    'px-5 py-3 text-left text-xs font-semibold text-ink-muted uppercase tracking-wide',
                    c.className,
                  )}
                >
                  {c.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr
                key={rowKey(row)}
                onClick={() => onRowClick?.(row)}
                className={cn(
                  'border-b border-line last:border-0 transition-colors',
                  onRowClick && 'cursor-pointer hover:bg-silver/60',
                )}
              >
                {columns.map((c) => (
                  <td key={c.key} className={cn('px-5 py-4 text-sm text-ink', c.className)}>
                    {c.render(row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="md:hidden divide-y divide-line">
        {data.map((row) => (
          <div
            key={rowKey(row)}
            onClick={() => onRowClick?.(row)}
            className={cn('py-3.5 space-y-2', onRowClick && 'cursor-pointer')}
          >
            {columns.map((c) => (
              <div key={c.key} className="flex justify-between items-start gap-3">
                <span className="text-xs font-semibold text-ink-muted uppercase tracking-wide shrink-0">
                  {c.header}
                </span>
                <span className="text-sm text-ink text-right">{c.render(row)}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
