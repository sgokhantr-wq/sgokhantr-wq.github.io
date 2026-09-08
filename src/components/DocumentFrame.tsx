import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Stamp } from './Stamp'

interface Props {
  /** Header band, left (mono caps). */
  title: string
  /** Header band, right (mono caps). */
  meta?: ReactNode
  /** Adds a SPECIMEN stamp: use on every money-shaped mockup. */
  specimen?: boolean
  /** Draw the 32px ledger ruling behind the body. */
  ruled?: boolean
  /** Body scrolls horizontally inside the frame; a "sheet continues" cue appears when it overflows. */
  scroll?: boolean
  caption?: ReactNode
  /** Accessible name for the figure. */
  label?: string
  className?: string
  children: ReactNode
}

/** A ruled document panel: header band, optional ledger ruling, optional in-frame horizontal scroll. */
export function DocumentFrame({ title, meta, specimen, ruled = true, scroll = false, caption, label, className = '', children }: Props) {
  const bodyRef = useRef<HTMLDivElement>(null)
  const [scrollable, setScrollable] = useState(false)

  useEffect(() => {
    if (!scroll) return
    const el = bodyRef.current
    if (!el) return
    const check = () => setScrollable(el.scrollWidth > el.clientWidth + 1)
    check()
    const ro = new ResizeObserver(check)
    ro.observe(el)
    return () => ro.disconnect()
  }, [scroll])

  const bodyCls = ['doc__body', ruled && 'doc__body--ruled', scroll && 'doc__scroll'].filter(Boolean).join(' ')
  return (
    <figure className={`doc ${scrollable ? 'doc--scrollable' : ''} ${className}`} aria-label={label ?? title}>
      <div className="doc__head">
        <span>
          <strong>{title}</strong>
        </span>
        {meta && <span>{meta}</span>}
      </div>
      {specimen && <Stamp label="Specimen" sub="synthetic figures" size="sm" className="doc__specimen" />}
      <div ref={bodyRef} className={bodyCls}>
        {children}
      </div>
      <div className="doc__continues head" aria-hidden="true">
        sheet continues →
      </div>
      {caption && <figcaption className="doc__caption">{caption}</figcaption>}
    </figure>
  )
}
