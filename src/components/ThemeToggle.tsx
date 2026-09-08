import { useEffect, useState } from 'react'
import { applyTheme, effectiveTheme, storedTheme, type Theme } from '../lib/theme'

/** The DAY / NIGHT stamp. Shows the theme in effect; pressing it stamps the other one. */
export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() => (typeof document === 'undefined' ? 'light' : effectiveTheme()))

  useEffect(() => {
    // Follow the OS while no explicit choice is stored.
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const on = () => {
      if (!storedTheme()) setTheme(mq.matches ? 'dark' : 'light')
    }
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])

  const next: Theme = theme === 'dark' ? 'light' : 'dark'
  return (
    <button
      type="button"
      className="stamp stamp--sm stamp--flat"
      onClick={() => {
        applyTheme(next)
        setTheme(next)
      }}
      aria-pressed={theme === 'dark'}
      aria-label={`Theme: ${theme === 'dark' ? 'night' : 'day'}. Switch to ${next === 'dark' ? 'night' : 'day'}.`}
      title={`Switch to ${next === 'dark' ? 'night' : 'day'}`}
    >
      {theme === 'dark' ? 'Night' : 'Day'}
    </button>
  )
}
