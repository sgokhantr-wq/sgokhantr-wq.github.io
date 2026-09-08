import type { ReactNode } from 'react'
import { P } from '../content/proof'

/** One claim from the proof registry: the sentence, then its evidence line in mono. */
export function Note({ id }: { id: string }) {
  const c = P(id)
  return (
    <>
      <p>{c.text}</p>
      <span className="evidence">{c.evidence}</span>
    </>
  )
}

/** A notes column: a head, then claims. */
export function Notes({ head, ids, children }: { head?: string; ids?: string[]; children?: ReactNode }) {
  return (
    <div className="notes">
      {head && <h3 className="notes__head">{head}</h3>}
      {ids?.map((id) => <Note key={id} id={id} />)}
      {children}
    </div>
  )
}
