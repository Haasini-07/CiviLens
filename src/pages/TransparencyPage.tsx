import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Clock,
  CheckCircle2,
  XCircle,
  TrendingUp,
  TrendingDown,
  Minus,
  Info,
} from 'lucide-react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { MetricCard } from '@/components/ui/MetricCard';
import { LoadingState, ErrorState, Skeleton } from '@/components/ui/State';
import { ResponseTrendChart, FilingVolumeChart } from '@/components/ui/Chart';
import { api } from '@/services/api';
import { departments as deptList } from '@/services/mockData';
import type { Department } from '@/types';

const trendMeta = {
  improving: { icon: TrendingUp, tone: 'green' as const, label: 'Improving', desc: 'Response times are getting faster.' },
  stable: { icon: Minus, tone: 'amber' as const, label: 'Stable', desc: 'Response times have remained consistent.' },
  declining: { icon: TrendingDown, tone: 'red' as const, label: 'Declining', desc: 'Response times are getting slower.' },
};

export function TransparencyPage() {
  const [params, setParams] = useSearchParams();
  const selectedId = params.get('dept') ?? 'municipal';
  const [dept, setDept] = useState<Department | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    api.getDepartment(selectedId).then((d) => {
      if (d) {
        setDept(d);
      } else {
        setError(true);
      }
      setLoading(false);
    });
  }, [selectedId]);

  const selectDept = (id: string) => {
    setParams({ dept: id });
  };

  const TrendIcon = dept ? trendMeta[dept.transparency.trend].icon : Minus;

  return (
    <div>
      <PageHeader
        title="Department Transparency"
        description="See how responsive government departments have been historically. This is public accountability data — not financial analytics."
      />

      {/* Department selector */}
      <div className="mb-6 flex flex-wrap gap-2">
        {deptList.map((d) => (
          <button
            key={d.id}
            onClick={() => selectDept(d.id)}
            className={
              'rounded-lg border px-4 py-2 text-sm font-medium transition-colors ' +
              (d.id === selectedId
                ? 'border-brand-600 bg-brand-600 text-white shadow-sm'
                : 'border-line bg-white text-ink-muted hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700')
            }
          >
            {d.shortName}
          </button>
        ))}
      </div>

      {loading ? (
        <div>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 mb-6">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="p-5">
                <Skeleton className="h-4 w-24 mb-3" />
                <Skeleton className="h-8 w-16" />
              </Card>
            ))}
          </div>
          <Card className="p-6"><Skeleton className="h-72 w-full" /></Card>
        </div>
      ) : error || !dept ? (
        <ErrorState message="We couldn’t load transparency data for this department." onRetry={() => selectDept('municipal')} />
      ) : (
        <div className="animate-fade-in">
          {/* Selected department header */}
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
              <Info className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-ink">{dept.name}</h2>
              <p className="text-sm text-ink-muted">{dept.parentAuthority}</p>
            </div>
          </div>

          {/* Metric cards */}
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 mb-6">
            <MetricCard
              label="Average response time"
              value={`${dept.transparency.avgResponseDays} days`}
              icon={<Clock className="h-5 w-5" />}
              tone="blue"
            />
            <MetricCard
              label="Answered within 30 days"
              value={`${dept.transparency.answeredWithin30DaysPct}%`}
              icon={<CheckCircle2 className="h-5 w-5" />}
              tone="green"
            />
            <MetricCard
              label="Denial rate"
              value={`${dept.transparency.denialRatePct}%`}
              icon={<XCircle className="h-5 w-5" />}
              tone="red"
            />
            <MetricCard
              label="Historical trend"
              value={trendMeta[dept.transparency.trend].label}
              icon={<TrendIcon className="h-5 w-5" />}
              tone={trendMeta[dept.transparency.trend].tone}
            />
          </div>

          {/* Charts */}
          <div className="grid gap-4 lg:grid-cols-2 mb-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-base font-semibold text-ink">Average response time</h3>
                <p className="mt-1 text-sm text-ink-muted">Days taken to respond, by month</p>
                <div className="mt-4">
                  <ResponseTrendChart data={dept.transparency.monthly} />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-base font-semibold text-ink">Filings vs. responses</h3>
                <p className="mt-1 text-sm text-ink-muted">Applications filed and answered, by month</p>
                <div className="mt-4">
                  <FilingVolumeChart data={dept.transparency.monthly} />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* What these numbers mean */}
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-base font-semibold text-ink mb-4">What these numbers mean</h3>
              <div className="space-y-4">
                <Explanation
                  icon={<Clock className="h-5 w-5" />}
                  tone="blue"
                  title={`Average response time: ${dept.transparency.avgResponseDays} days`}
                  desc={`On average, this department responds to RTI applications in ${dept.transparency.avgResponseDays} days. The law requires a response within 30 days, so a lower number is better.`}
                />
                <Explanation
                  icon={<CheckCircle2 className="h-5 w-5" />}
                  tone="green"
                  title={`Answered within 30 days: ${dept.transparency.answeredWithin30DaysPct}%`}
                  desc={`${dept.transparency.answeredWithin30DaysPct}% of applications received a response within the statutory 30-day window. A higher percentage means the department is more timely.`}
                />
                <Explanation
                  icon={<XCircle className="h-5 w-5" />}
                  tone="red"
                  title={`Denial rate: ${dept.transparency.denialRatePct}%`}
                  desc={`${dept.transparency.denialRatePct}% of applications were denied. A lower rate generally means the department is more forthcoming with information. Some denials may be legally valid.`}
                />
                <Explanation
                  icon={<TrendIcon className="h-5 w-5" />}
                  tone={trendMeta[dept.transparency.trend].tone}
                  title={`Trend: ${trendMeta[dept.transparency.trend].label}`}
                  desc={trendMeta[dept.transparency.trend].desc}
                />
              </div>
            </CardContent>
          </Card>

          {/* Disclaimer */}
          <div className="mt-6 rounded-xl border border-line bg-silver/40 px-4 py-3.5">
            <p className="text-sm text-ink-muted leading-relaxed">
              These figures are based on aggregated historical data and are intended to help you set
              realistic expectations. They do not guarantee how your specific application will be handled.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function Explanation({
  icon,
  tone,
  title,
  desc,
}: {
  icon: React.ReactNode;
  tone: 'blue' | 'green' | 'amber' | 'red';
  title: string;
  desc: string;
}) {
  const tones = {
    blue: 'bg-brand-50 text-brand-600',
    green: 'bg-green-50 text-green-600',
    amber: 'bg-amber-50 text-amber-600',
    red: 'bg-red-50 text-red-600',
  };
  return (
    <div className="flex items-start gap-3.5">
      <div className={'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ' + tones[tone]}>
        {icon}
      </div>
      <div>
        <p className="text-sm font-semibold text-ink">{title}</p>
        <p className="mt-0.5 text-sm text-ink-muted leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}
