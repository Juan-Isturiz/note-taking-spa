import { Button as HeadlessButton } from '@headlessui/react';
import { forwardRef } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = '',
      children,
      variant = 'primary',
      size = 'md',
      disabled,
      isLoading = false,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center rounded-md font-medium transition-colors  disabled:opacity-50 disabled:cursor-not-allowed';

    const variantStyles = {
      primary: 'bg-gold text-white hover:bg-gold/80',
      secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
      danger: 'bg-red-600 text-white hover:bg-red-700',
      ghost: 'bg-transparent text-neutral-300 hover:bg-neutral-800',
    };

    const sizeStyles = {
      sm: 'text-sm px-4 py-2',
      md: 'text-md px-6 py-3',
      lg: 'text-lg px-8 py-4',
    };

    return (
      <HeadlessButton
        ref={ref}
        className={`${className} ${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]}`}
        disabled={disabled || isLoading}
        {...props}
      >
        {children}
      </HeadlessButton>
    );
  }
);

Button.displayName = 'Button';
