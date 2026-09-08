import type { ReactNode } from 'react'
import { Stamp } from './Stamp'

interface Props {
  id: string
  /** The one rubber stamp for this section, hung on the margin rule on wide screens. */
  stamp: string
  title: string
  kicker?: string
  children: ReactNode
  className?: string
}

export function Section({ id, stamp, title, kicker, children, className = '' }: Props) {
  return (
    <section id={id} className={`section ${className}`} aria-labelledby={`${id}-title`}>
      <div className="container">
        <div className="section__stamp">
          <Stamp label={stamp} press />
        </div>
        {kicker && <p className="section__kicker head">{kicker}</p>}
        <h2 id={`${id}-title`} className="section-title section__title">
          {title}
        </h2>
        {children}
      </div>
    </section>
  )
}

/** A sub-sheet inside a section, with its own stamp on the margin rule. */
export function SubSheet({ stamp, title, children }: { stamp: string; title: string; children: ReactNode }) {
  return (
    <div className="sub-sheet">
      <div className="section__stamp sub-sheet__stamp">
        <Stamp label={stamp} press />
      </div>
      <h3 className="sub-sheet__title">{title}</h3>
      {children}
    </div>
  )
}
