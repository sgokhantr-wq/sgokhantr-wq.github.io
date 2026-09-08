import { mkdirSync } from 'node:fs'
import { chromium } from 'playwright-core'
import { CHROME, CHROME_ARGS, serveDist } from './serve-dist.mjs'
const PORT = 4179
const ROUTES = ['', 'fieldops', 'portfolio', 'centaurus', 'skills', 'contact']
mkdirSync('shots', { recursive: true })
const server = await serveDist(PORT)
const b = await chromium.launch({ executablePath: CHROME, headless: true, args: CHROME_ARGS })
const problems = []
const p = await b.newPage({ viewport: { width: 1440, height: 900 } })
p.on('pageerror', (e) => problems.push('[pageerror] ' + e.message))
p.on('console', (m) => { if (m.type() === 'error') problems.push('[console] ' + m.text()) })
p.on('response', (r) => { if (r.status() >= 400) problems.push('[http ' + r.status() + '] ' + r.url()) })
for (const r of ROUTES) {
  await p.goto(`http://localhost:${PORT}/#/${r}`, { waitUntil: 'networkidle' })
  await p.waitForTimeout(700)
  const total = await p.evaluate(() => document.documentElement.scrollHeight)
  for (let y = 0; y < total; y += 600) { await p.evaluate((v) => window.scrollTo(0, v), y); await p.waitForTimeout(90) }
  await p.evaluate(() => window.scrollTo(0, 0)); await p.waitForTimeout(700)
  const info = await p.evaluate(() => ({ h: document.documentElement.scrollHeight, ov: document.documentElement.scrollWidth - document.documentElement.clientWidth, txt: document.body.innerText }))
  for (const re of [/\bM3\b/, /buildops/i, /\$\s?\d/, /\b[3-5]\d{4}\b/]) { const m = info.txt.match(re); if (m) problems.push(`${r || 'home'}: banned text "${m[0]}"`) }
  console.log(`${r || 'home'}: height=${info.h} overflow=${info.ov}`)
  await p.screenshot({ path: `shots/old-${r || 'home'}.png` })
}
await b.close(); server.close()
console.log(problems.length ? 'PROBLEMS:\n' + problems.slice(0, 8).join('\n') : 'no problems')
