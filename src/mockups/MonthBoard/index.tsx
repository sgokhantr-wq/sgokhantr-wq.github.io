import { Screen } from '../../components/Screen'
import { useClock } from '../../lib/useClock'
import { CELLS, CLASH, DOW, INSP, JOBS, PTO, dayLabel, isPadding, isWeekend } from './data'
import s from './MonthBoard.module.css'

/** The month dispatch board: one chip per job per weekday, coloured so no two jobs in a week match. */
export default function MonthBoard() {
  const clock = useClock()
  const cells = Array.from({ length: CELLS }, (_, i) => i)

  return (
    <Screen
      title="Job calendar"
      meta={`September 2026 · 31 crew · ${clock}`}
      lifted
      scroll
      label="Month dispatch board with synthetic jobs"
      foot={
        <>
          <span className="chip chip--sched">12 jobs scheduled</span>
          <span className="chip chip--done">PTO is a hard block</span>
          <span className="chip chip--blocked">1 dispatch clash flagged</span>
          <span className="chip chip--brand">1 inspection auto-detected</span>
        </>
      }
    >
      <div className={s.wrap}>
        <div className={s.grid} aria-label="September 2026">
          {DOW.map((d) => (
            <div key={d} className={s.dow}>
              {d}
            </div>
          ))}
          {cells.map((i) => {
            const wknd = isWeekend(i)
            const chips = wknd || isPadding(i) ? [] : JOBS.filter((j) => i >= j.start && i <= j.end)
            const pto = i >= PTO.from && i <= PTO.to
            return (
              <div key={i} className={[s.cell, wknd && s.wknd, isPadding(i) && s.pad].filter(Boolean).join(' ')}>
                <span className={s.day}>{dayLabel(i)}</span>
                {pto && (
                  <span className={`${s.chip} ${s.pto}`} title={PTO.label}>
                    <span className={s.label}>{i === PTO.from ? 'PTO — bridged' : 'PTO'}</span>
                  </span>
                )}
                {i === INSP.day && (
                  <span className={`${s.chip} ${s.insp}`} title={INSP.label}>
                    <span className={s.label}>Inspection</span>
                    <span className={s.crew}>1</span>
                  </span>
                )}
                {chips.map((j) => {
                  const clash = CLASH.day === i && CLASH.job === j.id
                  return (
                    <span
                      key={j.id}
                      className={`${s.chip} ${clash ? s.clash : ''}`}
                      style={{ ['--c' as string]: `var(--j${j.hue + 1})` }}
                      title={clash ? `${j.name} · ${CLASH.label}` : `${j.name} · Crew ${j.crew}`}
                    >
                      {clash && <span className={s.bang}>!</span>}
                      <span className={s.label}>{j.short}</span>
                      <span className={s.crew}>{j.crew}</span>
                    </span>
                  )
                })}
              </div>
            )
          })}
        </div>
      </div>
    </Screen>
  )
}
