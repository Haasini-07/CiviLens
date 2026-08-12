import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Gavel,
  Clock,
  FileText,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Info,
  CalendarClock,
  FileCheck,
} from 'lucide-react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Tooltip } from '@/components/ui/Tooltip';

export function AppealPage() {
  const [deadlinePassed, setDeadlinePassed] = useState<boolean | null>(null);

  return (
    <div>
      <PageHeader
        title="Appeal Guidance"
        description="No response? We’ll help you understand what comes next — in plain language, step by step."
      />

      {/* Disclaimer */}
      <div className="mb-6 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3.5">
        <AlertTriangle className="h-5 w-5 shrink-0 text-amber-600 mt-0.5" />
        <p className="text-sm text-amber-800 leading-relaxed">
          <span className="font-semibold">This is guidance, not legal advice.</span> CiviLens explains
          your options in simple terms. For formal legal advice, consult a qualified lawyer.
        </p>
      </div>

      {/* Decision tree */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 mb-5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
              <Clock className="h-5 w-5" />
            </div>
            <h2 className="text-lg font-bold text-ink">Has the response deadline passed?</h2>
          </div>
          <p className="text-sm text-ink-muted mb-5">
            The PIO must respond within 30 days of receiving your application.{' '}
            <Tooltip content="Public Information Officer — the official responsible for handling RTI requests." />
            {' '}Check your RTI deadline on the tracker.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => setDeadlinePassed(true)}
              className={
                'flex-1 rounded-xl border-2 px-5 py-4 text-left transition-all ' +
                (deadlinePassed === true
                  ? 'border-brand-600 bg-brand-50'
                  : 'border-line bg-white hover:border-brand-300')
              }
            >
              <div className="flex items-center gap-3">
                <div className={'flex h-8 w-8 items-center justify-center rounded-lg ' + (deadlinePassed === true ? 'bg-brand-600 text-white' : 'bg-silver text-ink-muted')}>
                  <XCircle className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-ink">Yes, the deadline has passed</p>
                  <p className="text-xs text-ink-muted mt-0.5">I haven’t received a response</p>
                </div>
              </div>
            </button>
            <button
              onClick={() => setDeadlinePassed(false)}
              className={
                'flex-1 rounded-xl border-2 px-5 py-4 text-left transition-all ' +
                (deadlinePassed === false
                  ? 'border-brand-600 bg-brand-50'
                  : 'border-line bg-white hover:border-brand-300')
              }
            >
              <div className="flex items-center gap-3">
                <div className={'flex h-8 w-8 items-center justify-center rounded-lg ' + (deadlinePassed === false ? 'bg-brand-600 text-white' : 'bg-silver text-ink-muted')}>
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-ink">No, still within deadline</p>
                  <p className="text-xs text-ink-muted mt-0.5">I’m still waiting</p>
                </div>
              </div>
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Result */}
      {deadlinePassed === true && <FirstAppealGuidance />}
      {deadlinePassed === false && <WaitingGuidance />}
      {deadlinePassed === null && (
        <div className="flex items-center justify-center py-8 text-sm text-ink-muted">
          <Info className="h-5 w-5 mr-2" />
          Select an option above to see your next steps.
        </div>
      )}
    </div>
  );
}

function WaitingGuidance() {
  return (
    <Card className="animate-fade-in border-green-200">
      <CardContent className="pt-6">
        <div className="flex items-center gap-2 mb-4">
          <CheckCircle2 className="h-5 w-5 text-green-600" />
          <h2 className="text-lg font-bold text-ink">Continue waiting and monitor your deadline</h2>
        </div>
        <p className="text-sm text-ink-muted leading-relaxed mb-5">
          Your application is still within the 30-day response window. The PIO still has time to reply.
          Keep an eye on your deadline — we’ll remind you as it approaches.
        </p>
        <div className="space-y-3">
          <Step num={1} title="Monitor your deadline" desc="Check the Deadlines page for a live countdown and timeline of your application." />
          <Step num={2} title="Wait for the response" desc="The PIO may respond at any point within the 30-day window." />
          <Step num={3} title="If no response arrives" desc="Come back here once the deadline passes — we’ll walk you through the First Appeal process." />
        </div>
        <div className="mt-6">
          <Link to="/app/deadlines">
            <Button variant="outline">
              <CalendarClock className="h-4 w-4" />
              View my deadlines
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

function FirstAppealGuidance() {
  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="border-indigo-200">
        <div className="flex items-center gap-2 border-b border-indigo-100 bg-indigo-50/50 px-6 py-3">
          <Gavel className="h-5 w-5 text-indigo-600" />
          <h2 className="text-base font-bold text-indigo-800">First Appeal</h2>
          <Tooltip content="A formal complaint filed when the PIO doesn’t respond within 30 days or gives an unsatisfactory reply. It goes to a senior official called the First Appellate Authority." />
        </div>
        <CardContent className="pt-6">
          <p className="text-sm text-ink-muted leading-relaxed mb-6">
            You haven’t received a response within the statutory 30-day window. You now have the right to
            file a First Appeal. Here’s what you need to know.
          </p>

          <div className="space-y-5">
            <Section icon={<Clock className="h-5 w-5" />} tone="amber" title="When you may file">
              <ul className="space-y-1.5 text-sm text-ink-muted">
                <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />If the PIO hasn’t responded within 30 days of receiving your application.</li>
                <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />If the response was incomplete, unsatisfactory, or you were wrongly denied information.</li>
                <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />You must file within <span className="font-semibold text-ink">30 days</span> of the response deadline (or of receiving an unsatisfactory reply).</li>
              </ul>
            </Section>

            <Section icon={<FileText className="h-5 w-5" />} tone="blue" title="What you need">
              <ul className="space-y-1.5 text-sm text-ink-muted">
                <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />Your original RTI application and proof of submission.</li>
                <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />The RTI ID and date of filing.</li>
                <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />A brief statement explaining why you’re appealing (no response, incomplete reply, etc.).</li>
                <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />The name and address of the First Appellate Authority for the department.</li>
              </ul>
            </Section>

            <Section icon={<ArrowRight className="h-5 w-5" />} tone="indigo" title="What happens next">
              <ul className="space-y-1.5 text-sm text-ink-muted">
                <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />The First Appellate Authority must dispose of your appeal within <span className="font-semibold text-ink">30 days</span> (extendable by 15 days with recorded reasons).</li>
                <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />You’ll receive a written order with reasons for the decision.</li>
                <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />If still unsatisfied, you can file a Second Appeal with the Information Commission.</li>
              </ul>
            </Section>

            <Section icon={<CalendarClock className="h-5 w-5" />} tone="amber" title="Important timeline">
              <div className="rounded-lg border border-line bg-silver/40 p-4">
                <div className="flex items-center gap-3 text-sm">
                  <Badge tone="gray">Day 0</Badge>
                  <span className="text-ink-muted">RTI filed</span>
                </div>
                <div className="ml-3 my-1 h-4 w-px bg-line" />
                <div className="flex items-center gap-3 text-sm">
                  <Badge tone="amber">Day 30</Badge>
                  <span className="text-ink-muted">Response deadline passes</span>
                </div>
                <div className="ml-3 my-1 h-4 w-px bg-line" />
                <div className="flex items-center gap-3 text-sm">
                  <Badge tone="indigo">Day 31–60</Badge>
                  <span className="text-ink-muted font-medium">File First Appeal within this window</span>
                </div>
                <div className="ml-3 my-1 h-4 w-px bg-line" />
                <div className="flex items-center gap-3 text-sm">
                  <Badge tone="blue">Day 60–90</Badge>
                  <span className="text-ink-muted">Appeal disposed by Appellate Authority</span>
                </div>
              </div>
            </Section>
          </div>

          <div className="mt-6 flex items-start gap-3 rounded-xl border border-brand-200 bg-brand-50 px-4 py-3.5">
            <FileCheck className="h-5 w-5 shrink-0 text-brand-600 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-brand-800">Recommended next action</p>
              <p className="text-sm text-brand-700 mt-0.5">Prepare your First Appeal using your original application details, and submit it to the department’s First Appellate Authority.</p>
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-2 sm:flex-row">
            <Link to="/app/my-rtis">
              <Button>
                <FileText className="h-4 w-4" />
                View my RTI details
              </Button>
            </Link>
            <Link to="/app/drafts">
              <Button variant="outline">
                <FileText className="h-4 w-4" />
                Review my draft
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function Section({ icon, tone, title, children }: { icon: React.ReactNode; tone: 'blue' | 'green' | 'amber' | 'red' | 'indigo'; title: string; children: React.ReactNode }) {
  const tones = {
    blue: 'bg-brand-50 text-brand-600',
    green: 'bg-green-50 text-green-600',
    amber: 'bg-amber-50 text-amber-600',
    red: 'bg-red-50 text-red-600',
    indigo: 'bg-indigo-50 text-indigo-600',
  };
  return (
    <div>
      <div className="flex items-center gap-2.5 mb-2.5">
        <div className={'flex h-8 w-8 items-center justify-center rounded-lg ' + tones[tone]}>
          {icon}
        </div>
        <h3 className="text-sm font-semibold text-ink">{title}</h3>
      </div>
      <div className="ml-[42px]">{children}</div>
    </div>
  );
}

function Step({ num, title, desc }: { num: number; title: string; desc: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white">
        {num}
      </div>
      <div>
        <p className="text-sm font-semibold text-ink">{title}</p>
        <p className="text-sm text-ink-muted mt-0.5">{desc}</p>
      </div>
    </div>
  );
}
