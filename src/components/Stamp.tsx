import { useRef } from 'react'
import { useInView } from '../lib/useInView'

interface Props {
  label: string
  sub?: string
  size?: 'sm' | 'md' | 'lg'
  /** No rotation (for inline use inside tables and boxes). */
  flat?: boolean
  /** One 220 ms press on first intersection. Renders fully at rest either way. */
  press?: boolean
  className?: string
  title?: string
}

/** A rubber stamp: marking-orange outline, 3px corner, −6° unless flat. Never under 18px display / 12px mono. */
export function Stamp({ label, sub, size = 'md', flat = false, press = false, className = '', title }: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const seen = useInView(ref, { once: true, margin: '-40px' })
  const cls = [
    'stamp',
    size === 'lg' && 'stamp--lg',
    size === 'sm' && 'stamp--sm',
    flat && 'stamp--flat',
    press && seen && 'is-pressed',
    className,
  ]
    .filter(Boolean)
    .join(' ')
  return (
    <span ref={ref} className={cls} title={title}>
      {label}
      {sub && <span className="stamp__sub">{sub}</span>}
    </span>
  )
}
