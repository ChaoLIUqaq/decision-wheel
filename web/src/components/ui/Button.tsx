import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
}

const variantClasses = {
  primary: 'border-transparent bg-[var(--accent)] text-black hover:opacity-90',
  secondary:
    'border-[var(--line)] bg-[var(--glass)] text-[var(--ink)] hover:bg-[var(--glass-hover)]',
  ghost:
    'border-transparent bg-transparent text-[var(--muted)] hover:text-[var(--ink)]',
}

export function Button({
  children,
  className = '',
  type = 'button',
  variant = 'secondary',
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex min-h-11 items-center justify-center rounded-2xl border px-4 py-2 text-sm font-bold disabled:cursor-not-allowed disabled:opacity-45 ${variantClasses[variant]} ${className}`}
      type={type}
      {...props}
    >
      {children}
    </button>
  )
}
