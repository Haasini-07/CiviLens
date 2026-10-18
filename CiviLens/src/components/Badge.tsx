import { NavLink } from 'react-router-dom';
import { LayoutDashboard, MessageSquareText, FileText, BarChart3, FileEdit, CalendarClock, Gavel, HelpCircle, Settings, User, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const groups = [
  { label: 'Your journey', items: [
    { to: '/app', label: 'Overview', icon: LayoutDashboard, end: true },
    { to: '/app/ask', label: 'Ask CiviLens', icon: MessageSquareText },
    { to: '/app/my-rtis', label: 'My RTIs', icon: FileText },
    { to: '/app/drafts', label: 'Drafts', icon: FileEdit },
  ]},
  { label: 'Understand', items: [{ to: '/app/transparency', label: 'Transparency', icon: BarChart3 }] },
  { label: 'Take action', items: [{ to: '/app/deadlines', label: 'Deadlines', icon: CalendarClock }, { to: '/app/appeal', label: 'Appeal Guidance', icon: Gavel }] },
];
const bottom = [{ to: '/app/help', label: 'Help', icon: HelpCircle }, { to: '/app/settings', label: 'Settings', icon: Settings }, { to: '/app/profile', label: 'Profile', icon: User }];

export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  return <nav className="flex h-full flex-col bg-white">
    <div className="flex-1 overflow-y-auto px-3 py-5 scrollbar-thin">
      {groups.map((group) => <section key={group.label} className="mb-5">
        <p className="px-3 pb-2 text-[10px] font-bold uppercase tracking-[.16em] text-slate-400">{group.label}</p>
        <ul className="space-y-1">{group.items.map((item) => <li key={item.to}><NavLink to={item.to} end={item.end} onClick={onNavigate} className={({isActive}) => cn('group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all', isActive ? 'bg-blue-50 text-blue-800 shadow-[inset_3px_0_0_#2563EB]' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900')}>
          {({isActive}) => <><span className={cn('flex h-8 w-8 items-center justify-center rounded-lg', isActive ? 'bg-white text-brand-600 shadow-sm' : 'bg-slate-100 text-slate-500 group-hover:bg-white')}><item.icon className="h-[17px] w-[17px]" /></span><span className="flex-1">{item.label}</span>{isActive && <ChevronRight className="h-4 w-4 text-blue-500" />}</>}
        </NavLink></li>)}</ul>
      </section>)}
    </div>
    <div className="border-t border-slate-200 px-3 py-4"><ul className="space-y-1">{bottom.map((item) => <li key={item.to}><NavLink to={item.to} onClick={onNavigate} className={({isActive}) => cn('flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold', isActive ? 'bg-blue-50 text-blue-800' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900')}><item.icon className="h-[17px] w-[17px]" />{item.label}</NavLink></li>)}</ul></div>
  </nav>;
}
