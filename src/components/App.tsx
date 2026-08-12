import { Link } from 'react-router-dom';
import {
  HelpCircle,
  MessageSquareText,
  Building2,
  BarChart3,
  FileEdit,
  CalendarClock,
  Gavel,
  ArrowRight,
  Search,
} from 'lucide-react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card, CardContent } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { useState } from 'react';

const faqs = [
  {
    q: 'What is an RTI application?',
    a: 'A Right to Information application is a formal request you can file with a government department to ask for information it holds. Under the RTI Act, 2005, the department must respond within 30 days.',
  },
  {
    q: 'Does CiviLens file my RTI for me?',
    a: 'No. CiviLens guides you through the process — finding the right department, drafting the application, and tracking the deadline — but you submit the application yourself to the department.',
  },
  {
    q: 'What is a PIO?',
    a: 'A Public Information Officer is the official in each department responsible for receiving and responding to RTI requests. CiviLens helps you identify the relevant PIO where available.',
  },
  {
    q: 'What happens if I don’t get a response?',
    a: 'If the PIO doesn’t respond within 30 days, you can file a First Appeal with a senior official called the First Appellate Authority. CiviLens walks you through this process step by step.',
  },
  {
    q: 'Is CiviLens a government website?',
    a: 'No. CiviLens is an independent guidance platform. It is not affiliated with any government body. Always verify department and PIO details before filing.',
  },
  {
    q: 'Do I need to pay a fee to file an RTI?',
    a: 'Most states require a nominal application fee (typically ₹10 for citizens below the poverty line, it may be waived). Check your state’s specific RTI rules for current fee details.',
  },
];

const topics = [
  { icon: MessageSquareText, label: 'Asking a question', desc: 'How to describe your issue', to: '/app/ask' },
  { icon: Building2, label: 'Finding a department', desc: 'Understanding recommendations', to: '/app/ask' },
  { icon: BarChart3, label: 'Transparency data', desc: 'Reading department metrics', to: '/app/transparency' },
  { icon: FileEdit, label: 'Drafting an RTI', desc: 'Using the draft assistant', to: '/app/drafts' },
  { icon: CalendarClock, label: 'Tracking deadlines', desc: 'Monitoring the 30-day window', to: '/app/deadlines' },
  { icon: Gavel, label: 'Filing an appeal', desc: 'What to do if no response', to: '/app/appeal' },
];

export function HelpPage() {
  const [search, setSearch] = useState('');
  const filtered = faqs.filter(
    (f) => f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="max-w-3xl">
      <PageHeader
        title="Help"
        description="Find answers to common questions about CiviLens and the RTI process."
      />

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-muted" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for help…"
          className="pl-10"
        />
      </div>

      {/* Topics */}
      <h2 className="mb-3 text-sm font-semibold text-ink-muted uppercase tracking-wide">Browse by topic</h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 mb-8">
        {topics.map((t) => (
          <Link key={t.label} to={t.to}>
            <Card hoverable className="h-full p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                  <t.icon className="h-4.5 w-4.5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-ink flex items-center gap-1">
                    {t.label}
                    <ArrowRight className="h-3 w-3 text-ink-muted" />
                  </p>
                  <p className="text-xs text-ink-muted mt-0.5">{t.desc}</p>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {/* FAQs */}
      <h2 className="mb-3 text-sm font-semibold text-ink-muted uppercase tracking-wide">Frequently asked questions</h2>
      <div className="space-y-3">
        {filtered.length > 0 ? (
          filtered.map((f, i) => (
            <Card key={i} hoverable>
              <CardContent className="pt-5">
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-silver text-brand-600">
                    <HelpCircle className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-ink">{f.q}</h3>
                    <p className="mt-1.5 text-sm text-ink-muted leading-relaxed">{f.a}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-ink-muted text-center py-4">
                No results for “{search}”. Try a different search term.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
