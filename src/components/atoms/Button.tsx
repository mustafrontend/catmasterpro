import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  children?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const variantStyles: Record<string, string> = {
  primary: 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm border border-indigo-600',
  secondary: 'bg-slate-900 hover:bg-slate-800 text-white shadow-sm border border-slate-900',
  outline: 'bg-white hover:bg-slate-50 text-slate-700 border-[0.5px] border-slate-200 shadow-sm',
  ghost: 'bg-transparent hover:bg-slate-100 text-slate-700 border border-transparent',
  danger: 'bg-rose-600 hover:bg-rose-700 text-white shadow-sm border border-rose-600',
};

const sizeStyles: Record<string, string> = {
  sm: 'px-3 py-1.5 text-xs rounded-lg font-semibold gap-1.5',
  md: 'px-4 py-2 text-sm rounded-xl font-semibold gap-2',
  lg: 'px-5 py-2.5 text-base rounded-xl font-semibold gap-2.5',
};

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...props
}) => {
  return (
    <motion.button
      whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
      disabled={disabled || isLoading}
      className={`inline-flex items-center justify-center transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed select-none ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin text-current" />
      ) : (
        leftIcon
      )}
      {children && <span>{children}</span>}
      {!isLoading && rightIcon}
    </motion.button>
  );
};
