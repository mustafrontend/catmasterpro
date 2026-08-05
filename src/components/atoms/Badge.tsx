import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'indigo';
  size?: 'sm' | 'md';
  dot?: boolean;
  className?: string;
}

const variantStyles: Record<string, string> = {
  default: 'bg-slate-100 text-slate-700 border-[0.5px] border-slate-200',
  success: 'bg-emerald-50 text-emerald-700 border-[0.5px] border-emerald-200',
  warning: 'bg-amber-50 text-amber-700 border-[0.5px] border-amber-200',
  danger: 'bg-rose-50 text-rose-700 border-[0.5px] border-rose-200',
  indigo: 'bg-indigo-50 text-indigo-700 border-[0.5px] border-indigo-200',
};

const dotStyles: Record<string, string> = {
  default: 'bg-slate-500',
  success: 'bg-emerald-500',
  warning: 'bg-amber-500',
  danger: 'bg-rose-500',
  indigo: 'bg-indigo-500',
};

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  dot = false,
  className = '',
}) => {
  const sizeClass = size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs';
  return (
    <span
      className={`inline-flex items-center gap-1.5 font-normal tracking-wide rounded-full ${variantStyles[variant]} ${sizeClass} ${className}`}
    >
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${dotStyles[variant]}`} />}
      {children}
    </span>
  );
};
