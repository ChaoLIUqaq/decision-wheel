import type { InputHTMLAttributes } from 'react'

type TextInputProps = InputHTMLAttributes<HTMLInputElement>

export function TextInput({ className = '', ...props }: TextInputProps) {
  return (
    <input
      className={`min-h-11 w-full rounded-2xl border border-[var(--line)] bg-[var(--glass-soft)] px-4 py-2 text-sm text-[var(--ink)] outline-none placeholder:text-[var(--muted)] focus:border-[var(--accent)] ${className}`}
      {...props}
    />
  )
}
