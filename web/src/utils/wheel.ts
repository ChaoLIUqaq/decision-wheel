import type { WheelOption } from '../types/wheel'

export const defaultWheelOptions: WheelOption[] = []

export function normalizeOptionLabel(value: string) {
  return value.trim().replace(/\s+/g, ' ')
}

export function optionExists(options: WheelOption[], label: string) {
  const normalizedLabel = normalizeOptionLabel(label).toLocaleLowerCase()

  return options.some(
    (option) => option.label.toLocaleLowerCase() === normalizedLabel,
  )
}

export function createWheelOption(label: string): WheelOption {
  return {
    id: crypto.randomUUID(),
    label: normalizeOptionLabel(label),
  }
}

export function pickRandomOption(options: WheelOption[]) {
  return options[Math.floor(Math.random() * options.length)]
}

export function createSpinRotation(currentRotation: number) {
  const fullRotations = 5 + Math.floor(Math.random() * 4)
  const landingAngle = Math.floor(Math.random() * 360)

  return currentRotation + fullRotations * 360 + landingAngle
}

export function createWheelGradient(options: WheelOption[]) {
  if (options.length === 0) {
    return 'linear-gradient(135deg, var(--glass), var(--glass-strong))'
  }

  const palette = [
    'var(--accent)',
    'var(--sky)',
    'var(--mint)',
    'var(--warning)',
    'var(--accent-deep)',
    'var(--sky-deep)',
    'var(--mint-deep)',
    'var(--success)',
    'var(--error)',
    'var(--accent-soft)',
  ]
  const segmentSize = 100 / options.length

  return `conic-gradient(${options
    .map((_, index) => {
      const start = index * segmentSize
      const end = (index + 1) * segmentSize

      return `${palette[index % palette.length]} ${start}% ${end}%`
    })
    .join(', ')})`
}
