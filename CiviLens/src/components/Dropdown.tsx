import { useState, type ReactNode } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, LogOut, Bell, ShieldCheck } from 'lucide-react';
import { Sidebar } from './Sidebar';
import { Logo } from '@/components/Logo';
import { Dropdown, DropdownItem, DropdownLabel, DropdownSeparator } from '@/components/ui/Dropdown';
import { user } from '@/services/mockData';

interface AppLayoutProps { children: ReactNode; }

export function AppLayout({ children }: AppLayoutProps) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const initials = user.name.split(' ').map((n) => n[0]).join('');

  return (
    <div className="min-h-screen civic-shell">
      <div className="institutional-line fixed left-0 right-0 top-0 z-[60]" />
      <aside className="fixed inset-y-0 left-0 hidden w-[274px] pt-[3px] lg:block">
        <div className="flex h-full flex-col border-r border-slate-200 bg-white/95 shadow-[10px_0_30px_-28px_rgba(15,23,42,.5)]">
          <div className="border-b border-slate-200 px-5 py-5">
            <Link to="/" className="block"><Logo /></Link>
            <p className="mt-2 pl-1 text-[10px] font-semibold uppercase tracking-[.16em] text-slate-400">Civic Information & RTI Guidance</p>
          </div>
          <div className="flex-1 overflow-hidden"><Sidebar /></div>
          <div className="border-t border-slate-200 p-4">
            <div className="rounded-xl border border-blue-100 bg-blue-50/60 p-3">
              <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-brand-600" /><span className="text-xs font-bold text-blue-900">Citizen-first guidance</span></div>
              <p className="mt-1 text-[11px] leading-relaxed text-slate-600">Recommendations should be verified before filing.</p>
            </div>
          </div>
        </div>
      </aside>

      {mobileNavOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-slate-950/45 backdrop-blur-sm" onClick={() => setMobileNavOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-80 max-w-[88%] bg-white shadow-2xl">
            <div className="flex h-20 items-center justify-between border-b border-slate-200 px-5">
              <Logo /><button onClick={() => setMobileNavOpen(false)} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100" aria-label="Close menu"><X className="h-5 w-5" /></button>
            </div>
            <Sidebar onNavigate={() => setMobileNavOpen(false)} />
          </div>
        </div>
      )}

      <div className="lg:pl-[274px] pt-[3px]">
        <header className="sticky top-[3px] z-30 border-b border-slate-200/90 bg-white/90 backdrop-blur-xl">
          <div className="mx-auto flex h-[70px] max-w-[1500px] items-center justify-between gap-4 px-4 sm:px-7">
            <div className="flex items-center gap-3">
              <button onClick={() => setMobileNavOpen(true)} className="rounded-xl p-2 text-slate-700 hover:bg-slate-100 lg:hidden" aria-label="Open menu"><Menu className="h-5 w-5" /></button>
              <div className="hidden sm:block">
                <div className="flex items-center gap-2"><span className="status-dot bg-emerald-500" /><span className="text-xs font-semibold text-slate-600">CiviLens services online</span></div>
                <p className="mt-0.5 text-[10px] uppercase tracking-[.15em] text-slate-400">Citizen information workspace</p>
              </div>
              <Link to="/" className="lg:hidden"><Logo showText={false} /></Link>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <button className="relative rounded-xl border border-slate-200 bg-white p-2.5 text-slate-600 hover:bg-slate-50" aria-label="Notifications"><Bell className="h-[18px] w-[18px]" /><span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-amber-500 ring-2 ring-white" /></button>
              <Dropdown trigger={<div className="flex items-center gap-2 rounded-xl border border-transparent px-2 py-1.5 hover:border-slate-200 hover:bg-slate-50"><div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-700 text-sm font-bold text-white">{initials}</div><div className="hidden text-left sm:block"><p className="text-xs font-bold text-slate-800">{user.name}</p><p className="text-[10px] text-slate-500">Citizen account</p></div><ChevronDown className="h-4 w-4 text-slate-400" /></div>}>
                <DropdownLabel>{user.name}</DropdownLabel><DropdownLabel>{user.email}</DropdownLabel><DropdownSeparator />
                <DropdownItem onClick={() => navigate('/app/profile')}>Profile</DropdownItem><DropdownItem onClick={() => navigate('/app/settings')}>Settings</DropdownItem><DropdownSeparator />
                <DropdownItem onClick={() => navigate('/')} className="text-red-600 hover:bg-red-50"><LogOut className="h-4 w-4" />Sign out</DropdownItem>
              </Dropdown>
            </div>
          </div>
        </header>
        <main key={location.pathname} className="relative mx-auto max-w-[1500px] px-4 py-7 sm:px-7 lg:px-9 sm:py-9 animate-fade-in">
          <div className="pointer-events-none absolute inset-x-0 top-0 -z-0 h-56 civic-grid civic-grid-fade opacity-70" />
          <div className="relative z-10">{children}</div>
        </main>
      </div>
    </div>
  );
}
