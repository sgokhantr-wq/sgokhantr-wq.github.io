import type { ReactNode } from 'react'
import { DocumentFrame } from '../../components/DocumentFrame'
import { Stamp } from '../../components/Stamp'
import { A, JOBS_THIS_WEEK, PLACEHOLDER, Q, TOOL_CHIP } from './data'
import s from './CentaurusChat.module.css'

function You({ text }: { text: string }) {
  return (
    <div className={s.turn}>
      <span className={`head ${s.who}`}>You</span>
      <p className={s.q}>{text}</p>
    </div>
  )
}

function Bot({ children }: { children: ReactNode }) {
  return (
    <div className={s.turn}>
      <span className={`head ${s.who}`}>Centaurus</span>
      {children}
    </div>
  )
}

/** Four exchanges: governed SQL, the metric registry, a navigation answer, a refusal. */
export default function CentaurusChat() {
  const tiles = Array.from({ length: 12 }, (_, i) => ({ c: i % 4, r: Math.floor(i / 4) }))
  const ringed = { c: 2, r: 1 }
  const tx = (c: number) => 8 + c * 38
  const ty = (r: number) => 8 + r * 30

  return (
    <DocumentFrame
      title="Centaurus · desk chat"
      meta="governed SQL · registry · navigation"
      ruled={false}
      label="Centaurus desk chat with four synthetic exchanges"
      caption="Every SQL statement is guarded server-side and audited · “how is X calculated” answers only from the registry · a data-shaped question without a lookup is refused, never guessed"
    >
      <div className={s.col}>
        <You text={Q.jobs} />
        <Bot>
          <span className={s.chip}>{TOOL_CHIP}</span>
          <table className={`ledger ledger--dense ${s.mini}`}>
            <thead>
              <tr>
                <th scope="col">Job</th>
                <th scope="col">Type</th>
                <th scope="col">Created</th>
              </tr>
            </thead>
            <tbody>
              {JOBS_THIS_WEEK.map((j) => (
                <tr key={j.job}>
                  <td>{j.job}</td>
                  <td>{j.type}</td>
                  <td>{j.created}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className={s.a}>{A.jobs}</p>
        </Bot>

        <You text={Q.billed} />
        <Bot>
          <p className={s.a}>{A.billed}</p>
          <span className="evidence">{A.billedEvidence}</span>
        </Bot>

        <You text={Q.where} />
        <Bot>
          <ol className={s.steps}>
            {A.whereSteps.map((st) => (
              <li key={st}>{st}</li>
            ))}
          </ol>
          <svg className={s.wire} width="160" height="100" viewBox="0 0 160 100" role="img" aria-label="Workspace wireframe with the Material Forecast tile ringed">
            {tiles.map((t) => (
              <rect key={`${t.c}-${t.r}`} className={s.tile} x={tx(t.c)} y={ty(t.r)} width="32" height="22" />
            ))}
            <rect className={s.ring} x={tx(ringed.c) - 3} y={ty(ringed.r) - 3} width="38" height="28" />
            <polyline className={s.arrow} points={`${tx(ringed.c) + 60},${ty(ringed.r) + 34} ${tx(ringed.c) + 20},${ty(ringed.r) + 28}`} />
            <polyline className={s.arrow} points={`${tx(ringed.c) + 26},${ty(ringed.r) + 34} ${tx(ringed.c) + 20},${ty(ringed.r) + 28} ${tx(ringed.c) + 27},${ty(ringed.r) + 25}`} />
          </svg>
          <span className="evidence">{A.whereEvidence}</span>
        </Bot>

        <You text={Q.address} />
        <Bot>
          <p className={s.a}>{A.address1}</p>
          <div className={s.refuse}>
            <p className={s.a}>{A.address2}</p>
            <Stamp label="Refused" size="sm" flat />
          </div>
        </Bot>
      </div>
      <div className={s.composer} aria-hidden="true">
        <span>{PLACEHOLDER}</span>
        <b>ASK</b>
      </div>
    </DocumentFrame>
  )
}
