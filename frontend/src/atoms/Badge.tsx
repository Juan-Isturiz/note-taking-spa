type BadgeVariant = 'tag' | 'indicator';

export interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
}

export const Badge = ({ variant = 'indicator', children }: BadgeProps) => {
  const baseStyles = 'rounded-full px-2.5 py-0.5 text-xs font-medium ';
  const variantStyles = {
    tag: 'bg-neutral-700 text-neutral-300 border border-neutral-600',
    indicator: 'bg-yellow-100 text-yellow-800',
  };
  return (
    <span className={`${baseStyles} ${variantStyles[variant]}`}>
      {children}
    </span>
  );
};
