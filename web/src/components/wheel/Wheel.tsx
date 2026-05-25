import type { WheelOption } from '../../types/wheel'
import { createWheelGradient } from '../../utils/wheel'

interface WheelProps {
  options: WheelOption[]
  rotationAngle: number
  rotationTransitionMs: number
  isSpinning: boolean
}

export function Wheel({
  options,
  rotationAngle,
  rotationTransitionMs,
  isSpinning,
}: WheelProps) {
  const segmentAngle = options.length > 0 ? 360 / options.length : 0

  return (
    <div className="relative aspect-square w-full max-w-[28rem]">
      <div className="absolute left-1/2 top-0 z-10 h-0 w-0 -translate-x-1/2 border-x-[0.85rem] border-t-[1.45rem] border-x-transparent border-t-[var(--ink)]" />

      <div
        aria-label="Decision wheel"
        className="absolute inset-0 rounded-full border border-[var(--line-strong)] shadow-[var(--shadow-soft)] ease-out"
        role="img"
        style={{
          background: createWheelGradient(options),
          transform: `rotate(${rotationAngle}deg)`,
          transitionDuration: `${rotationTransitionMs}ms`,
          transitionProperty: 'transform',
        }}
      >
        <div className="absolute inset-[7%] rounded-full border border-white/30" />
        {options.map((option, index) => {
          const angle = index * segmentAngle + segmentAngle / 2
          const radialAngle = angle - 90
          const labelFontSize =
            option.label.length > 14
              ? '0.62rem'
              : option.label.length > 10 || options.length > 8
                ? '0.72rem'
                : options.length > 6
                  ? '0.78rem'
                  : '0.9rem'

          return (
            <div
              className="absolute left-1/2 top-1/2 h-0 w-[50%] origin-left"
              key={option.id}
              style={{
                transform: `rotate(${radialAngle}deg)`,
              }}
            >
              <span
                className="absolute right-[7%] top-1/2 flex h-8 -translate-y-1/2 items-center justify-center overflow-hidden whitespace-nowrap rounded-full bg-black/20 px-3 text-center font-bold text-white shadow-sm backdrop-blur-sm"
                style={{
                  fontSize: labelFontSize,
                  lineHeight: 1,
                  width: options.length > 8 ? '64%' : '70%',
                }}
                title={option.label}
              >
                {option.label}
              </span>
            </div>
          )
        })}

        <div className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--line-strong)] bg-[var(--glass-strong)] text-sm font-black text-[var(--ink)] shadow-[var(--shadow-card)]">
          {isSpinning ? '...' : 'SPIN'}
        </div>
      </div>
    </div>
  )
}
