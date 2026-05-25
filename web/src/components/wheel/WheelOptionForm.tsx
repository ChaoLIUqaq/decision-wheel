import { Button } from '../ui/Button'
import { Card } from '../ui/Card'
import { TextInput } from '../ui/TextInput'

interface WheelOptionFormProps {
  value: string
  canAddOption: boolean
  disabled: boolean
  onChange: (value: string) => void
  onSubmit: () => void
}

export function WheelOptionForm({
  value,
  canAddOption,
  disabled,
  onChange,
  onSubmit,
}: WheelOptionFormProps) {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onSubmit()
  }

  return (
    <Card>
      <h2 className="text-lg font-semibold text-[var(--ink)]">Add option</h2>
      <form className="mt-4 flex gap-2" onSubmit={handleSubmit}>
        <TextInput
          aria-label="Option label"
          disabled={disabled}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Enter an option"
          value={value}
        />
        <Button disabled={disabled || !canAddOption} type="submit" variant="primary">
          Add
        </Button>
      </form>
      <p className="mt-3 text-xs text-[var(--muted)]">
        Empty and duplicate options are ignored.
      </p>
    </Card>
  )
}
