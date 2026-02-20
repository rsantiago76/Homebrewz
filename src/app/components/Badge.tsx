import { HTMLAttributes, forwardRef } from 'react';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'new' | 'bestseller' | 'default';
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = 'default', className = '', children, ...props }, ref) => {
    const variants = {
      new: 'bg-[var(--caramel)] text-[var(--white)]',
      bestseller: 'bg-[var(--forest)] text-[var(--white)]',
      default: 'bg-[var(--espresso)] text-[var(--white)]',
    };
    
    return (
      <span
        ref={ref}
        className={`
          inline-flex items-center justify-center
          px-3 py-1
          rounded-full
          text-xs
          font-semibold
          uppercase
          tracking-wide
          ${variants[variant]}
          ${className}
        `}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';
