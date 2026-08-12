import { Badge } from './Badge';
import type { RTIStatus } from '@/types';

const map: Record<RTIStatus, { label: string; tone: 'blue' | 'green' | 'amber' | 'red' | 'gray' | 'indigo' }> = {
  draft: { label: 'Draft', tone: 'gray' },
  filed: { label: 'Filed', tone: 'blue' },
  acknowledged: { label: 'Acknowledged', tone: 'blue' },
  awaiting: { label: 'Awaiting response', tone: 'amber' },
  responded: { label: 'Responded', tone: 'green' },
  denied: { label: 'Denied', tone: 'red' },
  first_appeal: { label: 'First Appeal', tone: 'indigo' },
  closed: { label: 'Closed', tone: 'gray' },
};

export function StatusBadge({ status }: { status: RTIStatus }) {
  const { label, tone } = map[status];
  return <Badge tone={tone}>{label}</Badge>;
}
