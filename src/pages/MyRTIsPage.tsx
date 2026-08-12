import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  CalendarClock,
  ArrowRight,
  Gavel,
  CheckCircle2,
  Clock,
  Info,
} from 'lucide-react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Table } from '@/components/ui/Table';
import { Timeline } from '@/components/ui/Timeline';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { LoadingState, EmptyState, Skeleton } from '@/components/ui/State';
import { Tooltip } from '@/components/ui/Tooltip';
import { api } from '@/services/api';
import type { RTIRequest } from '@/types';

function daysUntil(dateStr: string): number {
  const target = new Date(dateStr);
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

export function MyRTIsPage() {
  const [rtis, setRtis] = useState<RTIRequest[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.listRTIs().then((r) => {
      setRtis(r);
      setLoading(false);
    });
  }, []);

  const activeRTIs = rtis?.filter((r) => ['awaiting', 'filed', 'acknowledged', 'first_appeal'].includes(r.status)) ?? [];
  const upcoming = activeRTIs
    .map((r) => ({ r, days: daysUntil(r.responseDeadline) }))
    .filter((x) => x.days >= 0)
    .sort((a, b) => a.days - b.days)[0];

  const columns = [
    {
      key: 'id',
      header: 'RTI ID',
      render: (r: RTIRequest) => <span className="font-semibold text-brand-600">{r.id}</span>,
    },
    {
      key: 'subject',
      header: 'Subject',
      render: (r: RTIRequest) => (
        <div>
          <p className="font-medium text-ink">{r.subject}</p>
          <p className="text-xs text-ink-muted mt-0.5">{r.departmentName}</p>
        </div>
      ),
    },
    {
      key: 'filed',
      header: 'Filed',
      render: (r: RTIRequest) => <span className="text-ink-muted">{formatDate(r.filedDate)}</span>,
      hideOnMobile: true,
    },
    {
      key: 'deadline',
      header: 'Deadline',
      render: (r: RTIRequest) => <span className="text-ink-muted">{formatDate(r.responseDeadline)}</span>,
      hideOnMobile: true,
    },
    {
      key: 'status',
      header: 'Status',
      render: (r: RTIRequest) => <StatusBadge status={r.status} />,
    },
    {
      key: 'action',
      header: 'Next action',
      render: (r: RTIRequest) => <NextAction r={r} />,
      hideOnMobile: true,
    },
  ];

  return (
    <div>
      <PageHeader
        title="My RTIs"
        description="Track every RTI application you’ve filed — from submission to response, and appeal if needed."
        actions={
          <Link to="/app/ask">
            <Button>
              <FileText className="h-4 w-4" />
              New RTI
            </Button>
          </Link>
        }
      />

      {/* Countdown banner */}
      {!loading && upcoming && (
        <Card className="mb-6 overflow-hidden border-amber-200">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-amber-50/50 px-6 py-5">
            <div className="flex items-start gap-3.5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-600">
                <CalendarClock className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-semibold text-ink">
                  {upcoming.days} day{upcoming.days !== 1 ? 's' : ''} remaining
                </p>
                <p className="text-sm text-ink-muted mt-0.5">
                  <span className="font-medium text-ink">{upcoming.r.id}</span> — {upcoming.r.subject}
                </p>
                <p className="text-xs text-ink-muted mt-0.5">
                  Response deadline: {formatDate(upcoming.r.responseDeadline)}
                </p>
              </div>
            </div>
            <Link to="/app/deadlines">
              <Button variant="outline" size="sm" className="shrink-0">
                View timeline
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </Card>
      )}

      {loading ? (
        <Card><div className="p-6"><LoadingState label="Loading your RTIs…" /></div></Card>
      ) : rtis && rtis.length > 0 ? (
        <Card>
          <Table
            columns={columns}
            data={rtis}
            rowKey={(r) => r.id}
          />
        </Card>
      ) : (
        <Card>
          <EmptyState
            icon={<FileText className="h-7 w-7" />}
            title="No RTIs yet"
            description="When you file an RTI, it will appear here with a tracking timeline and deadline countdown."
            action={
              <Link to="/app/ask">
                <Button>
                  Start your first RTI
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            }
          />
        </Card>
      )}
    </div>
  );
}

function NextAction({ r }: { r: RTIRequest }) {
  const days = daysUntil(r.responseDeadline);
  if (r.status === 'awaiting') {
    return (
      <span className="text-sm text-ink-muted">
        {days > 0 ? `Wait ${days} more days` : 'Deadline passed'}
      </span>
    );
  }
  if (r.status === 'first_appeal') {
    return <span className="text-sm font-medium text-indigo-600">Awaiting appeal decision</span>;
  }
  if (r.status === 'responded' || r.status === 'closed') {
    return <span className="text-sm text-green-600">Completed</span>;
  }
  return <span className="text-sm text-ink-muted">—</span>;
}

export function DeadlinesPage() {
  const [rtis, setRtis] = useState<RTIRequest[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.listRTIs().then((r) => {
      setRtis(r);
      setLoading(false);
    });
  }, []);

  const active = rtis?.filter((r) => ['awaiting', 'filed', 'acknowledged', 'first_appeal'].includes(r.status)) ?? [];

  return (
    <div>
      <PageHeader
        title="Deadlines"
        description="Track the 30-day statutory response window for each RTI. If a deadline passes, we’ll guide you through the First Appeal."
      />

      {loading ? (
        <div className="grid gap-4 lg:grid-cols-2">
          {[...Array(2)].map((_, i) => (
            <Card key={i} className="p-6">
              <Skeleton className="h-6 w-32 mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4 mb-4" />
              <Skeleton className="h-32 w-full" />
            </Card>
          ))}
        </div>
      ) : active.length > 0 ? (
        <div className="grid gap-4 lg:grid-cols-2">
          {active.map((r) => {
            const days = daysUntil(r.responseDeadline);
            const total = 30;
            const elapsed = total - days;
            const pct = Math.max(0, Math.min(100, (elapsed / total) * 100));
            return (
              <Card key={r.id} hoverable>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-brand-600">{r.id}</span>
                        <StatusBadge status={r.status} />
                      </div>
                      <p className="mt-1 text-sm font-medium text-ink">{r.subject}</p>
                      <p className="text-xs text-ink-muted mt-0.5">{r.departmentName}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className={'text-2xl font-bold ' + (days <= 5 ? 'text-red-600' : days <= 14 ? 'text-amber-600' : 'text-ink')}>
                        {days > 0 ? days : 0}
                      </p>
                      <p className="text-xs text-ink-muted">days left</p>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="mb-1.5 flex justify-between text-xs text-ink-muted">
                    <span>Filed {formatDate(r.filedDate)}</span>
                    <span>Deadline {formatDate(r.responseDeadline)}</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                    <div
                      className={'h-full rounded-full transition-all ' + (days <= 5 ? 'bg-red-500' : days <= 14 ? 'bg-amber-500' : 'bg-brand-600')}
                      style={{ width: `${pct}%` }}
                    />
                  </div>

                  {/* Timeline */}
                  <div className="mt-5 border-t border-line pt-5">
                    <Timeline items={r.timeline} />
                  </div>

                  {days <= 0 && r.status !== 'first_appeal' && (
                    <div className="mt-5 flex items-start gap-3 rounded-lg border border-indigo-200 bg-indigo-50 px-4 py-3">
                      <Gavel className="h-5 w-5 shrink-0 text-indigo-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-indigo-800">Deadline has passed</p>
                        <p className="text-sm text-indigo-700 mt-0.5">You can now file a First Appeal.</p>
                        <Link to="/app/appeal" className="mt-2 inline-block">
                          <Button size="sm" className="mt-1">
                            View appeal guidance
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card>
          <EmptyState
            icon={<CheckCircle2 className="h-7 w-7" />}
            title="No active deadlines"
            description="You have no RTIs awaiting a response. All deadlines have been met."
          />
        </Card>
      )}

      {/* Info */}
      <div className="mt-6 flex items-start gap-3 rounded-xl border border-line bg-silver/40 px-4 py-3.5">
        <Info className="h-5 w-5 shrink-0 text-ink-muted mt-0.5" />
        <p className="text-sm text-ink-muted leading-relaxed">
          <span className="font-semibold text-ink">Statutory deadline</span>{' '}
          <Tooltip content="The 30-day period within which a PIO must respond to your RTI application by law." />
          {' '}— the PIO must respond within 30 days of receiving your application. If they don’t, you can file a First Appeal within 30 days of the deadline.
        </p>
      </div>
    </div>
  );
}
