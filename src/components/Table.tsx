import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
type Variant='primary'|'secondary'|'outline'|'ghost'|'danger'; type Size='sm'|'md'|'lg';
const variants={primary:'bg-brand-700 text-white hover:bg-brand-800 active:bg-brand-900 shadow-[0_6px_16px_-9px_rgba(37,99,235,.75)]',secondary:'bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-200',outline:'bg-white text-slate-800 border border-slate-200 hover:bg-slate-50 hover:border-blue-200',ghost:'text-slate-700 hover:bg-slate-100',danger:'bg-red-600 text-white hover:bg-red-700 shadow-sm'};
const sizes={sm:'h-9 px-3.5 text-sm gap-1.5',md:'h-10.5 px-4.5 text-sm gap-2',lg:'h-12 px-6 text-base gap-2'};
export const Button=forwardRef<HTMLButtonElement,{variant?:Variant;size?:Size}&ButtonHTMLAttributes<HTMLButtonElement>>(({className,variant='primary',size='md',...props},ref)=><button ref={ref} className={cn('inline-flex items-center justify-center rounded-xl font-bold transition-all duration-150 focus-ring disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap',variants[variant],sizes[size],className)} {...props}/>);
Button.displayName='Button';
