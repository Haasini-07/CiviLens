import { useState } from 'react';
import { User, Mail, MapPin, Bell, Eye, Shield, Save } from 'lucide-react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useToast } from '@/components/ui/Toast';
import { user } from '@/services/mockData';

export function ProfilePage() {
  const toast = useToast();
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [location, setLocation] = useState(user.location);
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast('success', 'Profile updated successfully');
    }, 600);
  };

  const initials = name.split(' ').map((n) => n[0]).join('');

  return (
    <div className="max-w-2xl">
      <PageHeader
        title="Profile"
        description="Manage your personal information and account details."
      />

      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-600 text-xl font-bold text-white">
              {initials}
            </div>
            <div>
              <h2 className="text-lg font-bold text-ink">{name}</h2>
              <p className="text-sm text-ink-muted">{email}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6 space-y-5">
          <Field label="Full name" icon={<User className="h-4 w-4" />}>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </Field>
          <Field label="Email address" icon={<Mail className="h-4 w-4" />}>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </Field>
          <Field label="Location" icon={<MapPin className="h-4 w-4" />}>
            <Input value={location} onChange={(e) => setLocation(e.target.value)} />
          </Field>
          <div className="pt-2 flex justify-end">
            <Button onClick={handleSave} disabled={saving}>
              <Save className="h-4 w-4" />
              {saving ? 'Saving…' : 'Save changes'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function SettingsPage() {
  const toast = useToast();
  const [prefs, setPrefs] = useState({
    deadlineReminders: true,
    weeklyDigest: false,
    appealAlerts: true,
    largeText: false,
    highContrast: false,
    plainLanguage: true,
  });

  const toggle = (key: keyof typeof prefs) => {
    setPrefs((p) => ({ ...p, [key]: !p[key] }));
  };

  const handleSave = () => {
    toast('success', 'Settings saved');
  };

  return (
    <div className="max-w-2xl">
      <PageHeader
        title="Settings"
        description="Customize notifications, accessibility, and display preferences."
      />

      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 mb-4">
            <Bell className="h-4 w-4 text-brand-600" />
            <h2 className="text-sm font-semibold text-ink">Notification preferences</h2>
          </div>
          <div className="space-y-1">
            <ToggleRow
              label="Deadline reminders"
              desc="Get notified 7 and 3 days before an RTI deadline."
              checked={prefs.deadlineReminders}
              onChange={() => toggle('deadlineReminders')}
            />
            <ToggleRow
              label="Weekly digest"
              desc="A weekly summary of your RTI activity."
              checked={prefs.weeklyDigest}
              onChange={() => toggle('weeklyDigest')}
            />
            <ToggleRow
              label="Appeal alerts"
              desc="Remind me when the First Appeal window is closing."
              checked={prefs.appealAlerts}
              onChange={() => toggle('appealAlerts')}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 mb-4">
            <Eye className="h-4 w-4 text-brand-600" />
            <h2 className="text-sm font-semibold text-ink">Accessibility preferences</h2>
          </div>
          <div className="space-y-1">
            <ToggleRow
              label="Larger text"
              desc="Increase base font size for better readability."
              checked={prefs.largeText}
              onChange={() => toggle('largeText')}
            />
            <ToggleRow
              label="High contrast"
              desc="Boost contrast between text and backgrounds."
              checked={prefs.highContrast}
              onChange={() => toggle('highContrast')}
            />
            <ToggleRow
              label="Plain-language mode"
              desc="Always show simplified explanations for RTI terms."
              checked={prefs.plainLanguage}
              onChange={() => toggle('plainLanguage')}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="h-4 w-4 text-brand-600" />
            <h2 className="text-sm font-semibold text-ink">Data & privacy</h2>
          </div>
          <p className="text-sm text-ink-muted leading-relaxed">
            CiviLens stores your drafts and RTI tracking data to provide its guidance features. Your
            information is never shared with government departments. You can delete your data at any time.
          </p>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave}>
          <Save className="h-4 w-4" />
          Save preferences
        </Button>
      </div>
    </div>
  );
}

function Field({ label, icon, children }: { label: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div>
      <label className="flex items-center gap-1.5 mb-1.5 text-xs font-semibold text-ink-muted uppercase tracking-wide">
        {icon}
        {label}
      </label>
      {children}
    </div>
  );
}

function ToggleRow({ label, desc, checked, onChange }: { label: string; desc: string; checked: boolean; onChange: () => void }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3 border-b border-line last:border-0">
      <div>
        <p className="text-sm font-medium text-ink">{label}</p>
        <p className="text-xs text-ink-muted mt-0.5">{desc}</p>
      </div>
      <button
        onClick={onChange}
        className={
          'relative h-6 w-11 shrink-0 rounded-full transition-colors focus-ring ' +
          (checked ? 'bg-brand-600' : 'bg-gray-300')
        }
        role="switch"
        aria-checked={checked}
      >
        <span
          className={
            'absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ' +
            (checked ? 'translate-x-[22px]' : 'translate-x-0.5')
          }
        />
      </button>
    </div>
  );
}
