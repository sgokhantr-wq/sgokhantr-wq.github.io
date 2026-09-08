import { AI } from '../content/copy'
import CentaurusChat from '../mockups/CentaurusChat'
import GuardLog from '../mockups/GuardLog'
import s from './sections.module.css'

export function AiSection() {
  return (
    <section className="section section--band" id="ai" aria-labelledby="ai-t">
      <div className="container">
        <div className="section__head">
          <p className="eyebrow">{AI.eyebrow}</p>
          <h2 id="ai-t">{AI.title}</h2>
          <p className="lede">{AI.lede}</p>
        </div>

        <div className={s.pair}>
          <CentaurusChat />
          <div>
            <GuardLog />
            <div className={s.underNote} style={{ marginTop: 22 }}>
              <h3>{AI.reading.title}</h3>
              <p>{AI.reading.body}</p>
              <span className="evidence">{AI.reading.evidence}</span>
            </div>
          </div>
        </div>

        <div className={s.points}>
          {AI.points.map((p) => (
            <div className={s.point} key={p.title}>
              <div className={s.pointRule} />
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
