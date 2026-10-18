import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  FileText,
  FileEdit,
  CalendarClock,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Input';
import { MetricCard } from '@/components/ui/MetricCard';
import { Skeleton } from '@/components/ui/State';
import { Tooltip } from '@/components/ui/Tooltip';
import { api } from '@/services/api';
import { user } from '@/services/mockData';
import type { ActivitySummary } from '@/types';

const examples = [
  'Why hasn’t the road near my house been repaired?',
  'How many public school teachers were hired in 2025?',
  'What is the status of my driving licence application?',
  'How many FIRs were registered in my district last month?',
];

export function DashboardPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [activity, setActivity] = useState<ActivitySummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    api.getActivity().then((a) => {
      setActivity(a);
      setLoading(false);
    });
  }, []);

  const handleSubmit = () => {
    setTouched(true);
    if (query.trim().length < 10) return;
    navigate(`/app/ask/results?q=${encodeURIComponent(query.trim())}`);
  };

  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    return 'Good evening';
  })();

  const metrics = [
    { label: 'Active RTIs', value: activity?.active ?? '—', icon: FileText, tone: 'blue' as const, sub: 'Awaiting response' },
    { label: 'Drafts', value: activity?.drafts ?? '—', icon: FileEdit, tone: 'gray' as const, sub: 'Not yet filed' },
    { label: 'Upcoming deadlines', value: activity?.upcomingDeadlines ?? '—', icon: CalendarClock, tone: 'amber' as const, sub: 'Within 30 days' },
    { label: 'Completed requests', value: activity?.completed ?? '—', icon: CheckCircle2, tone: 'green' as const, sub: 'Closed' },
  ];

  return (
    <div>
      <PageHeader
        title={`${greeting}, ${user.name.split(' ')[0]}`}
        description="Let’s make your RTI journey simpler."
      />

      {/* Primary action card */}
      <Card className="mb-8 overflow-hidden">
        <div className="border-b border-line bg-gradient-to-b from-brand-50/50 to-white px-6 py-5">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-brand-600" />
            <h2 className="text-lg font-bold text-ink">What information do you need?</h2>
          </div>
          <p className="mt-1 text-sm text-ink-muted">
            Describe your issue in your own words. CiviLens will recommend the right department and help you draft an RTI application.
          </p>
        </div>
        <CardContent className="pt-5">
          <Textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onBlur={() => setTouched(true)}
            placeholder="Describe your issue in your own words…  e.g. “Why hasn’t the road near my house been repaired?”"
            rows={4}
            invalid={touched && query.trim().length < 10}
            className="resize-none"
          />
          {touched && query.trim().length < 10 && (
            <p className="mt-2 text-xs font-medium text-red-600">
              Please describe your issue in at least 10 characters so we can match the right department.
            </p>
          )}
          <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-2">
              {examples.map((ex) => (
                <button
                  key={ex}
                  onClick={() => setQuery(ex)}
                  className="rounded-lg border border-line bg-white px-3 py-1.5 text-xs font-medium text-ink-muted hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700 transition-colors"
                >
                  {ex.length > 48 ? ex.slice(0, 48) + '…' : ex}
                </button>
              ))}
            </div>
            <Button onClick={handleSubmit} className="shrink-0">
              Find the right department
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Activity */}
      <div className="mb-4 flex items-center gap-2">
        <h2 className="text-lg font-bold text-ink">Your RTI activity</h2>
        <Tooltip content="A summary of your current RTI applications, drafts, and deadlines." />
      </div>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {metrics.map((m) => (
          <MetricCard
            key={m.label}
            label={m.label}
            value={loading ? <Skeleton className="h-7 w-12" /> : m.value}
            sub={m.sub}
            icon={<m.icon className="h-5 w-5" />}
            tone={m.tone}
          />
        ))}
      </div>

      {/* Quick links */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <QuickLink
          to="/app/my-rtis"
          title="View your RTIs"
          desc="See the status and timeline of every application you’ve filed."
          icon={FileText}
        />
        <QuickLink
          to="/app/transparency"
          title="Explore transparency data"
          desc="Check how responsive departments have been before you file."
          icon={CalendarClock}
        />
        <QuickLink
          to="/app/appeal"
          title="Appeal guidance"
          desc="Didn’t get a response? Learn what to do next."
          icon={CheckCircle2}
        />
      </div>
    </div>
  );
}

function QuickLink({ to, title, desc, icon: Icon }: { to: string; title: string; desc: string; icon: typeof FileText }) {
  return (
    <Link to={to}>
      <Card hoverable className="h-full p-5">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-ink flex items-center gap-1.5">
              {title}
              <ArrowRight className="h-3.5 w-3.5 text-ink-muted" />
            </h3>
            <p className="mt-1 text-sm text-ink-muted leading-relaxed">{desc}</p>
          </div>
        </div>
      </Card>
    </Link>
  );
}
