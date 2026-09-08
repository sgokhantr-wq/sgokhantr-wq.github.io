import { useEffect, useRef, useState } from 'react'
import { DocumentFrame } from '../../components/DocumentFrame'
import { useInView } from '../../lib/useInView'
import { useReducedMotion } from '../../lib/useReducedMotion'
import { POOL, SEED, STAGES, TIEOUTS, addSeconds, type GuardRow } from './data'
import s from './GuardLog.module.css'

const MAX = 7
const PERIOD = 6_000

type Row = GuardRow & { key: number }

/** The SQL guard's audit trail (a slow ticker), the guard stages, and the tie-out register. */
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
        const next: Row = { ...src, time: addSeconds(last.time, src.delta), key }
        return [...prev, next].slice(-MAX)
      })
      setFreshKey(key)
    }, PERIOD)
    return () => window.clearInterval(id)
  }, [inView, reduced])

  return (
    <div ref={ref}>
      <DocumentFrame
        title="SQL guard · audit trail"
        meta="every attempt logged"
        ruled={false}
        scroll
        label="SQL guard audit trail, guard stages and tie-out register"
        caption="31 adversarial cases re-run after every guard change · a standing failure is how a real regression hides · tie-outs are the regression tests"
      >
        <div className={s.wrap}>
          <table className={`ledger ledger--dense ${s.table}`}>
            <thead>
              <tr>
                <th scope="col">Time</th>
                <th scope="col">Role</th>
                <th scope="col">Verdict</th>
                <th scope="col">Reason</th>
                <th scope="col" className={s.num}>
                  Rows
                </th>
                <th scope="col" className={s.num}>
                  ms
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.key} className={r.key === freshKey ? s.fresh : undefined}>
                  <td className={s.time}>{r.time}</td>
                  <td>{r.role}</td>
                  <td className={`${s.verdict} ${r.verdict !== 'ALLOWED' ? 'verdict--blocked' : ''}`}>{r.verdict}</td>
                  <td className={s.reason}>{r.reason}</td>
                  <td className={s.num}>{r.rows}</td>
                  <td className={s.num}>{r.ms}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className={s.strip}>
            <span className="head">Guard stages</span>
            {STAGES.map((st, i) => (
              <span key={st}>
                {st}
                {i < STAGES.length - 1 && <span className={s.arrow}>→</span>}
              </span>
            ))}
          </div>

          <div className={`head ${s.sub}`}>Tie-out register</div>
          <table className={`ledger ledger--dense ${s.table}`}>
            <thead>
              <tr>
                <th scope="col">Surface pair</th>
                <th scope="col">Population</th>
                <th scope="col" className={s.num}>
                  Mismatches
                </th>
              </tr>
            </thead>
            <tbody>
              {TIEOUTS.map((t) => (
                <tr key={t.pair}>
                  <td className={s.reason}>{t.pair}</td>
                  <td>{t.population}</td>
                  <td className={s.num}>{t.mismatches}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DocumentFrame>
    </div>
  )
}
