#!/usr/bin/env node
/**
 * Load every route of a deployed copy in a real browser and report problems.
 *   node scripts/check-live.mjs https://gokhans.vercel.app/
 * Checks each route for console errors, failed requests, horizontal overflow and
 * any text the copy contract forbids.
 */
import { chromium } from 'playwright-core'
import { CHROME, CHROME_ARGS } from './serve-dist.mjs'

const BASE = process.argv[2] ?? 'https://gokhans.vercel.app/'
const ROUTES = ['', 'fieldops', 'portfolio', 'centaurus', 'live-demo', 'skills', 'contact']
const BANNED = [/\bM3\b/, /buildops/i, /m3hvac/i, /\$\s?\d/, /(?<![-\w])[3-5]\d{4}(?![-\w])/]

const browser = await chromium.launch({ executablePath: CHROME, headless: true, args: CHROME_ARGS })
const problems = []
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
  page.on('pageerror', (e) => problems.push(`[pageerror] ${e.message}`))
  page.on('console', (m) => { if (m.type() === 'error') problems.push(`[console] ${m.text()}`) })
  page.on('response', (r) => { if (r.status() >= 400) problems.push(`[http ${r.status()}] ${r.url()}`) })

  for (const route of ROUTES) {
    await page.goto(`${BASE}#/${route}`, { waitUntil: 'networkidle' })
    await page.waitForTimeout(800)
    const total = await page.evaluate(() => document.documentElement.scrollHeight)
    for (let y = 0; y < total; y += 700) {
      await page.evaluate((v) => window.scrollTo(0, v), y)
      await page.waitForTimeout(80)
    }
    const info = await page.evaluate(() => ({
      height: document.documentElement.scrollHeight,
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      text: document.body.innerText,
    }))
    const name = route || 'home'
    if (info.overflow > 0) problems.push(`${name}: horizontal overflow ${info.overflow}px`)
    for (const re of BANNED) {
      const m = info.text.match(re)
      if (m) problems.push(`${name}: banned text "${m[0]}"`)
    }
    console.log(`${name}: height=${info.height} overflow=${info.overflow} chars=${info.text.length}`)
  }
} finally {
  await browser.close()
}
console.log(problems.length ? `PROBLEMS (${problems.length}):\n${problems.slice(0, 8).join('\n')}` : 'no problems')
