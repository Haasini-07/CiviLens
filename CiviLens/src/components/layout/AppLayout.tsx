import { useState, type ReactNode } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, LogOut, Bell } from 'lucide-react';
import { Sidebar } from './Sidebar';
import { Logo } from '@/components/Logo';
import { Button } from '@/components/ui/Button';
import { Dropdown, DropdownItem, DropdownLabel, DropdownSeparator } from '@/components/ui/Dropdown';
import { user } from '@/services/mockData';

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const initials = user.name.split(' ').map((n) => n[0]).join('');

  return (
    <div className="min-h-screen bg-surface">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 hidden w-64 lg:block">
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center px-5 border-b border-line bg-silver/60">
            <Link to="/">
              <Logo />
            </Link>
          </div>
          <div className="flex-1 overflow-hidden">
            <Sidebar />
          </div>
        </div>
      </aside>

      {/* Mobile drawer */}
      {mobileNavOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-ink/40 backdrop-blur-sm animate-fade-in"
            onClick={() => setMobileNavOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 w-72 max-w-[85%] bg-white shadow-pop animate-fade-in">
            <div className="flex h-16 items-center justify-between px-5 border-b border-line">
              <Logo />
              <button
                onClick={() => setMobileNavOpen(false)}
                className="rounded-lg p-1.5 text-gray-400 hover:bg-silver hover:text-ink focus-ring"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="h-[calc(100%-4rem)]">
              <Sidebar onNavigate={() => setMobileNavOpen(false)} />
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-line bg-white/90 px-4 backdrop-blur-md sm:px-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileNavOpen(true)}
              className="rounded-lg p-2 text-ink hover:bg-silver transition-colors focus-ring lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
            <Link to="/" className="lg:hidden">
              <Logo showText={false} />
            </Link>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <button className="relative rounded-lg p-2 text-ink-muted hover:bg-silver hover:text-ink transition-colors focus-ring" aria-label="Notifications">
              <Bell className="h-5 w-5" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-amber-500 ring-2 ring-white" />
            </button>
            <Dropdown
              trigger={
                <div className="flex items-center gap-2 rounded-lg pl-2 pr-2.5 py-1.5 hover:bg-silver transition-colors">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-600 text-sm font-semibold text-white">
                    {initials}
                  </div>
                  <span className="hidden text-sm font-semibold text-ink sm:block">{user.name.split(' ')[0]}</span>
                  <ChevronDown className="h-4 w-4 text-ink-muted" />
                </div>
              }
            >
              <DropdownLabel>{user.name}</DropdownLabel>
              <DropdownLabel>{user.email}</DropdownLabel>
              <DropdownSeparator />
              <DropdownItem onClick={() => navigate('/app/profile')}>
                Profile
              </DropdownItem>
              <DropdownItem onClick={() => navigate('/app/settings')}>
                Settings
              </DropdownItem>
              <DropdownSeparator />
              <DropdownItem onClick={() => navigate('/')} className="text-red-600 hover:bg-red-50">
                <LogOut className="h-4 w-4" />
                Sign out
              </DropdownItem>
            </Dropdown>
          </div>
        </header>

        <main key={location.pathname} className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8 animate-fade-in">
          {children}
        </main>
      </div>
    </div>
  );
}
