import { useEffect, useRef, useState } from 'react'
import { Screen } from '../../components/Screen'
import { useInView } from '../../lib/useInView'
import { useReducedMotion } from '../../lib/useReducedMotion'
import { BARS, MESSAGES, PINNED_LINE, TOPIC } from './data'
import s from './JobTopic.module.css'

function Bar({ filled, label, work }: { filled: number; label: string; work?: boolean }) {
  return (
    <div className={s.bar}>
      <span className={s.cells} aria-hidden="true">
        {Array.from({ length: 8 }, (_, i) => (
          <span key={i} className={`${s.cell} ${i < filled ? (work ? s.onWork : s.on) : ''}`} />
        ))}
      </span>
      <span>{label}</span>
    </div>
  )
}

/** The crew's view: one topic per job, a pinned progress card, one tap to say it can be invoiced. */
export default function JobTopic() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref)
  const reduced = useReducedMotion()
  const [hours, setHours] = useState(BARS.hours.filled)

  useEffect(() => {
    if (!inView || reduced) return
    const id = window.setInterval(() => setHours((h) => (h % 8) + 1), 12_000)
    return () => window.clearInterval(id)
  }, [inView, reduced])

  return (
    <div ref={ref} className={s.phone}>
      <Screen title="Job topic" meta="one per job" label="A job topic in the crew's messaging forum">
        <div className={s.topic}>{TOPIC}</div>
        <div className={s.pinned}>
          <div className={s.pinBand}>Pinned · 27 characters</div>
          <div className={s.pinLine}>{PINNED_LINE}</div>
          <Bar filled={BARS.done.filled} label={BARS.done.label} />
          <Bar filled={reduced ? BARS.hours.filled : hours} label={BARS.hours.label} work />
        </div>
        {MESSAGES.map((m) => (
          <div key={`${m.who}-${m.time}`} className={`${s.msg} ${s[m.kind] ?? ''}`}>
            <span className={s.meta}>
              {m.who}
              <span className={s.time}>{m.time}</span>
            </span>
            {m.kind === 'button' ? (
              <span className={s.btn}>{m.text}</span>
            ) : m.kind === 'reply' ? (
              <span className={s.reply}>{m.text}</span>
            ) : (
              m.text
            )}
          </div>
        ))}
      </Screen>
    </div>
  )
}
