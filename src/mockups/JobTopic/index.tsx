import { useEffect, useRef, useState } from 'react'
import { DocumentFrame } from '../../components/DocumentFrame'
import { useInView } from '../../lib/useInView'
import { useReducedMotion } from '../../lib/useReducedMotion'
import { BARS, MESSAGES, PINNED_LINE, TOPIC } from './data'
import s from './JobTopic.module.css'

function Bar({ filled, label }: { filled: number; label: string }) {
  return (
    <div className={s.bar}>
      <span className={s.cells} aria-hidden="true">
        {Array.from({ length: 8 }, (_, i) => (
          <span key={i} className={`${s.cell} ${i < filled ? s.on : ''}`} />
        ))}
      </span>
      <span>
        {filled} of 8 · {label}
      </span>
    </div>
  )
}

/** A phone-width forum topic for one job: pinned card, crew messages, the one-tap button, a DM, the pace post. */
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
      <DocumentFrame
        title="Job topic"
        meta="forum · 1 topic per job"
        ruled={false}
        label="A synthetic job topic in the crew's messaging forum"
        caption="Pinned banner sized on a real phone (27 characters) · every write carries a deduplication key · money never enters the crew channel"
      >
        <div className={s.topic}>{TOPIC}</div>
        <div className={s.pinned}>
          <div className={`head ${s.pinBand}`}>Pinned</div>
          <div className={s.pinLine}>{PINNED_LINE}</div>
          <Bar filled={BARS.done.filled} label={BARS.done.label} />
          <Bar filled={reduced ? BARS.hours.filled : hours} label={BARS.hours.label} />
        </div>
        {MESSAGES.map((m) => (
          <div key={`${m.who}-${m.time}`} className={`${s.msg} ${s[m.kind] ?? ''}`}>
            <span className={s.meta}>
              {m.who}
              <span className={s.time}>{m.time}</span>
            </span>
            {m.kind === 'button' ? (
              <button type="button" className={s.btn}>
                {m.text}
              </button>
            ) : m.kind === 'reply' ? (
              <span className={s.reply}>{m.text}</span>
            ) : (
              m.text
            )}
          </div>
        ))}
        <div className={`evidence ${s.hint}`}>tap = one write with a deduplication key · undo is the safety</div>
      </DocumentFrame>
    </div>
  )
}
