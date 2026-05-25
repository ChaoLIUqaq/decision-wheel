import type { WheelOption } from '../../types/wheel'

interface SpinResultProps {
  selectedOption: WheelOption | null
  optionCount: number
  isSpinning: boolean
}

export function SpinResult({
  selectedOption,
  optionCount,
  isSpinning,
}: SpinResultProps) {
  if (optionCount < 2) {
    return (
      <p className="text-center text-sm text-[var(--muted)]">
        Add at least two options to spin.
      </p>
    )
  }

  if (isSpinning) {
    return (
      <p className="text-center text-sm font-semibold text-[var(--muted)]">
        Choosing...
      </p>
    )
  }

  if (!selectedOption) {
    return (
      <p className="text-center text-sm text-[var(--muted)]">
        Spin when you are ready.
      </p>
    )
  }

  return (
    <div className="w-full max-w-md rounded-3xl border border-[var(--line)] bg-[var(--glass-soft)] p-4 text-center">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--muted)]">
        Selected
      </p>
      <p className="mt-1 text-2xl font-bold text-[var(--ink)]">
        {selectedOption.label}
      </p>
    </div>
  )
}
