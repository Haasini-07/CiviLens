import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
interface CardProps extends HTMLAttributes<HTMLDivElement> { hoverable?: boolean; }
export function Card({ className, hoverable, ...props }: CardProps) { return <div className={cn('rounded-2xl border border-slate-200/90 bg-white shadow-[0_4px_18px_-14px_rgba(15,23,42,.4)]', hoverable && 'transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-[0_14px_30px_-18px_rgba(37,99,235,.3)]', className)} {...props}/>; }
export function CardHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) { return <div className={cn('px-6 pt-6 pb-3', className)} {...props}/>; }
export function CardTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) { return <h3 className={cn('text-base font-bold text-slate-900', className)} {...props}/>; }
export function CardDescription({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) { return <p className={cn('mt-1 text-sm text-slate-500', className)} {...props}/>; }
export function CardContent({ className, ...props }: HTMLAttributes<HTMLDivElement>) { return <div className={cn('px-6 pb-6', className)} {...props}/>; }
