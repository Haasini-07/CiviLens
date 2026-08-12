import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { CheckCircle2, AlertCircle, Info, XCircle, X } from 'lucide-react';
import { cn } from '@/lib/utils';

type ToastType = 'success' | 'error' | 'info' | 'warning';
interface Toast { id: number; type: ToastType; message: string; }

const ToastContext = createContext<(type: ToastType, message: string) => void>(() => {});

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismiss = useCallback((id: number) => {
    setToasts((t) => t.filter((x) => x.id !== id));
  }, []);

  const show = useCallback((type: ToastType, message: string) => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, type, message }]);
    setTimeout(() => dismiss(id), 4000);
  }, [dismiss]);

  const icons = {
    success: CheckCircle2,
    error: XCircle,
    info: Info,
    warning: AlertCircle,
  };
  const tones = {
    success: 'text-green-600',
    error: 'text-red-600',
    info: 'text-brand-600',
    warning: 'text-amber-500',
  };

  return (
    <ToastContext.Provider value={show}>
      {children}
      {createPortal(
        <div className="fixed bottom-6 right-6 z-[60] flex flex-col gap-2.5 w-full max-w-sm pointer-events-none">
          {toasts.map((t) => {
            const Icon = icons[t.type];
            return (
              <div
                key={t.id}
                className="pointer-events-auto flex items-start gap-3 rounded-xl border border-line bg-white px-4 py-3.5 shadow-pop animate-fade-in-up"
              >
                <Icon className={cn('h-5 w-5 shrink-0 mt-0.5', tones[t.type])} />
                <p className="flex-1 text-sm font-medium text-ink leading-snug">{t.message}</p>
                <button
                  onClick={() => dismiss(t.id)}
                  className="text-gray-400 hover:text-ink transition-colors"
                  aria-label="Dismiss"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            );
          })}
        </div>,
        document.body,
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
