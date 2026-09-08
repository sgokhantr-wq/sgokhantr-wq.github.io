import type { ReactNode } from 'react'

interface Props {
  /** Page name in the window's toolbar. */
  title: string
  /** Right-hand toolbar text: filters, counts, a timestamp. */
  meta?: ReactNode
  /** A status line under the screen: chips, legends, totals. */
  foot?: ReactNode
  /** Heavier shadow, for a screen that is the focus of its section. */
  lifted?: boolean
  /** Let the body scroll sideways inside the window instead of widening the page. */
  scroll?: boolean
  label: string
  className?: string
  children: ReactNode
}

/** An application window: toolbar, body, optional status line. The product screens live in these. */
export function Screen({ title, meta, foot, lifted, scroll, label, className = '', children }: Props) {
  return (
    <figure className={`screen ${lifted ? 'screen--lifted' : ''} ${className}`} aria-label={label} style={{ margin: 0 }}>
      <div className="screen__bar">
        <span className="screen__dot" aria-hidden="true" />
        <span className="screen__title">{title}</span>
        {meta && <span className="screen__meta">{meta}</span>}
      </div>
      <div className={`screen__body ${scroll ? 'screen__scroll' : ''}`}>{children}</div>
      {foot && <figcaption className="screen__foot">{foot}</figcaption>}
    </figure>
  )
}
