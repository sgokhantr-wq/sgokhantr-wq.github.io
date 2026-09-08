import { useEffect, useState } from 'react'

function fmt(): string {
  const d = new Date()
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
}

/** Local wall-clock, HH:MM, updated once a minute. Content, not motion. */
export function useClock(): string {
  const [now, setNow] = useState(fmt)
  useEffect(() => {
    const tick = () => setNow(fmt())
    const msToNextMinute = 60_000 - (Date.now() % 60_000)
    let interval: number | undefined
    const timeout = window.setTimeout(() => {
      tick()
      interval = window.setInterval(tick, 60_000)
    }, msToNextMinute)
    return () => {
      window.clearTimeout(timeout)
      if (interval) window.clearInterval(interval)
    }
  }, [])
  return now
}
