import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Copy,
  Download,
  FileEdit,
  RotateCcw,
  Check,
  Info,
  Building2,
  ListChecks,
  FileText,
  ArrowLeft,
} from 'lucide-react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { LoadingState, EmptyState } from '@/components/ui/State';
import { useToast } from '@/components/ui/Toast';
import { api } from '@/services/api';
import { getDepartment } from '@/services/mockData';
import type { Draft } from '@/types';

export function DraftAssistantPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const toast = useToast();
  const deptId = params.get('dept');
  const query = params.get('q');

  const [draft, setDraft] = useState<Draft | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!deptId) {
      setLoading(false);
      return;
    }
    const dept = getDepartment(deptId);
    if (!dept) {
      setLoading(false);
      return;
    }
    api.getDraft('DRAFT-001').then((d) => {
      if (d) {
        setDraft({
          ...d,
          departmentId: dept.id,
          departmentName: dept.name,
          pioName: dept.pio?.name ?? d.pioName,
          pioAddress: dept.pio?.address ?? d.pioAddress,
          subject: query ? query.replace(/^why\b/i, 'Status of').replace(/\?$/, '') : d.subject,
          summary: query ? `Requesting information regarding: ${query}` : d.summary,
        });
      }
      setLoading(false);
    });
  }, [deptId, query]);

  const handleCopy = () => {
    if (!draft) return;
    const text = buildDraftText(draft);
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast('success', 'Draft copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!draft) return;
    const text = buildDraftText(draft);
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `RTI_Application_${draft.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast('success', 'Draft downloaded');
  };

  if (loading) return <LoadingState label="Generating your RTI draft…" />;
  if (!draft) {
    return (
      <EmptyState
        icon={<FileText className="h-7 w-7" />}
        title="No draft to show"
        description="Find a department first, then we’ll help you draft an RTI application."
        action={
          <Button onClick={() => navigate('/app/ask')}>
            <ArrowLeft className="h-4 w-4" />
            Back to Ask CiviLens
          </Button>
        }
      />
    );
  }

  return (
    <div>
      <PageHeader
        title="Your RTI Draft"
        description="A structured RTI application based on your query. Review and edit before submitting."
        actions={
          <Button variant="outline" onClick={() => navigate('/app/ask')}>
            <RotateCcw className="h-4 w-4" />
            Start over
          </Button>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        {/* Left sidebar */}
        <div className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-3">
                <FileText className="h-4 w-4 text-brand-600" />
                <h3 className="text-sm font-semibold text-ink">Request summary</h3>
              </div>
              <p className="text-sm text-ink-muted leading-relaxed">{draft.summary}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-3">
                <Building2 className="h-4 w-4 text-brand-600" />
                <h3 className="text-sm font-semibold text-ink">Department</h3>
              </div>
              <p className="text-sm font-medium text-ink">{draft.departmentName}</p>
              <p className="mt-1 text-xs text-ink-muted">{draft.pioName}</p>
              <p className="text-xs text-ink-muted">{draft.pioAddress}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-3">
                <ListChecks className="h-4 w-4 text-brand-600" />
                <h3 className="text-sm font-semibold text-ink">Key information</h3>
              </div>
              <ul className="space-y-2">
                {draft.keyInfo.map((k, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-ink-muted">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                    {k}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-sm font-semibold text-ink mb-3">Suggested questions</h3>
              <ul className="space-y-2">
                {draft.questions.map((q, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-ink-muted">
                    <span className="text-xs font-bold text-brand-600 mt-0.5">{i + 1}.</span>
                    {q}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Main document */}
        <div>
          <Card>
            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-2 border-b border-line px-5 py-3">
              <Button variant="outline" size="sm">
                <FileEdit className="h-4 w-4" />
                Edit draft
              </Button>
              <Button variant="outline" size="sm" onClick={handleCopy}>
                {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                {copied ? 'Copied' : 'Copy'}
              </Button>
              <Button variant="outline" size="sm" onClick={handleDownload}>
                <Download className="h-4 w-4" />
                Download
              </Button>
              <Badge tone="gray" className="ml-auto">Draft · {draft.id}</Badge>
            </div>

            {/* Document */}
            <div className="px-6 py-8 sm:px-10 sm:py-10 bg-white">
              <div className="mx-auto max-w-2xl">
                {/* Header */}
                <div className="text-center pb-6 border-b border-line">
                  <h1 className="text-xl font-bold text-ink tracking-tight">Right to Information Application</h1>
                  <p className="mt-1 text-xs text-ink-muted">Under the Right to Information Act, 2005</p>
                </div>

                {/* To */}
                <div className="mt-6 space-y-4 text-sm leading-relaxed">
                  <div>
                    <p className="text-xs font-semibold text-ink-muted uppercase tracking-wide mb-1">To</p>
                    <p className="text-ink font-medium">{draft.pioName}</p>
                    <p className="text-ink-muted">{draft.pioAddress}</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs font-semibold text-ink-muted uppercase tracking-wide mb-1">From</p>
                      <p className="text-ink font-medium">{draft.applicantName}</p>
                      <p className="text-ink-muted">{draft.applicantAddress}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-ink-muted uppercase tracking-wide mb-1">Date</p>
                      <p className="text-ink">{new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-ink-muted uppercase tracking-wide mb-1">Subject</p>
                    <p className="text-ink font-medium">{draft.subject}</p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-ink-muted uppercase tracking-wide mb-1">Department</p>
                    <p className="text-ink">{draft.departmentName}</p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-ink-muted uppercase tracking-wide mb-1">Application details</p>
                    <p className="text-ink-muted leading-relaxed">
                      I, {draft.applicantName}, a citizen of India, hereby request the following information
                      under the Right to Information Act, 2005. The details requested are provided below.
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-ink-muted uppercase tracking-wide mb-2">Information requested</p>
                    <ol className="space-y-2.5">
                      {draft.questions.map((q, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <span className="text-sm font-bold text-brand-600 shrink-0">{i + 1}.</span>
                          <span className="text-ink">{q}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  <div className="pt-4">
                    <p className="text-ink-muted leading-relaxed">
                      I declare that the information sought is not falling under any of the exemptions
                      provided in Section 8 and 9 of the RTI Act, 2005. I request that the information be
                      provided in printed/electronic form.
                    </p>
                  </div>

                  <div className="pt-6 flex justify-between items-end">
                    <div>
                      <p className="text-sm text-ink-muted">Place: New Delhi</p>
                      <p className="text-sm text-ink-muted mt-1">Date: {new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                    </div>
                    <div className="text-right">
                      <div className="h-12 w-40 border-b border-line mb-1" />
                      <p className="text-sm font-medium text-ink">{draft.applicantName}</p>
                      <p className="text-xs text-ink-muted">Applicant signature</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Info box */}
          <div className="mt-4 flex items-start gap-3 rounded-xl border border-brand-200 bg-brand-50 px-4 py-3.5">
            <Info className="h-5 w-5 shrink-0 text-brand-600 mt-0.5" />
            <p className="text-sm text-brand-800 leading-relaxed">
              <span className="font-semibold">CiviLens provides drafting assistance.</span> Review the
              application before submitting. You may need to attach an application fee and proof of identity
              as per your state’s RTI rules.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function buildDraftText(draft: Draft): string {
  return `RIGHT TO INFORMATION APPLICATION
Under the Right to Information Act, 2005

To:
${draft.pioName}
${draft.pioAddress}

From:
${draft.applicantName}
${draft.applicantAddress}

Date: ${new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}

Subject: ${draft.subject}

Department: ${draft.departmentName}

Application details:
I, ${draft.applicantName}, a citizen of India, hereby request the following information under the Right to Information Act, 2005.

Information requested:
${draft.questions.map((q, i) => `${i + 1}. ${q}`).join('\n')}

I declare that the information sought is not falling under any of the exemptions provided in Section 8 and 9 of the RTI Act, 2005. I request that the information be provided in printed/electronic form.

Place: New Delhi
Date: ${new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}

${draft.applicantName}
Applicant signature
`;
}
