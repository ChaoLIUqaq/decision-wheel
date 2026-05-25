import { Shell } from './components/layout/Shell'
import { Card } from './components/ui/Card'
import { TextInput } from './components/ui/TextInput'
import { SpinResult } from './components/wheel/SpinResult'
import { Wheel } from './components/wheel/Wheel'
import { WheelOptionForm } from './components/wheel/WheelOptionForm'
import { WheelOptionList } from './components/wheel/WheelOptionList'
import { useDecisionWheel } from './hooks/useDecisionWheel'

export default function App() {
  const wheel = useDecisionWheel()

  return (
    <Shell appName="decision-wheel">
      <div className="grid flex-1 gap-6 p-4 sm:p-6 lg:grid-cols-[22rem_minmax(0,1fr)]">
        <section className="flex min-w-0 flex-col gap-4">
          <Card>
            <h1 className="display-font text-3xl font-bold text-[var(--ink)]">
              Decision Wheel
            </h1>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Add choices, spin the wheel, and let chance pick for dinners,
              games, study topics, presenters, or party prompts.
            </p>
          </Card>

          <WheelOptionForm
            canAddOption={wheel.canAddOption}
            disabled={wheel.isSpinning}
            onChange={wheel.setInputValue}
            onSubmit={wheel.addOption}
            value={wheel.inputValue}
          />

          <WheelOptionList
            disabled={wheel.isSpinning}
            onRemove={wheel.removeOption}
            onReset={wheel.resetOptions}
            options={wheel.options}
          />
        </section>

        <section className="flex min-h-[34rem] min-w-0 flex-col items-center justify-center gap-5 rounded-3xl border border-[var(--line)] bg-[var(--glass)] p-4 shadow-[var(--shadow-card)] sm:p-6">
          {wheel.isEditingPurpose ? (
            <form
              className="flex w-full max-w-md gap-2"
              onSubmit={(event) => {
                event.preventDefault()
                wheel.confirmWheelPurpose()
              }}
            >
              <TextInput
                aria-label="Wheel purpose"
                disabled={wheel.isSpinning}
                id="wheel-purpose"
                onChange={(event) => wheel.setWheelPurpose(event.target.value)}
                placeholder="Enter a question, like: What should we eat tonight?"
                value={wheel.wheelPurpose}
              />
              <button
                className="min-h-11 rounded-2xl bg-[var(--accent)] px-4 py-2 text-sm font-bold text-black disabled:cursor-not-allowed disabled:opacity-45"
                disabled={!wheel.wheelPurpose.trim() || wheel.isSpinning}
                type="submit"
              >
                Confirm
              </button>
            </form>
          ) : (
            <div className="flex w-full max-w-2xl flex-col items-center gap-2 text-center">
              <h2 className="display-font w-full overflow-hidden text-ellipsis whitespace-nowrap text-[clamp(1.5rem,5vw,3rem)] font-bold leading-tight text-[var(--ink)]">
                {wheel.wheelPurpose}
              </h2>
              <button
                className="rounded-2xl border border-[var(--line)] bg-[var(--glass-soft)] px-4 py-2 text-sm font-bold text-[var(--ink)] hover:bg-[var(--glass-hover)] disabled:cursor-not-allowed disabled:opacity-45"
                disabled={wheel.isSpinning}
                onClick={wheel.editWheelPurpose}
                type="button"
              >
                Edit
              </button>
            </div>
          )}

          <Wheel
            isSpinning={wheel.isSpinning}
            options={wheel.options}
            rotationAngle={wheel.rotationAngle}
            rotationTransitionMs={wheel.rotationTransitionMs}
          />

          <div className="flex flex-wrap justify-center gap-3">
            <button
              className="min-h-12 rounded-full bg-[var(--accent)] px-8 py-3 text-base font-black text-black shadow-[var(--shadow-card)] disabled:cursor-not-allowed disabled:opacity-45"
              disabled={!wheel.canSpin}
              onClick={wheel.spinWheel}
              type="button"
            >
              {wheel.isSpinning ? 'Spinning...' : 'Spin wheel'}
            </button>
            <button
              className="min-h-12 rounded-full bg-[var(--accent)] px-8 py-3 text-base font-black text-black shadow-[var(--shadow-card)] disabled:cursor-not-allowed disabled:opacity-45"
              disabled={wheel.isSpinning}
              onClick={wheel.resetWheel}
              type="button"
            >
              Reset wheel
            </button>
          </div>

          <SpinResult
            isSpinning={wheel.isSpinning}
            optionCount={wheel.options.length}
            selectedOption={wheel.selectedOption}
          />
        </section>
      </div>
    </Shell>
  )
}
