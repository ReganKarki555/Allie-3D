import type { ButtonHTMLAttributes } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary';
};

export function Button({ variant = 'primary', className = '', ...props }: ButtonProps) {
  const variantClasses =
    variant === 'primary'
      ? 'bg-black text-white hover:bg-zinc-800'
      : 'border border-zinc-300 bg-white text-zinc-900 hover:bg-zinc-100';

  return (
    <button
      className={`inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium transition ${variantClasses} ${className}`}
      {...props}
    />
  );
}
