import { ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className = '', children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center gap-2 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-semibold';
    
    const variants = {
      primary: 'bg-[var(--espresso)] text-[var(--white)] hover:bg-[#3D2E24] active:bg-[#1F1410] shadow-sm hover:shadow-md',
      secondary: 'bg-[var(--forest)] text-[var(--white)] hover:bg-[#2D5542] active:bg-[#1A2E22] shadow-sm hover:shadow-md',
      ghost: 'bg-transparent text-[var(--espresso)] hover:bg-[var(--cream)] active:bg-[var(--muted)] border border-[var(--border)]',
    };
    
    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
    };
    
    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
