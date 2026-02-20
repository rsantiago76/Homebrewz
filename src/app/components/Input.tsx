import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', id, ...props }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-[var(--espresso)]">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`
            px-4 py-3 
            bg-[var(--white)] 
            border border-[var(--border)] 
            rounded-xl 
            text-[var(--espresso)] 
            placeholder:text-[var(--muted-foreground)]
            focus:outline-none 
            focus:ring-2 
            focus:ring-[var(--caramel)] 
            focus:border-transparent
            transition-all
            disabled:opacity-50 
            disabled:cursor-not-allowed
            ${error ? 'border-red-500 focus:ring-red-500' : ''}
            ${className}
          `}
          {...props}
        />
        {error && (
          <span className="text-sm text-red-600">{error}</span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
