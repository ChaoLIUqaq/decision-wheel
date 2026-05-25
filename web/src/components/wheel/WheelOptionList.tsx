import type { WheelOption } from '../../types/wheel'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'

interface WheelOptionListProps {
  options: WheelOption[]
  disabled: boolean
  onRemove: (id: string) => void
  onReset: () => void
}

export function WheelOptionList({
  options,
  disabled,
  onRemove,
  onReset,
}: WheelOptionListProps) {
  const probability = options.length > 0 ? 100 / options.length : 0
  const probabilityLabel = `${probability.toFixed(
    Number.isInteger(probability) ? 0 : 1,
  )}%`

  return (
    <Card className="min-h-0">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-[var(--ink)]">Options</h2>
          <p className="text-xs text-[var(--muted)]">
            {options.length} choices · {probabilityLabel} each
          </p>
        </div>
        <Button disabled={disabled} onClick={onReset} variant="ghost">
          Reset options
        </Button>
      </div>

      <div className="mt-4 flex max-h-80 flex-col gap-2 overflow-y-auto pr-1">
        {options.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[var(--line)] bg-[var(--glass-soft)] px-3 py-4 text-sm text-[var(--muted)]">
            Add at least two options to spin the wheel.
          </div>
        ) : null}

        {options.map((option) => (
          <div
            className="flex items-center justify-between gap-3 rounded-2xl border border-[var(--line)] bg-[var(--glass-soft)] px-3 py-2 text-sm text-[var(--ink)]"
            key={option.id}
          >
            <div className="min-w-0 flex-1">
              <span className="block truncate">{option.label}</span>
              <span className="text-xs text-[var(--muted)]">
                {probabilityLabel} chance
              </span>
            </div>
            <button
              aria-label={`Delete ${option.label}`}
              className="rounded-full px-2 py-1 text-xs font-bold text-[var(--muted)] hover:bg-[var(--glass-hover)] hover:text-[var(--ink)] disabled:cursor-not-allowed disabled:opacity-45"
              disabled={disabled}
              onClick={() => onRemove(option.id)}
              type="button"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </Card>
  )
}
