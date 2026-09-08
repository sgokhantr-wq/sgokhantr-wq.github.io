export type Theme = 'light' | 'dark'

const KEY = 'theme'

export function storedTheme(): Theme | null {
  try {
    const t = localStorage.getItem(KEY)
    return t === 'dark' || t === 'light' ? t : null
  } catch {
    return null
  }
}

/** The theme actually in effect: explicit choice, else the OS preference. */
export function effectiveTheme(): Theme {
  const attr = document.documentElement.getAttribute('data-theme')
  if (attr === 'dark' || attr === 'light') return attr
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function applyTheme(t: Theme) {
  document.documentElement.setAttribute('data-theme', t)
  try {
    localStorage.setItem(KEY, t)
  } catch {
    /* private mode or blocked storage: the choice just does not persist */
  }
}
