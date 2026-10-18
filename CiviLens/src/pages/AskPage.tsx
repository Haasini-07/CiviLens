import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, Lightbulb } from 'lucide-react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Input';

const examples = [
  'Why hasn’t the road near my house been repaired?',
  'How many public school teachers were hired in 2025?',
  'What is the status of my driving licence application?',
  'How many FIRs were registered in my district last month?',
  'What is the budget allocated for street lighting in my ward?',
  'How many public hospital beds are operational in my city?',
];

export function AskPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [touched, setTouched] = useState(false);

  const handleSubmit = () => {
    setTouched(true);
    if (query.trim().length < 10) return;
    navigate(`/app/ask/results?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <div className="max-w-3xl">
      <PageHeader
        title="Ask CiviLens"
        description="Describe the information you need. We’ll recommend the most relevant government department and help you draft an RTI application."
      />

      <Card>
        <div className="border-b border-line bg-gradient-to-b from-brand-50/50 to-white px-6 py-5">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-brand-600" />
            <h2 className="text-lg font-bold text-ink">What information do you need?</h2>
          </div>
        </div>
        <CardContent className="pt-5">
          <Textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onBlur={() => setTouched(true)}
            placeholder="Describe your issue in your own words…"
            rows={5}
            invalid={touched && query.trim().length < 10}
            className="resize-none"
            autoFocus
          />
          {touched && query.trim().length < 10 && (
            <p className="mt-2 text-xs font-medium text-red-600">
              Please describe your issue in at least 10 characters.
            </p>
          )}
          <div className="mt-5">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="h-4 w-4 text-amber-500" />
              <p className="text-xs font-semibold text-ink-muted uppercase tracking-wide">Try an example</p>
            </div>
            <div className="flex flex-col gap-2">
              {examples.map((ex) => (
                <button
                  key={ex}
                  onClick={() => setQuery(ex)}
                  className="rounded-lg border border-line bg-white px-4 py-2.5 text-left text-sm text-ink-muted hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700 transition-colors"
                >
                  {ex}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <Button onClick={handleSubmit} size="lg">
              Find the right department
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
