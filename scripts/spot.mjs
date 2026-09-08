#!/usr/bin/env node
/**
 * Viewport-only screenshots of the built site at given scroll offsets, plus an overflow finder.
 *   node scripts/spot.mjs                      → default spots
 *   node scripts/spot.mjs 390 844 0 phone-top  → one spot: width height scrollY name
 * Prints, for the narrowest viewport, the elements that stick out past the right edge.
 */
import { mkdirSync } from 'node:fs'
import { chromium } from 'playwright-core'
import { CHROME, CHROME_ARGS, serveDist } from './serve-dist.mjs'

const PORT = 4176
const argv = process.argv.slice(2)
const SPOTS = argv.length >= 4
  ? [{ w: +argv[0], h: +argv[1], y: +argv[2], name: argv[3], scheme: argv[4] ?? 'light' }]
  : [
      { w: 1440, h: 900, y: 0, name: 'top-desktop', scheme: 'light' },
      { w: 1440, h: 900, y: 0, name: 'top-desktop-dark', scheme: 'dark' },
      { w: 390, h: 844, y: 0, name: 'top-phone', scheme: 'light' },
    ]

mkdirSync('shots', { recursive: true })
const server = await serveDist(PORT)
const browser = await chromium.launch({ executablePath: CHROME, headless: true, args: CHROME_ARGS })
try {
  for (const s of SPOTS) {
    const page = await browser.newPage({ viewport: { width: s.w, height: s.h }, colorScheme: s.scheme })
    await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle' })
    await page.evaluate(() => document.fonts.ready)
    await page.evaluate((y) => window.scrollTo(0, y), s.y)
    await page.waitForTimeout(500)
    await page.screenshot({ path: `shots/${s.name}.png` })
    const offenders = await page.evaluate(() => {
      const vw = document.documentElement.clientWidth
      const out = []
      // Content inside a scroll container is meant to be wider than the viewport, and so is
      // every descendant of it — only elements that widen the PAGE are real offenders.
      const clipped = (el) => {
        for (let a = el.parentElement; a; a = a.parentElement) {
          const o = getComputedStyle(a).overflowX
          if (o === 'auto' || o === 'scroll' || o === 'hidden') return true
        }
        return false
      }
      for (const el of document.querySelectorAll('body *')) {
        const r = el.getBoundingClientRect()
        if (r.width > 0 && r.right > vw + 1 && !clipped(el)) {
          const cls = el.className && typeof el.className === 'string' ? '.' + el.className.trim().split(/\s+/).join('.') : ''
          out.push(`${el.tagName.toLowerCase()}${cls} right=${Math.round(r.right)} w=${Math.round(r.width)} "${(el.textContent ?? '').trim().slice(0, 32)}"`)
        }
      }
      return { vw, sw: document.documentElement.scrollWidth, out: out.slice(0, 12) }
    })
    console.log(`${s.name}: viewport ${offenders.vw} scrollWidth ${offenders.sw}${offenders.out.length ? '\n  ' + offenders.out.join('\n  ') : ''}`)
    await page.close()
  }
} finally {
  await browser.close()
  server.close()
}
