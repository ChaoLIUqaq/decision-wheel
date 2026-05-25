import { useState } from 'react'
import type { WheelOption } from '../types/wheel'
import {
  createSpinRotation,
  createWheelOption,
  defaultWheelOptions,
  getOptionAtPointer,
  normalizeOptionLabel,
  optionExists,
} from '../utils/wheel'

const spinDurationMs = 1800

export function useDecisionWheel() {
  const [options, setOptions] = useState<WheelOption[]>(defaultWheelOptions)
  const [inputValue, setInputValue] = useState('')
  const [wheelPurpose, setWheelPurpose] = useState('')
  const [isEditingPurpose, setIsEditingPurpose] = useState(true)
  const [selectedOption, setSelectedOption] = useState<WheelOption | null>(null)
  const [isSpinning, setIsSpinning] = useState(false)
  const [rotationAngle, setRotationAngle] = useState(0)
  const [rotationTransitionMs, setRotationTransitionMs] = useState(0)

  const canSpin = options.length >= 2 && !isSpinning
  const normalizedInput = normalizeOptionLabel(inputValue)
  const canAddOption =
    normalizedInput.length > 0 && !optionExists(options, normalizedInput)

  function addOption() {
    if (!canAddOption || isSpinning) {
      return
    }

    setOptions((currentOptions) => [
      ...currentOptions,
      createWheelOption(normalizedInput),
    ])
    setInputValue('')
    setSelectedOption(null)
  }

  function removeOption(id: string) {
    if (isSpinning) {
      return
    }

    setOptions((currentOptions) =>
      currentOptions.filter((option) => option.id !== id),
    )
    setSelectedOption(null)
  }

  function resetOptions() {
    if (isSpinning) {
      return
    }

    setOptions([])
    setInputValue('')
    setSelectedOption(null)
    setRotationTransitionMs(0)
    setRotationAngle(0)
  }

  function resetWheel() {
    if (isSpinning) {
      return
    }

    setSelectedOption(null)
    setRotationTransitionMs(0)
    setRotationAngle(0)
  }

  function confirmWheelPurpose() {
    const normalizedPurpose = normalizeOptionLabel(wheelPurpose)

    if (!normalizedPurpose) {
      return
    }

    setWheelPurpose(normalizedPurpose)
    setIsEditingPurpose(false)
  }

  function editWheelPurpose() {
    setIsEditingPurpose(true)
  }

  function spinWheel() {
    if (!canSpin) {
      return
    }

    const nextRotation = createSpinRotation(rotationAngle)
    const winningOption = getOptionAtPointer(options, nextRotation)

    setSelectedOption(null)
    setIsSpinning(true)
    setRotationTransitionMs(spinDurationMs)
    setRotationAngle(nextRotation)

    window.setTimeout(() => {
      setSelectedOption(winningOption)
      setIsSpinning(false)
    }, spinDurationMs)
  }

  return {
    options,
    inputValue,
    setInputValue,
    wheelPurpose,
    setWheelPurpose,
    isEditingPurpose,
    selectedOption,
    isSpinning,
    rotationAngle,
    rotationTransitionMs,
    canSpin,
    canAddOption,
    addOption,
    removeOption,
    resetOptions,
    resetWheel,
    confirmWheelPurpose,
    editWheelPurpose,
    spinWheel,
  }
}
