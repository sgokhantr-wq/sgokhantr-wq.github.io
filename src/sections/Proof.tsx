import { PROOF } from '../content/copy'
import { P } from '../content/proof'

export function Proof() {
  return (
    <section className="section" id="proof" aria-labelledby="proof-t">
      <div className="container">
        <div className="section__head">
          <p className="eyebrow">{PROOF.eyebrow}</p>
          <h2 id="proof-t">{PROOF.title}</h2>
          <p className="lede">{PROOF.lede}</p>
        </div>

        <div className="proof">
          {PROOF.numbers.map((n) => (
            <div key={n.n}>
              <div className="proof__n">{n.n}</div>
              <p className="proof__t">{n.t}</p>
            </div>
          ))}
        </div>

        <details className="more">
          <summary>Read the detail behind these</summary>
          <div className="more__body">
            {PROOF.detailIds.map((id) => {
              const c = P(id)
              return (
                <p key={id}>
                  {c.text} <b>{c.evidence}</b>
                </p>
              )
            })}
          </div>
        </details>
      </div>
    </section>
  )
}
