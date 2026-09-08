import { useEffect, useRef, useState } from 'react'
import { Screen } from '../../components/Screen'
import { useInView } from '../../lib/useInView'
import { useReducedMotion } from '../../lib/useReducedMotion'
import { POOL, SEED, STAGES, addSeconds, type GuardRow } from './data'
import s from './GuardLog.module.css'

const MAX = 7
const PERIOD = 6_000

type Row = GuardRow & { key: number }

const verdictChip = (v: GuardRow['verdict']) =>
  v === 'ALLOWED' ? 'chip chip--sched' : v === 'BLOCKED' ? 'chip chip--blocked' : 'chip chip--risk'

/** The SQL guard's audit trail, ticking, with the stages every query passes through. */
export default function GuardLog() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref)
  const reduced = useReducedMotion()
  const [rows, setRows] = useState<Row[]>(() => SEED.map((r, i) => ({ ...r, key: i })))
  const [freshKey, setFreshKey] = useState<number | null>(null)
  const counter = useRef(SEED.length)

  useEffect(() => {
    if (!inView || reduced) return
    const id = window.setInterval(() => {
      const src = POOL[counter.current % POOL.length]
      const key = counter.current++
      setRows((prev) => {
        const last = prev[prev.length - 1]
        return [...prev, { ...src, time: addSeconds(last.time, src.delta), key }].slice(-MAX)
      })
      setFreshKey(key)
    }, PERIOD)
    return () => window.clearInterval(id)
  }, [inView, reduced])

  return (
    <div ref={ref}>
      <Screen
        title="SQL guard"
        meta="every attempt logged"
        scroll
        label="The SQL guard's audit trail and the stages a query passes through"
        foot={<span>31 adversarial cases, re-run after every change to the guard</span>}
      >
        <div className={s.wrap}>
          <table className={s.table}>
            <thead>
              <tr>
                <th scope="col">Time</th>
                <th scope="col">Role</th>
                <th scope="col">Verdict</th>
                <th scope="col">Reason</th>
                <th scope="col" className={s.num}>
                  Rows
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.key} className={r.key === freshKey ? s.fresh : undefined}>
                  <td className={s.time}>{r.time}</td>
                  <td>{r.role}</td>
                  <td>
                    <span className={verdictChip(r.verdict)}>{r.verdict}</span>
                  </td>
                  <td className={s.reason}>{r.reason}</td>
                  <td className={s.num}>{r.rows || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className={s.stages}>
            {STAGES.map((st, i) => (
              <span key={st}>
                <span className={`${s.stage} ${i === STAGES.length - 1 ? s.stageLast : ''}`}>{st}</span>
                {i < STAGES.length - 1 && <span className={s.sep}> › </span>}
              </span>
            ))}
          </div>
        </div>
      </Screen>
    </div>
  )
}
