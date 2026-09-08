#!/usr/bin/env node
/** Load the deployed site in a real browser and report errors, overflow and a screenshot. */
import { mkdirSync } from 'node:fs'
import { chromium } from 'playwright-core'
import { CHROME, CHROME_ARGS } from './serve-dist.mjs'

const URL = process.argv[2] ?? 'https://sgokhantr-wq.github.io/'
mkdirSync('shots', { recursive: true })
const browser = await chromium.launch({ executablePath: CHROME, headless: true, args: CHROME_ARGS })
const problems = []
try {
  for (const scheme of ['light', 'dark']) {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, colorScheme: scheme })
    page.on('pageerror', (e) => problems.push(`[pageerror] ${e.message}`))
    page.on('console', (m) => { if (m.type() === 'error') problems.push(`[console] ${m.text()}`) })
    page.on('response', (r) => { if (r.status() >= 400) problems.push(`[http ${r.status()}] ${r.url()}`) })
    await page.goto(URL, { waitUntil: 'networkidle' })
    await page.waitForTimeout(1000)
    const info = await page.evaluate(() => ({
      height: document.documentElement.scrollHeight,
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      chars: document.body.innerText.length,
      sections: document.querySelectorAll('section').length,
      documents: document.querySelectorAll('figure.doc').length,
      title: document.title,
    }))
    console.log(scheme, JSON.stringify(info))
    await page.screenshot({ path: `shots/live-${scheme}.png` })
    await page.close()
  }
} finally {
  await browser.close()
}
console.log(problems.length ? `PROBLEMS (${problems.length}):\n${problems.slice(0, 8).join('\n')}` : 'no errors')
