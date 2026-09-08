#!/usr/bin/env node
/**
 * Screenshot + checks over the built site (run after `vite build`):
 *   three viewports × light/dark, scrolled in steps, full-page shots into shots/;
 *   reports console/page errors, horizontal overflow, text parked at opacity 0,
 *   banned strings in the rendered text, a reduced-motion shot and a keyboard-focus shot.
 */
import { mkdirSync } from 'node:fs'
import { chromium } from 'playwright-core'
import { CHROME, CHROME_ARGS, serveDist } from './serve-dist.mjs'

const PORT = 4175
const VIEWPORTS = [
  { w: 1440, h: 900, name: 'desktop' },
  { w: 1024, h: 768, name: 'tablet' },
  { w: 390, h: 844, name: 'phone' },
]
const BANNED = [/\bM3\b/, /buildops/i, /m3hvac/i, /\$\s?\d/, /\b(nemotron|glm-?5|minimax|gemma)\b/i]

mkdirSync('shots', { recursive: true })
const server = await serveDist(PORT)
const browser = await chromium.launch({ executablePath: CHROME, headless: true, args: CHROME_ARGS })
const problems = []

async function shoot(page, name) {
  await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle' })
  await page.evaluate(() => document.fonts.ready)
  await page.waitForTimeout(300)
  const total = await page.evaluate(() => document.documentElement.scrollHeight)
  for (let y = 0; y < total; y += 500) {
    await page.evaluate((yy) => window.scrollTo(0, yy), y)
    await page.waitForTimeout(60)
  }
  await page.evaluate(() => window.scrollTo(0, 0))
  await page.waitForTimeout(400)
  const report = await page.evaluate(() => {
    const doc = document.documentElement
    const overflow = doc.scrollWidth - doc.clientWidth
    const hidden = []
    for (const el of document.querySelectorAll('main *')) {
      const cs = getComputedStyle(el)
      if (cs.opacity === '0' && (el.textContent ?? '').trim().length > 0) hidden.push(el.tagName + '.' + el.className)
    }
    return { overflow, hidden: hidden.slice(0, 10), height: doc.scrollHeight, text: document.body.innerText }
  })
  if (report.overflow > 0) problems.push(`${name}: horizontal overflow ${report.overflow}px`)
  if (report.hidden.length) problems.push(`${name}: text at opacity 0 → ${report.hidden.join(', ')}`)
  for (const re of BANNED) {
    const m = report.text.match(re)
    if (m) problems.push(`${name}: banned text "${m[0]}"`)
  }
  await page.screenshot({ path: `shots/${name}.png`, fullPage: true })
  console.log(`${name}: height=${report.height} overflow=${report.overflow}`)
}

try {
  for (const vp of VIEWPORTS) {
    for (const scheme of ['light', 'dark']) {
      const page = await browser.newPage({ viewport: { width: vp.w, height: vp.h }, colorScheme: scheme })
      page.on('console', (m) => { if (m.type() === 'error') problems.push(`[console] ${m.text()}`) })
      page.on('pageerror', (e) => problems.push(`[pageerror] ${e.message}`))
      page.on('response', (r) => { if (r.status() >= 400) problems.push(`[http ${r.status()}] ${r.url()}`) })
      await shoot(page, `${vp.name}-${scheme}`)
      await page.close()
    }
  }

  // reduced motion: tickers must be static, page still complete
  const rm = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' })
  await shoot(rm, 'desktop-reduced-motion')
  await rm.close()

  // keyboard focus: tab a few times from the top and shoot the viewport
  const kb = await browser.newPage({ viewport: { width: 1440, height: 900 } })
  await kb.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle' })
  for (let i = 0; i < 4; i++) await kb.keyboard.press('Tab')
  await kb.waitForTimeout(150)
  const focused = await kb.evaluate(() => {
    const el = document.activeElement
    return el ? `${el.tagName}${el.className ? '.' + el.className : ''} → ${getComputedStyle(el).outlineStyle} ${getComputedStyle(el).outlineWidth}` : 'none'
  })
  console.log(`focus after 4 tabs: ${focused}`)
  await kb.screenshot({ path: 'shots/focus.png' })
  await kb.close()
} finally {
  await browser.close()
  server.close()
}

if (problems.length) {
  console.log(`\nPROBLEMS (${problems.length}):\n` + problems.join('\n'))
  process.exitCode = 1
} else {
  console.log('\nno problems found')
}
