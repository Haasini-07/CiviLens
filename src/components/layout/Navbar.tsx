import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { Button } from '@/components/ui/Button';

export function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link to="/">
          <Logo />
        </Link>
        <nav className="hidden items-center gap-7 md:flex">
          <a href="#how" className="text-sm font-medium text-ink-muted hover:text-ink transition-colors">
            How it works
          </a>
          <a href="#journey" className="text-sm font-medium text-ink-muted hover:text-ink transition-colors">
            RTI journey
          </a>
          <a href="#about" className="text-sm font-medium text-ink-muted hover:text-ink transition-colors">
            About
          </a>
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <Button variant="ghost" size="sm" onClick={() => navigate('/app')}>
            Sign in
          </Button>
          <Button size="sm" onClick={() => navigate('/app/ask')}>
            Start with your question
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
        <button
          className="rounded-lg p-2 text-ink md:hidden focus-ring"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {open && (
        <div className="border-t border-line bg-white px-4 py-4 md:hidden animate-fade-in">
          <div className="flex flex-col gap-3">
            <a href="#how" onClick={() => setOpen(false)} className="text-sm font-medium text-ink-muted py-1">
              How it works
            </a>
            <a href="#journey" onClick={() => setOpen(false)} className="text-sm font-medium text-ink-muted py-1">
              RTI journey
            </a>
            <a href="#about" onClick={() => setOpen(false)} className="text-sm font-medium text-ink-muted py-1">
              About
            </a>
            <Button className="mt-2" onClick={() => navigate('/app/ask')}>
              Start with your question
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
