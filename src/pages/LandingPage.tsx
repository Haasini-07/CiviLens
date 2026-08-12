import { Link } from 'react-router-dom';
import {
  ArrowRight,
  MessageSquareText,
  Building2,
  BarChart3,
  FileEdit,
  CalendarClock,
  Gavel,
  ShieldCheck,
  Clock,
  FileCheck,
  Scale,
  HelpCircle,
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Tooltip } from '@/components/ui/Tooltip';

const journey = [
  { num: '01', title: 'Describe your issue', desc: 'Tell us what information you need in your own words — no jargon required.', icon: MessageSquareText },
  { num: '02', title: 'Find the right department', desc: 'CiviLens recommends the most relevant department and, where available, the PIO.', icon: Building2 },
  { num: '03', title: 'Check transparency', desc: 'See how responsive the department has historically been before you file.', icon: BarChart3 },
  { num: '04', title: 'Draft your RTI', desc: 'Generate a structured, formal RTI application ready for review and submission.', icon: FileEdit },
  { num: '05', title: 'Track your deadline', desc: 'We monitor the statutory 30-day response window so you don’t have to.', icon: CalendarClock },
  { num: '06', title: 'Know your next step', desc: 'If the deadline passes, CiviLens guides you through the First Appeal process.', icon: Gavel },
];

const trust = [
  { icon: ShieldCheck, title: 'Transparent by design', desc: 'Every recommendation shows its reasoning and confidence — nothing is hidden.' },
  { icon: Clock, title: 'Never miss a deadline', desc: 'Automatic countdown to the 30-day response window, with timely reminders.' },
  { icon: FileCheck, title: 'Drafts that look formal', desc: 'Structured applications that follow the standard RTI format — not chat messages.' },
  { icon: Scale, title: 'Guidance, not legal advice', desc: 'We explain your options in plain language. You always verify before filing.' },
];

export function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-line">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-50/60 via-white to-white" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3.5 py-1.5 text-xs font-semibold text-brand-700">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-600" />
              A citizen-centric RTI guidance platform
            </div>
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-ink sm:text-5xl lg:text-6xl leading-[1.1]">
              Understand. Ask.{' '}
              <span className="text-brand-600">Track.</span> Act.
            </h1>
            <p className="mt-6 text-lg text-ink-muted leading-relaxed max-w-2xl">
              CiviLens helps you navigate the Right to Information process — from understanding your
              issue to finding the right department, drafting a formal application, tracking the
              30-day response deadline, and knowing what to do if you don’t hear back.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/app/ask">
                <Button size="lg" className="w-full sm:w-auto">
                  Start with your question
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <a href="#how">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  How CiviLens works
                </Button>
              </a>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-ink-muted">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-brand-600" />
                <span>Guidance, not legal advice</span>
              </div>
              <div className="flex items-center gap-2">
                <HelpCircle className="h-4 w-4 text-brand-600" />
                <span>Plain-language explanations</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-brand-600" />
                <span>Automatic deadline tracking</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="border-b border-line bg-surface py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-brand-600 uppercase tracking-wide">How it works</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-ink">CiviLens guides you, step by step</h2>
            <p className="mt-3 text-ink-muted leading-relaxed">
              The RTI process can feel intimidating. CiviLens breaks it into clear, manageable steps —
              so you always know what to do next.
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: MessageSquareText, title: 'Describe in your words', desc: 'No forms, no codes. Just explain what information you need like you’re asking a friend.' },
              { icon: Building2, title: 'Get a department match', desc: 'We recommend the most relevant department and authority, with a confidence score and reasoning.' },
              { icon: BarChart3, title: 'See transparency data', desc: 'Check average response times, on-time rates, and denial trends before you file.' },
              { icon: FileEdit, title: 'Draft a formal application', desc: 'A structured RTI application with subject, PIO details, and numbered questions — ready to review.' },
              { icon: CalendarClock, title: 'Track the 30-day window', desc: 'A clear countdown and timeline keeps you informed of every status change.' },
              { icon: Gavel, title: 'Know your appeal options', desc: 'If the deadline passes, a simple decision tree walks you through the First Appeal process.' },
            ].map((f) => (
              <Card key={f.title} hoverable className="p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-ink">{f.title}</h3>
                <p className="mt-1.5 text-sm text-ink-muted leading-relaxed">{f.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* RTI Journey */}
      <section id="journey" className="border-b border-line py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-brand-600 uppercase tracking-wide">The RTI journey</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-ink">The RTI journey, simplified</h2>
            <p className="mt-3 text-ink-muted leading-relaxed">
              Six clear stages from describing your issue to knowing your next step.
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {journey.map((step, i) => (
              <div key={step.num} className="group relative">
                <Card hoverable className="h-full p-6">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-extrabold text-brand-100 group-hover:text-brand-200 transition-colors">
                      {step.num}
                    </span>
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-silver text-brand-600">
                      <step.icon className="h-5 w-5" />
                    </div>
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-ink">{step.title}</h3>
                  <p className="mt-1.5 text-sm text-ink-muted leading-relaxed">{step.desc}</p>
                </Card>
                {i < journey.length - 1 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-2.5 z-10 h-5 w-5 -translate-y-1/2 items-center justify-center rounded-full bg-white border border-line text-brand-400 shadow-card">
                    <ArrowRight className="h-3 w-3" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust / about */}
      <section id="about" className="border-b border-line bg-surface py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-brand-600 uppercase tracking-wide">Why CiviLens</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-ink">Built for citizens, not bureaucrats</h2>
            <p className="mt-3 text-ink-muted leading-relaxed">
              We assume you’ve never filed an RTI before. Every term is explained, every recommendation
              is transparent, and every step has a clear next action.
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {trust.map((t) => (
              <Card key={t.title} className="p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                  <t.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-ink">{t.title}</h3>
                <p className="mt-1.5 text-sm text-ink-muted leading-relaxed">{t.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Glossary teaser */}
      <section className="border-b border-line py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="rounded-2xl border border-line bg-silver/50 p-8 sm:p-12">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-bold tracking-tight text-ink">RTI terms, explained simply</h2>
              <p className="mt-2 text-ink-muted leading-relaxed">
                We never assume you know the jargon. Here’s a quick look at the terms you’ll see throughout CiviLens.
              </p>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                { term: 'PIO', def: 'Public Information Officer — the official responsible for handling RTI requests in a department.' },
                { term: 'First Appeal', def: 'A formal complaint you can file if the PIO doesn’t respond within 30 days or gives an unsatisfactory reply.' },
                { term: 'Statutory deadline', def: 'The 30-day period within which a PIO must respond to your RTI application by law.' },
              ].map((g) => (
                <div key={g.term} className="rounded-xl border border-line bg-white p-5">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-ink">{g.term}</h3>
                    <Tooltip content={g.def} />
                  </div>
                  <p className="mt-2 text-sm text-ink-muted leading-relaxed">{g.def}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-ink">Ready to ask your question?</h2>
          <p className="mt-3 text-ink-muted leading-relaxed">
            Describe the information you need. CiviLens will help you find the right department and draft a formal RTI application.
          </p>
          <div className="mt-8 flex justify-center">
            <Link to="/app/ask">
              <Button size="lg">
                Start with your question
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-line bg-silver/40 py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2 text-sm text-ink-muted">
              <span className="font-bold text-ink">CiviLens</span>
              <span className="text-line">·</span>
              <span>Making government information simple, transparent, and accessible.</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-ink-muted">
              <a href="#how" className="hover:text-ink transition-colors">How it works</a>
              <a href="#about" className="hover:text-ink transition-colors">About</a>
              <Link to="/app" className="hover:text-ink transition-colors">Dashboard</Link>
            </div>
          </div>
          <p className="mt-6 text-xs text-ink-muted text-center sm:text-left">
            CiviLens provides guidance and drafting assistance. It is not a government portal and does not file RTI applications on your behalf. Please verify all recommendations before submitting.
          </p>
        </div>
      </footer>
    </div>
  );
}
