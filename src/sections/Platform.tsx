import { PLATFORM } from '../content/copy'
import CashChart from '../mockups/CashChart'
import JobTopic from '../mockups/JobTopic'
import s from './sections.module.css'

export function Platform() {
  return (
    <section className="section" id="platform" aria-labelledby="platform-t">
      <div className="container">
        <div className="section__head">
          <p className="eyebrow">{PLATFORM.eyebrow}</p>
          <h2 id="platform-t">{PLATFORM.title}</h2>
          <p className="lede">{PLATFORM.lede}</p>
        </div>

        <div className="cards-3">
          {PLATFORM.cards.map((c) => (
            <div className="card" key={c.title}>
              <span className={`chip chip--${c.tone}`}>{c.chip}</span>
              <h3 className={s.cardTitle}>{c.title}</h3>
              <p>{c.body}</p>
            </div>
          ))}
        </div>

        <div className={s.block}>
          <CashChart />
          <div className={s.underNote}>
            <h3>{PLATFORM.cash.title}</h3>
            <p>{PLATFORM.cash.body}</p>
            <span className="evidence">{PLATFORM.cash.evidence}</span>
          </div>
        </div>

        <div className={`shot shot--split-l ${s.block}`}>
          <JobTopic />
          <div className="shot__note">
            <h3>{PLATFORM.crew.title}</h3>
            <p>{PLATFORM.crew.body}</p>
            <span className="evidence">{PLATFORM.crew.evidence}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
