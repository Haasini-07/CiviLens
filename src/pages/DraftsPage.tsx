import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileEdit, ArrowRight, Clock } from 'lucide-react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { LoadingState, EmptyState } from '@/components/ui/State';
import { api } from '@/services/api';
import type { Draft } from '@/types';

export function DraftsPage() {
  const navigate = useNavigate();
  const [drafts, setDrafts] = useState<Draft[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.listDrafts().then((d) => {
      setDrafts(d);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <PageHeader
        title="Drafts"
        description="Your saved RTI application drafts. Review, edit, and download them before submitting."
        actions={
          <Button onClick={() => navigate('/app/ask')}>
            <FileEdit className="h-4 w-4" />
            New draft
          </Button>
        }
      />

      {loading ? (
        <Card><div className="p-6"><LoadingState label="Loading drafts…" /></div></Card>
      ) : drafts && drafts.length > 0 ? (
        <div className="grid gap-4 lg:grid-cols-2">
          {drafts.map((d) => (
            <Card key={d.id} hoverable>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                      <FileEdit className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="text-sm font-bold text-brand-600">{d.id}</span>
                      <p className="text-xs text-ink-muted">Updated {new Date(d.updatedAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                    </div>
                  </div>
                  <Badge tone="gray">Draft</Badge>
                </div>
                <h3 className="text-base font-semibold text-ink">{d.subject}</h3>
                <p className="mt-1 text-sm text-ink-muted leading-relaxed line-clamp-2">{d.summary}</p>
                <div className="mt-3 flex items-center gap-2 text-xs text-ink-muted">
                  <span className="font-medium">{d.departmentName}</span>
                </div>
                <div className="mt-5 flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-xs text-ink-muted">
                    <Clock className="h-3.5 w-3.5" />
                    {d.questions.length} questions
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(`/app/drafts/new?dept=${d.departmentId}&q=${encodeURIComponent(d.subject)}`)}
                  >
                    Open draft
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <EmptyState
            icon={<FileEdit className="h-7 w-7" />}
            title="No drafts yet"
            description="Describe the information you need and we’ll help you generate a structured RTI application."
            action={
              <Button onClick={() => navigate('/app/ask')}>
                Start a new draft
                <ArrowRight className="h-4 w-4" />
              </Button>
            }
          />
        </Card>
      )}
    </div>
  );
}
