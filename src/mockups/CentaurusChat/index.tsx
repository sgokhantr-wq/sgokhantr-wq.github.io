import type { ReactNode } from 'react'
import { Screen } from '../../components/Screen'
import { A, JOBS_THIS_WEEK, PLACEHOLDER, Q, TOOL_CHIP } from './data'
import s from './CentaurusChat.module.css'

function You({ text }: { text: string }) {
  return (
    <div className={s.turn}>
      <span className={s.who}>You</span>
      <p className={s.q}>{text}</p>
    </div>
  )
}

function Bot({ children }: { children: ReactNode }) {
  return (
    <div className={s.turn}>
      <span className={`${s.who} ${s.whoAi}`}>Centaurus</span>
      {children}
    </div>
  )
}

/** The assistant answering four questions: from SQL, from the registry, from the workspace, and not at all. */
export default function CentaurusChat() {
  const tiles = Array.from({ length: 12 }, (_, i) => ({ c: i % 4, r: Math.floor(i / 4) }))
  const ring = { c: 2, r: 1 }
  const tx = (c: number) => 8 + c * 38
  const ty = (r: number) => 8 + r * 30

  return (
    <Screen
      title="Centaurus AI"
      meta="asks the database, not the model"
      lifted
      label="The AI assistant answering four questions"
      foot={
        <>
          <span className="chip chip--ai">39-table allowlist</span>
          <span className="chip chip--ai">35 documented figures</span>
          <span className="chip chip--blocked">refuses without a lookup</span>
        </>
      }
    >
      <div className={s.col}>
        <You text={Q.jobs} />
        <Bot>
          <span className={s.tool}>
            <span className={s.toolDot} />
            {TOOL_CHIP}
          </span>
          <table className={s.mini}>
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
                  <td className={s.type}>{j.type}</td>
                  <td className={s.type}>{j.created}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className={s.a}>{A.jobs}</p>
        </Bot>

        <You text={Q.billed} />
        <Bot>
          <p className={s.a}>{A.billed}</p>
          <span className={s.evidence}>{A.billedEvidence}</span>
        </Bot>

        <You text={Q.where} />
        <Bot>
          <ol className={s.steps}>
            {A.whereSteps.map((st) => (
              <li key={st}>{st}</li>
            ))}
          </ol>
          <svg className={s.wire} width="170" height="104" viewBox="0 0 170 104" role="img" aria-label="Workspace wireframe with one tile ringed">
            {tiles.map((t) => (
              <rect key={`${t.c}-${t.r}`} className={s.tile} x={tx(t.c)} y={ty(t.r)} width="32" height="22" rx="3" />
            ))}
            <rect className={s.ring} x={tx(ring.c) - 3} y={ty(ring.r) - 3} width="38" height="28" rx="5" />
            <path className={s.arrow} d={`M${tx(ring.c) + 62},${ty(ring.r) + 40} L${tx(ring.c) + 22},${ty(ring.r) + 28}`} />
            <path className={s.arrow} d={`M${tx(ring.c) + 22},${ty(ring.r) + 28} l9,1 M${tx(ring.c) + 22},${ty(ring.r) + 28} l4,-8`} />
          </svg>
          <span className={s.evidence}>{A.whereEvidence}</span>
        </Bot>

        <You text={Q.address} />
        <Bot>
          <p className={s.a}>{A.address1}</p>
          <div className={s.refuse}>
            <p className={s.a}>{A.address2}</p>
            <span className="chip chip--blocked">refused</span>
          </div>
        </Bot>
      </div>
      <div className={s.composer} aria-hidden="true">
        <span>{PLACEHOLDER}</span>
        <span className={s.ask}>ASK</span>
      </div>
    </Screen>
  )
}
