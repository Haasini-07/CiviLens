import { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, invalid, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        'h-11 w-full rounded-lg border bg-white px-3.5 text-sm text-ink placeholder:text-gray-400 transition-colors focus-ring',
        invalid ? 'border-red-400 focus-visible:ring-red-500' : 'border-line hover:border-gray-300',
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = 'Input';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, invalid, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        'w-full rounded-lg border bg-white px-3.5 py-3 text-sm text-ink placeholder:text-gray-400 transition-colors focus-ring scrollbar-thin',
        invalid ? 'border-red-400 focus-visible:ring-red-500' : 'border-line hover:border-gray-300',
        className,
      )}
      {...props}
    />
  ),
);
Textarea.displayName = 'Textarea';
