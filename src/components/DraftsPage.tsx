import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import {
  ArrowRight,
  ArrowLeft,
  Building2,
  MapPin,
  User,
  ShieldCheck,
  Info,
  AlertTriangle,
  CheckCircle2,
} from 'lucide-react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/Progress';
import { LoadingState, EmptyState } from '@/components/ui/State';
import { Tooltip } from '@/components/ui/Tooltip';
import { api } from '@/services/api';
import type { Recommendation } from '@/types';

const levelTone = {
  high: { label: 'High confidence', tone: 'green' as const, bar: 'green' as const },
  medium: { label: 'Medium confidence', tone: 'amber' as const, bar: 'amber' as const },
  low: { label: 'Lower confidence', tone: 'gray' as const, bar: 'blue' as const },
};

export function RecommendationPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const query = params.get('q') ?? '';
  const [recs, setRecs] = useState<Recommendation[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!query) {
      setLoading(false);
      return;
    }
    setLoading(true);
    api.recommend(query).then((r) => {
      setRecs(r);
      setLoading(false);
    });
  }, [query]);

  if (!query) {
    return (
      <EmptyState
        icon={<Info className="h-7 w-7" />}
        title="No query provided"
        description="Describe the information you need and we’ll find the right department."
        action={
          <Button onClick={() => navigate('/app/ask')}>
            Ask CiviLens
            <ArrowRight className="h-4 w-4" />
          </Button>
        }
      />
    );
  }

  return (
    <div>
      <PageHeader
        title="We found the most relevant departments"
        description={
          <>
            Recommended based on your query: <span className="font-semibold text-ink">“{query}”</span>
          </>
        }
        actions={
          <Button variant="outline" onClick={() => navigate('/app/ask')}>
            <ArrowLeft className="h-4 w-4" />
            Refine query
          </Button>
        }
      />

      {/* Disclaimer */}
      <div className="mb-6 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3.5">
        <AlertTriangle className="h-5 w-5 shrink-0 text-amber-600 mt-0.5" />
        <p className="text-sm text-amber-800 leading-relaxed">
          <span className="font-semibold">Recommended based on your query.</span> CiviLens is not a
          government portal and this is not legal advice. Please verify the department and PIO before filing.
        </p>
      </div>

      {loading ? (
        <LoadingState label="Finding the right departments…" />
      ) : recs && recs.length > 0 ? (
        <div className="space-y-6">
          {/* Top recommendation */}
          <RecommendationCard rec={recs[0]} primary onDraft={() => navigate(`/app/drafts/new?dept=${recs[0].department.id}&q=${encodeURIComponent(query)}`)} />

          {/* Other possibilities */}
          {recs.length > 1 && (
            <div>
              <h2 className="mb-3 text-base font-semibold text-ink">Other possible departments</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {recs.slice(1).map((rec) => (
                  <RecommendationCard
                    key={rec.department.id}
                    rec={rec}
                    onDraft={() => navigate(`/app/drafts/new?dept=${rec.department.id}&q=${encodeURIComponent(query)}`)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Transparency link */}
          <Card hoverable className="p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-ink">Check transparency before you file</h3>
                  <p className="mt-0.5 text-sm text-ink-muted">
                    See how responsive {recs[0].department.name} has been historically.
                  </p>
                </div>
              </div>
              <Link to={`/app/transparency?dept=${recs[0].department.id}`}>
                <Button variant="outline" size="sm" className="shrink-0">
                  View transparency
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      ) : (
        <EmptyState
          icon={<Building2 className="h-7 w-7" />}
          title="No matches found"
          description="We couldn’t find a department matching your query. Try rephrasing your question."
          action={<Button onClick={() => navigate('/app/ask')}>Try again</Button>}
        />
      )}
    </div>
  );
}

function RecommendationCard({
  rec,
  primary,
  onDraft,
}: {
  rec: Recommendation;
  primary?: boolean;
  onDraft: () => void;
}) {
  const { department, confidence, reasons, level } = rec;
  const meta = levelTone[level];

  return (
    <Card className={primary ? 'border-brand-200 shadow-card-hover' : ''} hoverable={!primary}>
      {primary && (
        <div className="flex items-center gap-2 border-b border-brand-100 bg-brand-50/50 px-6 py-2.5">
          <CheckCircle2 className="h-4 w-4 text-brand-600" />
          <span className="text-xs font-semibold text-brand-700 uppercase tracking-wide">Best match</span>
        </div>
      )}
      <CardContent className="pt-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-silver text-brand-600">
                <Building2 className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-ink">{department.name}</h3>
                <p className="text-xs text-ink-muted">{department.parentAuthority}</p>
              </div>
            </div>
            <p className="mt-3 text-sm text-ink-muted leading-relaxed">{department.description}</p>
          </div>

          {/* Confidence */}
          <div className="lg:w-48 shrink-0">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-semibold text-ink-muted uppercase tracking-wide">Confidence</span>
              <span className="text-lg font-bold text-ink">{confidence}%</span>
            </div>
            <Progress value={confidence} tone={meta.bar} />
            <div className="mt-2">
              <Badge tone={meta.tone}>{meta.label}</Badge>
            </div>
          </div>
        </div>

        {/* Reasons */}
        <div className="mt-5 rounded-lg border border-line bg-silver/40 p-4">
          <p className="text-xs font-semibold text-ink-muted uppercase tracking-wide mb-2">Why this department</p>
          <ul className="space-y-1.5">
            {reasons.map((r, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-ink">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                {r}
              </li>
            ))}
          </ul>
        </div>

        {/* PIO info */}
        {department.pio && (
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="flex items-start gap-2.5 rounded-lg border border-line p-3">
              <User className="h-4 w-4 text-brand-600 mt-0.5 shrink-0" />
              <div>
                <div className="flex items-center gap-1.5">
                  <p className="text-xs font-semibold text-ink-muted uppercase tracking-wide">
                    PIO
                  </p>
                  <Tooltip content="Public Information Officer — the official responsible for handling RTI requests in a department." />
                </div>
                <p className="mt-0.5 text-sm font-medium text-ink">{department.pio.name}</p>
                <p className="text-xs text-ink-muted">{department.pio.title}</p>
              </div>
            </div>
            <div className="flex items-start gap-2.5 rounded-lg border border-line p-3">
              <MapPin className="h-4 w-4 text-brand-600 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-semibold text-ink-muted uppercase tracking-wide">Address</p>
                <p className="mt-0.5 text-sm text-ink leading-snug">{department.pio.address}</p>
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="mt-5 flex flex-col gap-2 sm:flex-row">
          <Button onClick={onDraft} className="flex-1 sm:flex-none">
            Draft an RTI for this department
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Link to={`/app/transparency?dept=${department.id}`} className="sm:ml-auto">
            <Button variant="outline" size="md" className="w-full sm:w-auto">
              View transparency
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
