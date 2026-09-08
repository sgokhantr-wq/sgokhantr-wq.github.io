import { Fragment, useState } from 'react'
import { DocumentFrame } from '../../components/DocumentFrame'
import { MILESTONES, WEEKS, WORKSTREAMS, WORK_START, WORK_TO, weekOf, type Milestone } from '../../content/milestones'
import s from './BuildGrid.module.css'

const REST = 'Hover or tab a milestone for its date · ≈ dated by page creation timestamps'

function weekStart(n: number): string {
  const [y, m, d] = WORK_START.split('-').map(Number)
  return new Date(Date.UTC(y, m - 1, d + 7 * (n - 1))).toISOString().slice(5, 10)
}

const describe = (m: Milestone) => `${m.approx ? 'by ' : ''}${m.date} · ${m.stream} — ${m.label}`

/** The 17-week build period as a matrix: weeks across, workstreams down, real dated milestones in the cells. */
export default function BuildGrid() {
  const [live, setLive] = useState(REST)
  const byCell = new Map<string, Milestone[]>()
  for (const m of MILESTONES) {
    const k = `${m.stream}|${weekOf(m.date)}`
    byCell.set(k, [...(byCell.get(k) ?? []), m])
  }
  const weeks = Array.from({ length: WEEKS }, (_, i) => i + 1)

  return (
    <DocumentFrame
      title="Build log"
      meta={`${WORK_START} → ${WORK_TO} · ${WEEKS} weeks`}
      ruled={false}
      scroll
      label="Build log: milestones by week and workstream"
      caption={
        <span className={s.live} aria-live="polite">
          {live}
        </span>
      }
    >
      <div className={s.wrap}>
        <div className={s.grid}>
          <div className={s.corner}>Workstream</div>
          {weeks.map((w) => (
            <div key={w} className={`${s.wk} ${w === WEEKS ? s.today : ''}`}>
              W{w}
              <small>{weekStart(w)}</small>
              {w === WEEKS && <em>today</em>}
            </div>
          ))}
          {WORKSTREAMS.map((st) => (
            <Fragment key={st}>
              <div className={s.stream}>{st}</div>
              {weeks.map((w) => (
                <div key={w} className={s.cell}>
                  {(byCell.get(`${st}|${w}`) ?? []).map((m) => (
                    <button
                      key={`${m.date}-${m.label}`}
                      type="button"
                      className={`${s.ms} ${m.approx ? s.approx : ''}`}
                      title={`${m.approx ? 'by ' : ''}${m.date}`}
                      onMouseEnter={() => setLive(describe(m))}
                      onMouseLeave={() => setLive(REST)}
                      onFocus={() => setLive(describe(m))}
                      onBlur={() => setLive(REST)}
                    >
                      {m.approx ? '≈ ' : ''}
                      {m.label}
                    </button>
                  ))}
                </div>
              ))}
            </Fragment>
          ))}
        </div>
      </div>
    </DocumentFrame>
  )
}
