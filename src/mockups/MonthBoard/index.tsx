import { DocumentFrame } from '../../components/DocumentFrame'
import { useClock } from '../../lib/useClock'
import { CELLS, CLASH, DOW, INSP, JOBS, PTO, dayLabel, isPadding, isWeekend } from './data'
import s from './MonthBoard.module.css'

const tintCls = ['t0', 't1', 't2', 't3'] as const

/** The month planning board: one chip per job per weekday, drawn from synthetic jobs. */
export default function MonthBoard() {
  const clock = useClock()
  const cells = Array.from({ length: CELLS }, (_, i) => i)

  return (
    <DocumentFrame
      title="Job calendar · Sep 2026"
      meta={`31 crew · demand engine · ${clock}`}
      ruled={false}
      scroll
      label="Month planning board with synthetic jobs"
      caption="12 invented jobs · 12 chip styles from 4 tints × 3 fills, assigned by greedy graph colouring so no two jobs in one week share a style · PTO is a hard block · clashes are flagged, never corrected"
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
                    {i === PTO.from ? 'PTO — bridged' : PTO.short}
                  </span>
                )}
                {i === INSP.day && (
                  <span className={`${s.chip} ${s.insp}`} title={INSP.label}>
                    {INSP.short}
                  </span>
                )}
                {chips.map((j) => {
                  const clash = CLASH.day === i && CLASH.job === j.id
                  const cls = [s.chip, s[tintCls[j.tint]], j.fill !== 'solid' && s[j.fill], clash && s.clash].filter(Boolean).join(' ')
                  return (
                    <span key={j.id} className={cls} title={clash ? `${j.name} · ${CLASH.label}` : `${j.name} · Crew ${j.crew}`}>
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
        <div className={s.legend} aria-label="Legend">
          <span>
            <span className={`${s.chip} ${s.t0}`}>solid</span>
            <span className={`${s.chip} ${s.t1} ${s.hatch}`}>hatch</span>
            <span className={`${s.chip} ${s.t2} ${s.dots}`}>dots</span>
            fills × 4 tints
          </span>
          <span>
            <span className={`${s.chip} ${s.pto}`}>PTO</span>
            hard block
          </span>
          <span>
            <span className={`${s.chip} ${s.t0} ${s.clash}`}>
              <span className={s.bang}>!</span>clash
            </span>
            flagged, not corrected
          </span>
          <span>
            <span className={`${s.chip} ${s.insp}`}>INSP</span>
            auto-detected
          </span>
        </div>
      </div>
    </DocumentFrame>
  )
}
