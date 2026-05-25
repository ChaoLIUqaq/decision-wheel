import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <div
      className={`rounded-3xl border border-[var(--line)] bg-[var(--glass)] p-5 shadow-[var(--shadow-card)] ${className}`}
    >
      {children}
    </div>
  )
}
