import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  MessageSquareText,
  FileText,
  BarChart3,
  FileEdit,
  CalendarClock,
  Gavel,
  HelpCircle,
  Settings,
  User,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const main = [
  { to: '/app', label: 'Overview', icon: LayoutDashboard, end: true },
  { to: '/app/ask', label: 'Ask CiviLens', icon: MessageSquareText },
  { to: '/app/my-rtis', label: 'My RTIs', icon: FileText },
  { to: '/app/transparency', label: 'Transparency', icon: BarChart3 },
  { to: '/app/drafts', label: 'Drafts', icon: FileEdit },
  { to: '/app/deadlines', label: 'Deadlines', icon: CalendarClock },
  { to: '/app/appeal', label: 'Appeal Guidance', icon: Gavel },
];

const bottom = [
  { to: '/app/help', label: 'Help', icon: HelpCircle },
  { to: '/app/settings', label: 'Settings', icon: Settings },
  { to: '/app/profile', label: 'Profile', icon: User },
];

interface SidebarProps {
  onNavigate?: () => void;
}

export function Sidebar({ onNavigate }: SidebarProps) {
  return (
    <nav className="flex h-full flex-col bg-silver/60 border-r border-line">
      <div className="flex-1 overflow-y-auto scrollbar-thin px-3 py-5">
        <p className="px-3 mb-2 text-[11px] font-semibold text-ink-muted uppercase tracking-wider">
          Menu
        </p>
        <ul className="space-y-0.5">
          {main.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.end}
                onClick={onNavigate}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-white text-brand-700 shadow-card border border-line'
                      : 'text-ink-muted hover:bg-white/70 hover:text-ink',
                  )
                }
              >
                <item.icon className="h-[18px] w-[18px] shrink-0" />
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <div className="border-t border-line px-3 py-3">
        <ul className="space-y-0.5">
          {bottom.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                onClick={onNavigate}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-white text-brand-700 shadow-card border border-line'
                      : 'text-ink-muted hover:bg-white/70 hover:text-ink',
                  )
                }
              >
                <item.icon className="h-[18px] w-[18px] shrink-0" />
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
