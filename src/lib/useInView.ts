import { useEffect, useState, type RefObject } from 'react'

/**
 * Whether the element is on screen. With `once`, stays true after the first
 * intersection (used for the one-time stamp press). Without it, flips as the
 * element scrolls in and out (used to pause the two tickers off-screen).
 */
export function useInView(ref: RefObject<Element | null>, opts: { once?: boolean; margin?: string } = {}): boolean {
  const { once = false, margin = '0px' } = opts
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setInView(true)
            if (once) io.disconnect()
          } else if (!once) {
            setInView(false)
          }
        }
      },
      { rootMargin: margin },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [ref, once, margin])
  return inView
}
